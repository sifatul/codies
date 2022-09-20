import { customAlphabet } from 'nanoid';
import { NextApiRequest, NextApiResponse } from 'next';
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

export const sendOtp = async (email: string, callback: any) => {
    const generatedOtp = await generateOtp();

    const expireTime = AddMinutesToDate(new Date(), 10);

    const otpObj = {
        email: email,
        otp: generatedOtp as unknown as number,
        expireTime: expireTime,
    };

    console.log(otpObj);

    const newOtp = await OTP.create(otpObj);

    if (newOtp) {
        await sendOtpToEmail(email, newOtp, callback);
    }

    return newOtp;
};

const generateOtp = async () => {
    const alphabet = '0123456789';
    const otpNumber = customAlphabet(alphabet, 4)();

    // tslint:disable-next-line: await-promise
    const otpExist = await OTP.findOne({
        where: { otp: otpNumber },
    });

    if (otpExist && otpExist?.otp === otpNumber) {
        generateOtp();
    }

    return otpNumber;
};

const AddMinutesToDate = (date: Date, minutes: number) => {
    return new Date(date.getTime() + minutes * 60000);
};

const sendOtpToEmail = async (email: string, newOtpObj: any, callback: any) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: `${process.env.EMAIL_ADDRESS}`,
            pass: `${process.env.EMAIL_PASS}`,
        },
    });

    if (!newOtpObj?.otp) return callback(false);
    const mailOptions = {
        from: `"Find profile"<${process.env.EMAIL_ADDRESS}>`,
        to: `${email}`,
        subject: 'OTP verification',
        html: messageForEmail(newOtpObj?.otp),
    };

    await transporter.verify();

    // tslint:disable-next-line: await-promise
    await transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
            return callback(false);
        }
        callback(true);
    });
};

const messageForEmail = (otp: number) => {
    return (
        '<div>Hello User,</div>' +
        '<div>One Time Password (OTP) is</div>:' +
        `<strong style="font-size: 20px">${otp}</strong>` +
        '<div>Please feel free to reply to this email if you are having any troubles.</div>' +
        '<div>Regards</div>' +
        '<div>Codies team</div>'
    );
};
export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await connectToDatabase();

        if (!req.body)
            return res.status(400).json({ status: 'error', error: 'body param missing' });

        const { email } = JSON.parse(req.body);

        if (!email)
            return res.status(400).json({ status: 'error', error: 'required param missing' });

        // tslint:disable-next-line: await-promise
        const isUserExist = await User.findOne({
            where: { email: email },
        });

        if (!isUserExist) {
            return res.status(404).send({
                status: 'error',
                error: 'No user found',
            });
        }

        const callback = (result: any) => {
            console.log('otp generate result: ', result);
        };
        const newOtp = await sendOtp(email, callback);

        return res.status(200).json({ status: 'Success', message: newOtp });
    } catch (e) {
        console.log(e);
        res.json({ status: 'error', error: 'Something went wrong please try again later' });
    }
};
