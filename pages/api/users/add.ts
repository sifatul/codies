import { NextApiResponse, NextApiRequest } from 'next';
/* eslint-disable import/no-anonymous-default-export */
import { connectToDatabase } from '../../../Utils/mongodb';

/**
 * @swagger
 * '/api/users/add':
 *  post:
 *     tags:
 *     - Users
 *     summary: Create a hero
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                default: fazle
 *              email:
 *                type: string
 *                default: fazlerabby07@gmail.com
 *              country:
 *                type: string
 *                default: Bangladesh
 *              gender:
 *                type: string
 *                default: male
 *              dob:
 *                type: string
 *                default: 1992-09-07
 *              profilePic:
 *                type: string
 *                default: profilePic.jpg
 *              mobile:
 *                type: number
 *                default: 01811223344
 *     responses:
 *      201:
 *        description: Created
 */

enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other',
}

// interface
interface IUserRequest extends NextApiRequest {
    body: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        gender: Gender;
        linkedin_url: string;
        github?: string;
        leetcode_url?: string;
        hackerrank_url?: string;
        codepen_url?: string;
        medium_url?: string;
        codeforces_url?: string;
    };
}

interface IUserResponse extends NextApiResponse {
    firstName: string;
    lastName: string;
    email: string;
    gender: Gender;
}

export default async (req: IUserRequest, res: IUserResponse) => {
    let client: any;
    let db: any;
    try {
        const dbResponse = await connectToDatabase();
        client = dbResponse.client;
        db = dbResponse.db;
        if (!db) return res.json({ error: 'database connection failed' });
        await db.collection('users').insertOne(req.body);

        return res.json({ message: 'User create successfully.' });
    } catch (e) {
        console.error(e);
    } finally {
        if (client) await client.close();
        // Ensures that the client will close when you finish/error
    }
};
