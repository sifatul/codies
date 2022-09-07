import { connectToDatabase } from '../../../Utils/mongodb';
import User from './models/UserSchema';
import bcrypt from 'bcryptjs';

 
export default async (req: any, res: any) => {
    let client: any;
    let db: any;
    try {
         await connectToDatabase();
        // const dbResponse = await connectToDatabase();
        // client = dbResponse.client;
        // db = dbResponse.db;
        // if (!db) return res.json({ error: 'database connection failed' });
        const {email, password} = req.body

        const salt = await bcrypt.genSalt(8);
        const hassedPassword = await bcrypt.hash( password, salt);

   
        const user = await User.findOne({email})
        if(!user) return res.json({error:'user not found'});
          if(await bcrypt.compare(password, user.password)){
            return res.json(user);
             
          }  
      
   

        return res.json(null);
    } catch (e) {
        console.error(e);
    } finally {
        // Ensures that the client will close when you finish/error
        if (client) await client.close();
    }
};