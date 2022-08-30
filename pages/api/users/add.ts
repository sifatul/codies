import mongoose from 'mongoose';
import { NextApiResponse, NextApiRequest } from 'next';
import { Gender } from '../../../types/common.types';
/* eslint-disable import/no-anonymous-default-export */
import { connectToDatabase } from '../../../Utils/mongodb';
import User from './models/UserSchema';

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

// interface
interface IUserRequest extends NextApiRequest {
    body: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        gender: Gender;
        linkedin_url?: string;
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

export default async (req: IUserRequest, res: any) => {
    let client: any;
    let db: any;

    try {
        const dbResponse = await connectToDatabase();
        // client = dbResponse.client;
        // db = dbResponse.db;
        // if (!db) return res.json({ error: 'database connection failed' });
        const newUser = new User({ ...req.body });
        console.log(newUser);
        await newUser.save();

        return res.json({ status: 'success', message: 'User create successfully.' });
    } catch (e) {
        console.log(e);
        res.send({ status: 'error', error: 'Something went wrong please try again later' });
    } finally {
        if (client) await client.close();
        // Ensures that the client will close when you finish/error
    }
};
