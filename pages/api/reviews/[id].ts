import nextConnect from 'next-connect';
import { connectToDatabase } from '../../../Utils/mongodb';
import { ObjectId } from 'mongodb';
import Review from './model/ReviewSchema';
import Users from '../users/models/UserSchema';

const handler = nextConnect();

/**
 * @swagger
 * '/api/reviews/{revieweeId}':
 *  get:
 *     tags:
 *     - Reviews
 *     summary: Get reviews by revieweeId
 *     parameters:
 *       - name: revieweeId
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
 *                revieweeId:
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
        // TODO: revieweeId will come from token so that we don't need to pass id params
        await connectToDatabase();
        const {
            query: { id },
        } = req;

        const query = { revieweeId: new ObjectId(id) };

        const userReviews = await Review.find(query)
            .populate({ path: 'revieweeId', model: Users })
            .populate({ path: 'reviewerId', model: Users });

        if (userReviews.length <= 0)
            return res.json({ code: 404, status: 'error', message: 'No review found.' });

        return res.json({ code: 200, status: 'success', data: userReviews });
    } catch (e) {
        console.log(e);

        return res.json({
            code: 500,
            status: 'error',
            error: e,
        });
    }
});

export default handler;
