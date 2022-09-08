import { isEmail } from 'js-string-helper';
import { model, models, Schema } from 'mongoose';

// interface
interface IUser {
    userName: string;
    email: string;
    google_token?: string;
    github_token?: string;
}

const SocialUserSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: false,
            unique: true,
            index: true,
            validate: [isEmail, 'Invalid email'],
        },
        userName: {
            type: String,
            required: [true, 'Username is required'],
            unique: true,
            index: true,
        },
        google_token: {
            type: String,
            required: false,
            unique: true,
        },
        github_token: {
            type: String,
            required: false,
            unique: true,
        },
    },
    { timestamps: true }
);

const SocialUser = models.users || model<IUser>('users', SocialUserSchema);

export default SocialUser;
