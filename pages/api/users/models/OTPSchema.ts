import { isEmail } from 'js-string-helper';
import { model, models, Schema } from 'mongoose';

interface IOTP {
    email: string;
    otp: number;
    expireTime: Date;
    verified?: boolean;
    verifiedAt?: Date;
}

const OTPSchema = new Schema<IOTP>(
    {
        email: {
            type: String,
            required: [true, 'Email is required'],
            validate: [isEmail, 'Invalid email'],
        },
        otp: {
            type: Number,
            minlength: 4,
            maxlength: 4,
            unique: true,
            required: [true, 'OTP is not generated'],
        },
        expireTime: {
            type: Date,
            nullable: true,
        },
        verified: {
            type: Boolean,
            default: false,
            nullable: true,
        },
        verifiedAt: {
            type: Date,
            default: null,
            nullable: true,
        },
    },
    { timestamps: true }
);

const OTP = models.otp || model<IOTP>('otp', OTPSchema);

export default OTP;
