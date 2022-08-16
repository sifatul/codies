/* eslint-disable import/no-anonymous-default-export */
import { ObjectId } from 'mongodb';
import { Filter } from '../../../types/common.types';
import { connectToDatabase } from '../../../Utils/mongodb';

export default async (req: any, res: any) => {
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

        await db.collection(platformName).updateOne(query, {unique:true});

        return res.json(data);
    } catch (e) {
        console.error(e);
    } finally {
        if (client) await client.close();
        // Ensures that the client will close when you finish/error
    }
};
