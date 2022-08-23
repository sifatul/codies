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

export default async (req: any, res: any) => {
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
