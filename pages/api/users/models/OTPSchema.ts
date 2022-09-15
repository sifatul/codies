import { isEmail } from 'js-string-helper';
import { model, models, Schema } from 'mongoose';

interface IOTP {
    email: string;
    otp: string;
    expireTime: Date;
}

const OTPSchema = new Schema<IOTP>(
    {
        email: {
            type: String,
            required: [true, 'Email is required'],
            validate: [isEmail, 'Invalid email'],
        },
        otp: {
            type: String,
            minlength: 4,
            maxlength: 4,
            unique: true,
            required: [true, 'OTP is not generated'],
        },
        expireTime: {
            type: Date,
            nullable: false,
        },
    },
    { timestamps: true }
);

OTPSchema.index({ expireTime: 1 }, { expireAfterSeconds: 0 });

const OTP = models.otp || model<IOTP>('otp', OTPSchema);

export default OTP;
