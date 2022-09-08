import { isEmail } from 'js-string-helper';
import { model, models, Schema } from 'mongoose';
import { codepenProjectType } from '../../../../store/platforms/codepen';
// interface

interface IUser {
    userName: string;
    pens: codepenProjectType[];
}

const CodepenDataSchema = new Schema<IUser>(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        pens: {
            type: [{ pubDate: Number, link: String, title: String }],
            required: [true, 'pens missing'],
            unique: false,
            // index: true,
        },
    },
    { timestamps: true }
);

const CodepenData = models['codepens'] || model<IUser>('codepens', CodepenDataSchema);

export default CodepenData;
