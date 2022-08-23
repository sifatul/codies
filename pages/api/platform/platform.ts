// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../Utils/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const { db } = await connectToDatabase();
    if (!db) return res.status(502).json({ message: 'database connection error' });
    const param = req.query.param as string;
    if (param === '') return;

    const emailQuery = JSON.parse(param) as object;

    if (!emailQuery) return res.status(400).json({ message: 'email missing' });

    const userData = await db.collection('users').findOne(emailQuery);
    if (!userData) return res.status(404).json({ message: 'no user found' });

    return res.status(200).json(userData);
}
