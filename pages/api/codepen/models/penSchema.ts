import { isEmail } from 'js-string-helper';
import { model, models, Schema } from 'mongoose';
import {codepenProjectType} from "../../../../store/platforms/codepen"
// interface
interface Pen extends IUser {

}
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
            type:[{ pubDate: String,
                link: String,
                title: String,}],
            required: [true, 'pens missing'],
            unique: false,
            // index: true,
        },
         
    },
    { timestamps: true }
);

const CodepenData = models.users || model<IUser>('codepen', CodepenDataSchema);

export default CodepenData;
