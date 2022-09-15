import nextConnect from 'next-connect';
import { connectToDatabase } from '../../../Utils/mongodb';
import { ObjectId } from 'mongodb';
import Users from './models/UserSchema';

const handler = nextConnect();

const getByID = async (req: any, res: any) => {
    try {
        const {
            query: { id },
        } = req;

        const query = { _id: new ObjectId(id) };
        await connectToDatabase();

        const userData = await Users.findOne(query);

        return res.json(userData);
    } catch (error) {
        console.error(error);

        return res.status(400).json(error);
    }
};

const updateUser = async (req: any, res: any) => {
    try {
        const {
            query: { id },
            body,
        } = req;
        if (!req.body) {
            return res.status(400).json({ status: 'error', message: 'body param missing' });
        }
        const updateData = JSON.parse(req.body);

        await connectToDatabase();

        const userData = await Users.updateOne(
            { _id: new ObjectId(id) },
            {
                $set: updateData,
            }
        );

        return res.json(userData);
    } catch (error) {
        console.error(error);

        return res.status(400).json(error);
    }
};

const deleteByID = async (req: any, res: any) => {
    try {
        const {
            query: { id },
        } = req;

        const query = { _id: new ObjectId(id) };
        await connectToDatabase();

        const userData = await Users.deleteOne(query);

        return res.json(userData);
    } catch (error) {
        console.error(error);

        return res.status(400).json(error);
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
handler.patch(async (req: any, res: any) => {
    await updateUser(req, res);
    res.json({ message: 'user deleted successfully.' });
});

export default handler;
