import { connectToDatabase } from '../../../Utils/mongodb';
import { ObjectId } from 'mongodb';
import SocialUser from '../users/models/SocialUserSchema';
import { SocialLoginPlatform } from '../../../types/common.types';

export default async (req: any, res: any) => {
    
    try {
        await connectToDatabase(); 
        const { platform, token, userName } = req.body;

        const query =
            platform === SocialLoginPlatform.GOOGLE
                ? { google_token: token }
                : { github_token: token };
        let users = await SocialUser.findOne(query);
        if (!users && !userName) {
            return res.status(400).json({ message: 'user not found' });
        } else if (!users && userName) {
            users = await SocialUser.create({ ...query, userName: userName });
            console.log('new user created');
        }

        console.log('user login : ', users);

        return res.json(users);
    } catch (e) {
        console.error(e);
    }  
};
