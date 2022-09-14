import { connectToDatabase } from '../../../Utils/mongodb';
import { ObjectId } from 'mongodb';
import SocialUser from '../users/models/SocialUserSchema';
import { SocialLoginPlatform } from '../../../types/common.types';
import nextConnect from 'next-connect';
const handler = nextConnect();



handler.get(  async (req: any, res: any) => {
    
    try {
        await connectToDatabase(); 
        const { platform, token } = req.query;

        const query =
            platform === SocialLoginPlatform.GOOGLE
                ? { google_token: token }
                : { github_token: token };
        let users = await SocialUser.findOne(query);
        if (!users) {
            return res.status(404).json(null);
        }

        return res.json(users);
    } catch (e) {
        console.error(e);
    }  
})

handler.post(  async (req: any, res: any) => {
    
     
        await connectToDatabase(); 
        if(!req.body){
            return res.status(400).json({ status: 'error', message: 'request body is missing' });
        }
        const { platform, token, userName } = JSON.parse(req.body);

        const query =
            platform === SocialLoginPlatform.GOOGLE
                ? { google_token: token }
                : { github_token: token };
        if (!platform || !token || !userName) {
            res.status(400).json({ status: 'error', message: 'param is missing' });
        } 
        try{
            const users = await SocialUser.create({ ...query, userName: userName });
            console.log('new user created');
            return res.json(users);
        }catch(e){
            console.log(e);
            res.status(500).send({ status: 'error', message: 'failed to create new social user' });

        }
 
     
})

export default handler;