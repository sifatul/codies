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

/**
 * @swagger
 * '/api/users/{id}':
 *  get:
 *     tags:
 *     - Users
 *     summary: Get User by Id
 *     parameters:
 *       - name: id
 *         in: path
 *         description: the unique id of the user
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                email:
 *                  type: string
 *                country:
 *                  type: string
 *                gender:
 *                  type: string
 *                dob:
 *                  type: string
 *                profilePic:
 *                  type: string
 *                mobile:
 *                  type: number
 *       400:
 *         description: Bad request
 */

handler.get(async (req: any, res: any) => {
    const user = await getByID(req, res);
    res.json(user);
});

/**
 * @swagger
 * '/api/users/{id}':
 *  put:
 *     tags:
 *     - Users
 *     summary: update a hero
 *     parameters:
 *       - name: id
 *         in: path
 *         description: the unique id of the user
 *         required: true
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                default: fazle
 *              email:
 *                type: string
 *                default: fazlerabby07@gmail.com
 *              country:
 *                type: string
 *                default: Bangladesh
 *              gender:
 *                type: string
 *                default: male
 *              dob:
 *                type: string
 *                default: 1992-09-07
 *              profilePic:
 *                type: string
 *                default: profilePic.jpg
 *              mobile:
 *                type: number
 *                default: 01811223344
 *     responses:
 *      200:
 *        description: user update successfully.
 */

handler.put(async (req: any, res: any) => {
    await updateUser(req, res);
    res.json({ message: 'user update successfully.' });
});
/**
 * @swagger
 * '/api/users/{id}':
 *  delete:
 *     tags:
 *     - Users
 *     summary: Remove user by id
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The unique id of the user
 *        required: true
 *     responses:
 *      200:
 *        description: user deleted successfully.
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not Found
 */
handler.delete(async (req: any, res: any) => {
    await deleteByID(req, res);
    res.json({ message: 'user deleted successfully.' });
});

export default handler;
