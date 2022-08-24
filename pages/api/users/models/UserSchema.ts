import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other',
}

enum Role {
    USER = 'user',
    ADMIN = 'admin',
}

// interface
interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: Gender;
    role: Role;
    linkedin_url: string;
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
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            select: false,
            minLength: 8,
        },
        gender: {
            type: String,
            enum: ['male', 'female', 'other'],
            required: true,
            default: Gender.MALE,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            required: true,
            default: Role.USER,
        },
        linkedin_url: { type: String },
        github: { type: String },
        leetcode_url: { type: String },
        hackerrank_url: { type: String },
        codepen_url: { type: String },
        medium_url: { type: String },
        codeforces_url: { type: String },
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

const User = model<IUser>('User', userSchema);

export default User;
