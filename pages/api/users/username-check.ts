import { NextApiRequest } from 'next';
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


export default async (req: NextApiRequest, res: any) => {
    let client: any;

    try {
        const dbResponse = await connectToDatabase();
        client = dbResponse.client;


        const { userName } = req.body
        
        const user = await User.findOne({userName});
        console.log(user)
        if(user) {
            res.json({ status: 'error', error: 'Dublicate userName' });
        }

        return res.json({ status: 'success', message: 'Success' });
    } catch (e) {
        console.log(e);
        res.json({ status: 'error', error: 'Something went wrong please try again later' });
    }
};
