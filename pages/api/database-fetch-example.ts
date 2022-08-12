import { connectToDatabase } from '../../Utils/mongodb';

export default async (req: any, res: any) => {
    const { db } = await connectToDatabase();
    if (!db) return res.json({ error: 'database connection failed' });

    const movies = await db
        .collection('users')
        .find({})
        .sort({ metacritic: -1 })
        .limit(20)
        .toArray();

    return res.json(movies);
};
