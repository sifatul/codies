import { connectToDatabase } from '../../../Utils/mongodb';

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
