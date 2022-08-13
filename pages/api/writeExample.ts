import { connectToDatabase } from '../../Utils/mongodb';

export default async (req: any, res: any) => {
    let client: any;
    let db: any;
    try {
        const dbResponse = await connectToDatabase();
        client = dbResponse.client;
        db = dbResponse.db;
        if (!db) return res.json({ error: 'database connection failed' });

        await db.collection('users').insertOne({ item: 'card', qty: 15 });
    } catch (e) {
        console.error(e);
    } finally {
        if (client) await client.close();
        // Ensures that the client will close when you finish/error
    }
};
