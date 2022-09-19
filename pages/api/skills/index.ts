import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { connectToDatabase } from '../../../Utils/mongodb';
import User from '../users/models/UserSchema';
import Skills from './models/SkillsSchema';
const handler = nextConnect();

const addSkills = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await connectToDatabase();

        if (!req.body) {
            return res.status(400).json({ message: 'body param missing' });
        }

        const { userId, techStack } = JSON.parse(req.body);

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

const getSkills = async (req: NextApiRequest, res: NextApiResponse) => {
    await connectToDatabase();
    const { userId = '' } = req.query;

    if (!userId) {
        return res.status(400).json({ message: 'request param is missing' });
    }
    const query = { userId: new ObjectId(userId.toString()) };
    // tslint:disable-next-line: await-promise
    const skills = await Skills.find({ query });

    return res.status(201).json({ data: skills });
};

handler.post(async (req: any, res: any) => {
    const data = await addSkills(req, res);

    return data;
});

handler.get(async (req: any, res: any) => {
    const data = await getSkills(req, res);

    return data;
});

export default handler;
