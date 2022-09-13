import { model, models, Schema, Types } from 'mongoose';

interface IReview {
    revieweeId: Types.ObjectId;
    reviewerId: Types.ObjectId;
    review: string;
}

const ReviewSchema = new Schema<IReview>(
    {
        revieweeId: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
        reviewerId: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
        review: { type: String, required: true },
    },
    { timestamps: true }
);

const Review = models.reviews || model<IReview>('reviews', ReviewSchema);

export default Review;
