import { connectToDatabase } from '../../../Utils/mongodb';
import { ObjectId } from 'mongodb';
import SocialUser from '../users/models/SocialUserSchema';
import { SocialLoginPlatform } from '../../../types/common.types';
import nextConnect from 'next-connect';
const handler = nextConnect();

handler.get(async (req: any, res: any) => {
    try {
        await connectToDatabase();
        const { platform, token } = req.query;
    } catch (e) {
        console.error(e);
    }
});

handler.post(async (req: any, res: any) => {});

export default handler;
