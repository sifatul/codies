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
    let client: any;

    try {
        const dbResponse = await connectToDatabase();
        client = dbResponse.client;


        const { email } = req.body
        console.log(email)
        const user = await User.findOne({email});
        
        if(user) {
            res.json({ status: 'error', error: 'Dublicate Email' });
        }

        return res.json({ status: 'success', message: 'Success' });
    } catch (e) {
        console.log(e);
        res.json({ status: 'error', error: 'Something went wrong please try again later' });
    }
};
