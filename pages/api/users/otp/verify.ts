import { NextApiRequest, NextApiResponse } from 'next';
/* eslint-disable import/no-anonymous-default-export */
import { connectToDatabase } from '../../../../Utils/mongodb';
import OTP from '../models/OTPSchema';

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
    try {
        await connectToDatabase();

        if (!req.body)
            return res.status(400).json({ status: 'error', error: 'body param missing' });

        const { email, otp } = JSON.parse(req.body);

        if (!email || !otp)
            return res.status(400).json({ status: 'error', error: 'required param missing' });

        const isOtpValid = await OTP.findOneAndDelete({
            where: { email: email, otp },
        });
        

        if (!isOtpValid) {
            return res.status(404).send({ status: 'error', error: 'invalid otp' });
        }

        return res.status(200).json({ status: 'Success' });
    } catch (e) {
        console.log(e);
        res.json({ status: 'error', error: 'Something went wrong please try again later' });
    }
};
