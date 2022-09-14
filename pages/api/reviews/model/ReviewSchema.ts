import { model, models, Schema, Types } from 'mongoose';

interface IReview {
    userId: Types.ObjectId;
    reviewerId: Types.ObjectId;
    pros: string;
    cons: string;
}

const ReviewSchema = new Schema<IReview>(
    {
        userId: { type: Schema.Types.ObjectId, required: true, ref: 'users', index: true },
        reviewerId: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
        pros: { type: String, required: true },
        cons: { type: String, required: true },
    },
    { timestamps: true }
);

const Review = models.reviews || model<IReview>('reviews', ReviewSchema);

export default Review;
