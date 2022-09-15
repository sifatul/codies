import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../../Utils/mongodb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await connectToDatabase();

        if (!req.body) {
            return res.status(400).json({ status: 'error', message: 'body param missing' });
        }

        const { companyName, position, startDate, endDate, summary, techStack } = JSON.parse(
            req.body
        );

        if (!companyName || !position || !startDate) {
            return res.status(400).json({ status: 'error', message: 'required param missing' });
        }
    } catch (error) {}
};
