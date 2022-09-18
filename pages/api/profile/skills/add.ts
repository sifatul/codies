import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../../Utils/mongodb';
import User from '../../users/models/UserSchema';
import Skills from '../models/SkillsSchema';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await connectToDatabase();

        if (!req.body) {
            return res.status(400).json({ message: 'body param missing' });
        }

        const { userId, techStack } = JSON.parse(JSON.stringify(req.body));

        if (!userId || !techStack) {
            return res.status(400).json({ message: 'required param missing' });
        }

        const query = { _id: new ObjectId(userId) };

        // tslint:disable-next-line: await-promise
        const userData = await User.findOne(query);

        if (!userData) {
            return res.status(400).json({ message: 'user not found' });
        }

        const newSkills = await Skills.create({ userId, techStack });

        return res.status(201).json({ message: 'skills added successfully.', data: newSkills });
    } catch (error) {
        return res.status(500).json({ message: 'something went wrong' });
    }
};
