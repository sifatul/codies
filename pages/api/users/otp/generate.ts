import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';
import { NextApiResponse, NextApiRequest } from 'next';
import nodemailer from 'nodemailer';

/* eslint-disable import/no-anonymous-default-export */
import { connectToDatabase } from '../../../../Utils/mongodb';
import OTP from '../models/OTPSchema';
import User from '../models/UserSchema';

/**
 * @swagger
 * '/api/users/otp/generate':
 *  post:
 *     tags:
 *     - Users
 *     summary: generate otp
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                default: fazlerabby07@gmail.com
 *     responses:
 *      201:
 *        description: Created
 */

// interface

export default async (req: NextApiRequest, res: NextApiResponse) => {
    let client: any;
    let db: any;

    try {
        const dbResponse = await connectToDatabase();
        // client = dbResponse.client;
        // db = dbResponse.db;
        // if (!db) return res.json({ error: 'database connection failed' });

        const { email } = req.body;
        // tslint:disable-next-line: await-promise
        const isUserExist = await User.findOne({
            where: { email: email },
        });

        if (!isUserExist)
            return res.status(400).send({
                status: 'error',
                message: 'No user found',
            });

        const generatedOtp = generateOtp();

        const expireTime = AddMinutesToDate(new Date(), 10);

        const otpObj = {
            email: email,
            otp: generatedOtp,
            expireTime: expireTime,
        };

        const newOtp = await OTP.create(otpObj);

        if (newOtp) {
            const { transporter, mailOptions } = sendOtpToEmail(email, newOtp);

            await transporter.verify();

            transporter.sendMail(mailOptions, (err, response) => {
                if (err) {
                    return res.status(400).send({ status: 'error', message: 'Failure' });
                }

                return res.json({ status: 'success', message: 'Success' });
            });
        }

        return res.status(400).send({ status: 'error', message: 'Failure' });
    } catch (e) {
        res.json({ status: 'error', error: 'Something went wrong please try again later' });
    } finally {
        if (client) await client.close();
        // Ensures that the client will close when you finish/error
    }
};

const generateOtp = async () => {
    const alphabet = '0123456789';
    const otpNumber = customAlphabet(alphabet, 4)();

    // tslint:disable-next-line: await-promise
    const otpExist = await OTP.findOne({
        where: { otp: otpNumber },
    });

    while (otpExist) {
        generateOtp();
    }

    return otpNumber;
};

const AddMinutesToDate = (date: Date, minutes: number) => {
    return new Date(date.getTime() + minutes * 60000);
};

const sendOtpToEmail = (email: string, newOtpObj: any) => {
    const transporter = nodemailer.createTransport({
        host: 'gmail',
        port: 465,
        secure: true,
        auth: {
            user: `${process.env.EMAIL_ADDRESS}`,
            pass: `${process.env.EMAIL_PASSWORD}`,
        },
    });

    const mailOptions = {
        from: `"Find profile"<${process.env.EMAIL_ADDRESS}>`,
        to: `${email}`,
        subject: 'OTP verification',
        text: messageForEmail(newOtpObj?.otp),
    };

    return { transporter, mailOptions };
};

const messageForEmail = (otp: number) => {
    return (
        'Dear User, \n\n' +
        'OTP for Reset Password is : \n\n' +
        `${otp}\n\n` +
        'This is a auto-generated email. Please do not reply to this email.\n\n' +
        'Regards\n' +
        'Find profiles team\n\n'
    );
};
