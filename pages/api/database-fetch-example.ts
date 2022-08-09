import { connectToDatabase } from '../../Utils/mongodb';

export default async (req: any, res: any) => {
    const { db } = await connectToDatabase();

    const movies = await db
        .collection('users')
        .find({})
        .sort({ metacritic: -1 })
        .limit(20)
        .toArray();

    res.json(movies);
};
