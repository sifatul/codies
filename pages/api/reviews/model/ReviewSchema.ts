import { model, models, Schema, Types } from 'mongoose';

interface IReview {
    revieweeId: Types.ObjectId;
    reviewerId: Types.ObjectId;
    pros: string;
    cons: string;
}

const ReviewSchema = new Schema<IReview>(
    {
        revieweeId: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
        reviewerId: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
        pros: { type: String, required: true },
        cons: { type: String, required: true },
    },
    { timestamps: true }
);

const Review = models.reviews || model<IReview>('reviews', ReviewSchema);

export default Review;
