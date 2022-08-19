/* eslint-disable import/no-anonymous-default-export */
import { ObjectId } from 'mongodb';
import nextConnect from 'next-connect';
import { Filter } from '../../../types/common.types';
import { connectToDatabase } from '../../../Utils/mongodb';
const handler = nextConnect();
export default handler;

const storePlatformData =  async(req: any, res: any) => {
    let client: any;
    let db: any;
    try {
        const {
            query: { platformName },
        } = req;
        const checkValidPlatformName = platformName in Filter;
        if (!checkValidPlatformName) return res.json('invalid platform name');

        const dbResponse = await connectToDatabase();
        client = dbResponse.client;
        db = dbResponse.db;
        if (!db) return res.json({ error: 'database connection failed' });
        const data = req.body ? JSON.parse(req.body) : null;
        if (!data) return res.json({ error: 'params missing' });

        const query = { _id: new ObjectId(), ...data };

        await db.collection(platformName).update(
            data, 
             {
              $setOnInsert: query
             },
             {upsert: true}
        )

        return res.json(data);
    } catch (e) {
        console.error(e);
    } finally {
        if (client) await client.close();
        // Ensures that the client will close when you finish/error
    }
};
const getPlatfromData =  async(req: any, res: any) => {
    let client: any;
    let db: any;
    try {
        const {
            query: { platformName },
        } = req;
        const checkValidPlatformName = platformName in Filter;
        if (!checkValidPlatformName) return res.json('invalid platform name');

        const dbResponse = await connectToDatabase();
        client = dbResponse.client;
        db = dbResponse.db;
        if (!db) return res.json({ error: 'database connection failed' });
        if (!req.query.source) return res.json({ error: 'query missing' });
        const data = {source: req.query.source }


       const dataFound =  await db.collection(platformName).findOne(data);

        return res.json(dataFound);
    } catch (e) {
        console.error(e);
    } finally {
        if (client) await client.close();
        // Ensures that the client will close when you finish/error
    }
};
handler.put(async (req: any, res: any) => {
    await storePlatformData(req, res);
    res.json({ message: 'platform data stored successfully.' });
});
handler.get(async (req: any, res: any) => {
   return await getPlatfromData(req, res);
    
});
