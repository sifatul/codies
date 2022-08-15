import nextConnect from 'next-connect';
import { connectToDatabase } from '../../../Utils/mongodb';
import { ObjectId } from 'mongodb';

const handler = nextConnect();

const getByID = async (req: any, res: any) => {
    let client: any;
    let db: any;
    try {
        const {
            query: { id },
        } = req;

        const query = { _id: new ObjectId(id) };
        const dbResponse = await connectToDatabase();
        client = dbResponse.client;
        db = dbResponse.db;
        if (!db) return res.json({ error: 'database connection failed' });

        return await db.collection('users').findOne(query);
    } catch (error) {
        console.error(error);
    } finally {
        // Ensures that the client will close when you finish/error
        if (client) await client.close();
    }
};

const updateUser = async (req: any, res: any) => {
    let client: any;
    let db: any;
    try {
        const {
            query: { id },
            body,
        } = req;

        const dbResponse = await connectToDatabase();
        client = dbResponse.client;
        db = dbResponse.db;
        if (!db) return res.json({ error: 'database connection failed' });

        return await db.collection('users').updateOne(
            { _id: new ObjectId(id) },
            {
                $set: body,
            }
        );
    } catch (error) {
        console.error(error);
    } finally {
        // Ensures that the client will close when you finish/error
        if (client) await client.close();
    }
};

const deleteByID = async (req: any, res: any) => {
    let client: any;
    let db: any;
    try {
        const {
            query: { id },
        } = req;

        const query = { _id: new ObjectId(id) };
        const dbResponse = await connectToDatabase();
        client = dbResponse.client;
        db = dbResponse.db;
        if (!db) return res.json({ error: 'database connection failed' });

        return await db.collection('users').deleteOne(query);
    } catch (error) {
        console.error(error);
    } finally {
        // Ensures that the client will close when you finish/error
        if (client) await client.close();
    }
};

handler.get(async (req: any, res: any) => {
    const user = await getByID(req, res);
    res.json(user);
});

handler.put(async (req: any, res: any) => {
    await updateUser(req, res);
    res.json({ message: 'user update successfully.' });
});

handler.delete(async (req: any, res: any) => {
    await deleteByID(req, res);
    res.json({ message: 'user deleted successfully.' });
});

export default handler;
