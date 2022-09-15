import { Schema, model, models } from 'mongoose';
import bcrypt from 'bcryptjs';
import { Gender } from '../../../../types/common.types';
import { isEmail, isUrl } from 'js-string-helper';

// interface
interface IUser {
    firstName?: string;
    lastName?: string;
    userName?: string;
    email: string;
    password: string;
    gender?: Gender;
    linkedin_url?: string;
    github_url?: string;
    leetcode_url?: string;
    hackerrank_url?: string;
    codepen_url?: string;
    medium_url?: string;
    codeforces_url?: string;
    google_token?: string;
    github_token?: string;
    verified?: boolean;
}

const validateUrl = (value: string) => {
    if (!value) {
        return true;
    }

    return isUrl(value);
};

const userSchema = new Schema<IUser>(
    {
        firstName: { type: String, required: false },
        lastName: { type: String, required: false },
        email: {
            type: String,
            // required: [true, 'Email is required'],
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
        password: {
            type: String,
            // required: [true, 'Password is required'],
            minLength: 8,
        },
        gender: {
            type: String,
            enum: Gender,
            required: [false, 'Gender is required'],
            default: Gender.MALE,
        },
        linkedin_url: {
            type: String,
            validate: {
                validator: (val: string) => {
                    validateUrl(val);
                },
            },
            required: false,
        },
        github_url: {
            type: String,
            validate: {
                validator: (val: string) => {
                    validateUrl(val);
                },
            },
            required: false,
        },
        leetcode_url: {
            type: String,
            validate: {
                validator: (val: string) => {
                    validateUrl(val);
                },
            },
            required: false,
        },
        hackerrank_url: {
            type: String,
            validate: {
                validator: (val: string) => {
                    validateUrl(val);
                },
            },
            required: false,
        },
        codepen_url: {
            type: String,
            validate: {
                validator: (val: string) => {
                    validateUrl(val);
                },
            },
            required: false,
        },
        medium_url: {
            type: String,
            validate: {
                validator: (val: string) => {
                    validateUrl(val);
                },
            },
            required: false,
        },
        codeforces_url: {
            type: String,
            validate: {
                validator: (val: string) => {
                    validateUrl(val);
                },
            },
            required: false,
        },
        google_token: {
            type: String,
            // unique: true,
            // sparse: true
        },
        github_token: {
            type: String,
            // unique: true,
            // sparse: true
        },
        verified: {
            type: Boolean, 
            required: false,
        },
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
    return bcrypt.compare(candidatePassword, userPassword);
};

const User = models.users || model<IUser>('users', userSchema);

export default User;
