import nextConnect from 'next-connect';
import { SocialLoginPlatform } from '../../../types/common.types';
import { connectToDatabase } from '../../../Utils/mongodb';
import User from '../users/models/UserSchema';
const handler = nextConnect();

handler.get(async (req: any, res: any) => {
    try {
        await connectToDatabase();
        const { platform, token, email } = req.query;
        if (!token || !platform) {
            return res.status(400).json({ message: 'request body is missing' });
        }

        const query =
            platform === SocialLoginPlatform.GOOGLE
                ? { google_token: token }
                : { github_token: token };
        let user = null;
        // if(email){
        //     user = await User.findOne({email});
        // }
        if (email) {
            user = await User.findOne({ $or: [query, { email }] });
        }
        if (!user) {
            user = await User.findOne(query);
        }

        if (!user) return res.status(404).json(null);

        return res.status(200).json(user);
    } catch (e) {
        console.error(e);

        return res.status(500).json({ message: 'something went wrong' });
    }
});

handler.post(async (req: any, res: any) => {
    await connectToDatabase();
    if (!req.body) {
        return res.status(400).json({ message: 'request body is missing' });
    }
    const { platform, token, userName, email, profilePic, fullName } = JSON.parse(req.body);

    const query =
        platform === SocialLoginPlatform.GOOGLE ? { google_token: token } : { github_token: token };
    if (!platform || !token || !userName) {
        res.status(400).json({ message: 'param is missing' });
    }
    try {
        const users = await User.create({ ...query, userName, email, profilePic, fullName });
        console.log('new user created');

        return res.json(users);
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: 'failed to create new social user' });
    }
});

export default handler;
