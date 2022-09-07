import { connectToDatabase } from '../../../Utils/mongodb';
import { ObjectId } from 'mongodb';
 
export default async (req: any, res: any) => {
    let client: any;
    let db: any;
    try {
        const dbResponse = await connectToDatabase();
        client = dbResponse.client;
        db = dbResponse.db;
        if (!db) return res.json({ error: 'database connection failed' });
        const {platform, token} = req.body


        const users = await db.collection('users')
        // .findAndModify({
        //     query: { platform, token},
        //     update: {
        //       $setOnInsert: { _id: new ObjectId(), platform, token }
        //     },
        //     new: true,   // return new doc if one is upserted
        //     upsert: true // insert the document if it does not exist
        //   })
        .insertOne(req.body);

        // const users = await db
        //     .collection('users')
        //     .findOne({email, password})
            // .sort({ metacritic: -1 }) 
        console.log('users: ', users);

        return res.json(users);
    } catch (e) {
        console.error(e);
    } finally {
        // Ensures that the client will close when you finish/error
        if (client) await client.close();
    }
};
