import { connectToDatabase } from '../../Utils/mongodb';

export default async (req: any, res: any) => {
    let client: any;
    let db: any;
    try {
        const dbResponse = await connectToDatabase();
        client = dbResponse.client;
        db = dbResponse.db;
        if (!db) return res.json({ error: 'database connection failed' });

        const movies = await db
            .collection('users')
            .find({})
            // .sort({ metacritic: -1 })
            .limit(20)
            .toArray();
        console.log('movies: ', movies);

        return res.json(movies);
    } catch (e) {
        console.error(e);
    } finally {
        // Ensures that the client will close when you finish/error
        if (client) await client.close();
    }
};
