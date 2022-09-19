import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { connectToDatabase } from '../../../Utils/mongodb';
import User from '../users/models/UserSchema';
import Experience from './models/ExperienceSchema';
const handler = nextConnect();
const getExperience = async (req: NextApiRequest, res: NextApiResponse) => {
    await connectToDatabase();
    const { userId = '' } = req.query;

    if (!userId) {
        return res.status(400).json({ message: 'request param is missing' });
    }
    const query = { userId: new ObjectId(userId.toString()) };
    const experiences = await Experience.find({ query }, null, { strictQuery: false });

    return res.status(201).json({ data: experiences });
};

const createExperience = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await connectToDatabase();

        if (!req.body) {
            return res.status(400).json({ message: 'body param missing' });
        }

        const { userId, companyName, position, startDate, endDate, summary, techStack } =
            JSON.parse(req.body);

        if (!userId || !companyName || !position || !startDate) {
            return res.status(400).json({ message: 'required param missing' });
        }

        const query = { _id: new ObjectId(userId) };

        // tslint:disable-next-line: await-promise
        const userData = await User.findOne(query);

        if (!userData) {
            return res.status(400).json({ message: 'user not found' });
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
            .json({ message: 'experience added successfully.', data: newExperience });
    } catch (error) {
        return res.status(500).json({ message: 'something went wrong' });
    }
};
const updateExperience = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await connectToDatabase();

        if (!req.body) {
            return res.status(400).json({ message: 'body param missing' });
        }

        const { userId, companyName, position, startDate, endDate, summary, techStack, _id } =
            JSON.parse(req.body);

        if (!userId || !companyName || !position || !startDate || !_id) {
            return res.status(400).json({ message: 'required param missing' });
        }

        const newExperience = {
            userId,
            companyName,
            position,
            startDate,
            endDate,
            summary,
            techStack,
        };
        const newExperienceRes = await Experience.updateOne(
            { _id: new ObjectId(_id) },
            {
                $set: newExperience,
            }
        );

        return res
            .status(201)
            .json({ message: 'experience added successfully.', data: newExperienceRes });
    } catch (error) {
        return res.status(500).json({ message: 'something went wrong' });
    }
};
const deleteExperience = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await connectToDatabase();

        const { _id } = req.query;

        if (!_id) {
            return res.status(400).json({ message: 'required param missing' });
        }

        const newExperienceRes = await Experience.deleteOne({ _id: new ObjectId(_id.toString()) });

        return res
            .status(201)
            .json({ message: 'experience deleted successfully.', data: newExperienceRes });
    } catch (error) {
        return res.status(500).json({ message: 'something went wrong' });
    }
};

handler.post(async (req: any, res: any) => {
    const userReview = await createExperience(req, res);

    return userReview;
});
handler.get(async (req: any, res: any) => {
    const userReview = await getExperience(req, res);

    return userReview;
});
handler.put(async (req: any, res: any) => {
    const userReview = await updateExperience(req, res);

    return userReview;
});
handler.delete(async (req: any, res: any) => {
    const userReview = await deleteExperience(req, res);

    return userReview;
});

export default handler;
