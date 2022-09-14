import { NextApiRequest } from 'next';
import nextConnect from 'next-connect';
/* eslint-disable import/no-anonymous-default-export */
import { connectToDatabase } from '../../../Utils/mongodb';
import User from './models/UserSchema';

/**
 * @swagger
 * '/api/users/username-check':
 *  post:
 *     tags:
 *     - Users
 *     summary: Check Username
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            properties:
 *              userName:
 *                type: string
 *                default: fazlerabby07
 *     responses:
 *      200:
 *        description: Success
 */

const handler = nextConnect();

handler.get(async (req: NextApiRequest, res: any) => {
    try {
        await connectToDatabase();

        const { userName } = req.query;
        if (!userName) {
            return res.status(400).json({ status: 'error', message: 'params missing' });
        }

        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(404).json({ status: 'error', message: 'user not found' });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(error || 'Something went wrong please try again later');
    }
});

export default handler;
