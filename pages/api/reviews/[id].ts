import nextConnect from 'next-connect';
import { connectToDatabase } from '../../../Utils/mongodb';
import { ObjectId } from 'mongodb';
import Review from './model/ReviewSchema';
import Users from '../users/models/UserSchema';

const handler = nextConnect();

/**
 * @swagger
 * '/api/reviews/{userId}':
 *  get:
 *     tags:
 *     - Reviews
 *     summary: Get reviews by userId
 *     parameters:
 *       - name: userId
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
 *                userId:
 *                  type: string
 *                reviewerId:
 *                  type: string
 *                review:
 *                  type: string
 *       400:
 *         description: Bad request
 */

handler.get(async (req: any, res: any) => {
    try {
        // TODO: userId will come from token so that we don't need to pass id params
        await connectToDatabase();
        const {
            query: { id },
        } = req;

        const query = { userId: new ObjectId(id) };

        const userReviews = await Review.find(query)
            .populate({ path: 'userId', model: Users })
            .populate({ path: 'reviewerId', model: Users });

        if (userReviews.length <= 0) return res.status(404).json({ message: 'No review found.' });

        return res.status(200).json(userReviews);
    } catch (e) {
        console.log(e);

        return res.status(500).json({ message: 'something went wrong' });
    }
});

export default handler;
