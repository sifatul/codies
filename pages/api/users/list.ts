import { connectToDatabase } from '../../../Utils/mongodb';
/**
 * @swagger
 * '/api/users/list':
 *  get:
 *     tags:
 *     - Users
 *     summary: Get all heroes
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  name:
 *                    type: string
 *                  email:
 *                    type: string
 *                  country:
 *                    type: string
 *                  gender:
 *                    type: string
 *                  dob:
 *                    type: string
 *                  profilePic:
 *                    type: string
 *                  mobile:
 *                    type: number
 *       400:
 *         description: Bad request
 */

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: any, res: any) => {
    let client: any;
    let db: any;
    try {
        const dbResponse = await connectToDatabase();
        client = dbResponse.client;
        db = dbResponse.db;
        if (!db) return res.json({ error: 'database connection failed' });

        const users = await db
            .collection('users')
            .find({})
            // .sort({ metacritic: -1 })
            .limit(20)
            .toArray();
        console.log('users: ', users);

        return res.json(users);
    } catch (e) {
        console.error(e);
    } finally {
        // Ensures that the client will close when you finish/error
        if (client) await client.close();
    }
};
