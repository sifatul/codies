import { NextApiRequest } from 'next';
/* eslint-disable import/no-anonymous-default-export */
import { connectToDatabase } from '../../../Utils/mongodb';
import User from './models/UserSchema';

/**
 * @swagger
 * '/api/users/email-check':
 *  post:
 *     tags:
 *     - Users
 *     summary: Check Email
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
 *      200:
 *        description: Success
 */

export default async (req: NextApiRequest, res: any) => {

    try {
         await connectToDatabase(); 

        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ message: 'params missing' });
        }
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(error || 'Something went wrong please try again later');
    }
};
