import { isEmail } from 'js-string-helper';
import { model, models, Schema } from 'mongoose';
import { LeetcodeUserInfoType } from '../../../../store/platforms/leetcode';
// interface

const LeetcodeDataSchema = new Schema<LeetcodeUserInfoType>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        githubUrl: {
            type: String,
        },
        twitterUrl: {
            type: String,
        },
        linkedinUrl: {
            type: String,
        },
        profile: {
            userAvatar: { type: String },
            realName: { type: String },
            aboutMe: { type: String },
            school: { type: String },
            countryName: { type: String },
            company: { type: String },
            jobTitle: { type: String },
            postViewCount: { type: Number },
            reputation: { type: Number },
            solutionCount: { type: Number },
            websites: { type: [String] },
        },
        languageProblemCount: [{ languageName: String, problemsSolved: String }],
        tagProblemCounts: {
            advanced: [{ tagName: String, tagSlug: String, problemsSolved: Number }],
            intermediate: [{ tagName: String, tagSlug: String, problemsSolved: Number }],
            fundamental: [{ tagName: String, tagSlug: String, problemsSolved: Number }],
        },
    },
    { timestamps: true }
);

const LeetcodeData = models.leetcode || model<LeetcodeUserInfoType>('leetcode', LeetcodeDataSchema);

export default LeetcodeData;
