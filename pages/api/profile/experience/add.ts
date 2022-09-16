import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../../Utils/mongodb';
import User from '../../users/models/UserSchema';
import Experience from '../models/ExperienceSchema';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await connectToDatabase();

        if (!req.body) {
            return res.status(400).json({ status: 'error', message: 'body param missing' });
        }

        const { userId, companyName, position, startDate, endDate, summary, techStack } =
            JSON.parse(JSON.stringify(req.body));

        if (!userId || !companyName || !position || !startDate) {
            return res.status(400).json({ status: 'error', message: 'required param missing' });
        }

        const query = { _id: new ObjectId(userId) };

        // tslint:disable-next-line: await-promise
        const userData = await User.findOne(query);

        if (!userData) {
            return res.status(400).json({ status: 'error', message: 'user not found' });
        }

        const newExperience = await Experience.create({
            userId,
            companyName,
            position,
            startDate,
            endDate,
            summary,
            techStack,
        });

        return res
            .status(201)
            .json({ message: ' experience added successfully.', data: newExperience });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'something went wrong' });
    }
};
