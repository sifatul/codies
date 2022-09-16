// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../Utils/mongodb';
import User from './models/UserSchema';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    await connectToDatabase();
    const param = req.query.param as string;
    if (param === '') {
        res.status(400).send({ status: 'error', message: 'empty param is not allowed' });
    }

    const searchQuery = JSON.parse(param) as object;

    if (!searchQuery) return res.status(400).json({ message: 'email missing' });

    const userData = await User.findOne(searchQuery);
    if (!userData) return res.status(404).json({ message: 'no user found' });

    return res.status(200).json(userData);
}
