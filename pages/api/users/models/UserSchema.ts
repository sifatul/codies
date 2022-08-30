import { Schema, model, models } from 'mongoose';
import bcrypt from 'bcryptjs';
import isEmail from 'validator/lib/isEmail';
import isURL from 'validator/lib/isURL';
import { Gender } from '../../../../types/common.types';

// interface
interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: Gender;
    linkedin_url?: string;
    github?: string;
    leetcode_url?: string;
    hackerrank_url?: string;
    codepen_url?: string;
    medium_url?: string;
    codeforces_url?: string;
}

const userSchema = new Schema<IUser>(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            index: true,
            validate: [isEmail, 'Invalid email'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            select: false,
            minLength: 8,
        },
        gender: {
            type: String,
            enum: Gender,
            required: [true, 'Gender is required'],
            default: Gender.MALE,
        },
        linkedin_url: { type: String, validate: [isURL, 'Invalid url'] },
        github: { type: String, validate: [isURL, 'Invalid url'] },
        leetcode_url: { type: String, validate: [isURL, 'Invalid url'] },
        hackerrank_url: { type: String, validate: [isURL, 'Invalid url'] },
        codepen_url: { type: String, validate: [isURL, 'Invalid url'] },
        medium_url: { type: String, validate: [isURL, 'Invalid url'] },
        codeforces_url: { type: String, validate: [isURL, 'Invalid url'] },
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(8);
        const hassedPassword = await bcrypt.hash(this.password, salt);
        this.password = hassedPassword;
        next();
    } catch (error) {
        next();
    }
});

userSchema.methods.checkPassword = async (candidatePassword: string, userPassword: string) => {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = models.users || model<IUser>('users', userSchema);

export default User;
