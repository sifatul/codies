import { model, models, Schema } from 'mongoose';
import { GithubUserInfoType } from '../../../../store/platforms/github';

const GithubDataSchema = new Schema<GithubUserInfoType>(
    {
        name: {
            type: String,
            required: true,
            index: true,
        },

        blog: {
            type: String,
            index: true,
        },

        email: {
            type: String,
            index: true,
        },

        avatar_url: {
            type: String,
            index: true,
        },

        html_url: {
            type: String,
            unique: true,
        },

        repos: {
            type: [
                {
                    language: String,
                    url: String,
                    html_url: String,
                    description: String,
                    homepage: String,
                    stargazers_count: Number,
                    visibility: String,
                    updated_at: String,
                },
            ],
        },
    },
    { timestamps: true }
);

const GithubData = models.github || model<GithubUserInfoType>('github', GithubDataSchema);

export default GithubData;
