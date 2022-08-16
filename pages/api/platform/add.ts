/* eslint-disable import/no-anonymous-default-export */
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../Utils/mongodb';

export default async (req: any, res: any) => {
    let client: any;
    let db: any;
    try {
        const dbResponse = await connectToDatabase();
        client = dbResponse.client;
        db = dbResponse.db;
        if (!db) return res.json({ error: 'database connection failed' });
        const data = req.body ?? JSON.parse(req.body);

        const query = { _id: new ObjectId(), ...data };

        await db.collection('platforms').insertOne(query);

        return res.json(data);
    } catch (e) {
        console.error(e);
    } finally {
        if (client) await client.close();
        // Ensures that the client will close when you finish/error
    }
};
