import { NextApiRequest, NextApiResponse } from 'next';
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
    try {
        await connectToDatabase();

        if (!req.body) return res.status(400).json({ message: 'body param missing' });

        const { email, otp } = JSON.parse(req.body);

        if (!email || !otp) return res.status(400).json({ message: 'required param missing' });

        const isOtpValid = await OTP.findOneAndDelete({ email: email, otp });

        if (!isOtpValid) {
            return res.status(404).send({ message: 'invalid otp' });
        }

        const filter = { email };
        const update = { verified: true };
        const user = await User.findOneAndUpdate(filter, update);

        return res.status(200).json(user);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Something went wrong please try again later' });
    }
};
