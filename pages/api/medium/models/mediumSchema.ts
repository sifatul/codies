import { model, models, Schema } from 'mongoose';
import { mediumBlogItemType } from '../../../../store/platforms/medium';

interface IMediumUser {
    userName: string;
    url?: string;
    title?: string;
    link?: string;
    author?: string;
    description?: string;
    image?: string;
    mediums: mediumBlogItemType[];
}

const MediumDataSchema = new Schema<IMediumUser>(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        url: {
            type: String,
            required: false,
        },
        title: {
            type: String,
            required: false,
        },
        link: {
            type: String,
            required: false,
        },
        author: {
            type: String,
            required: false,
        },
        description: {
            type: String,
            required: false,
        },
        image: {
            type: String,
            required: false,
        },
        mediums: {
            type: [
                {
                    title: String,
                    pubDate: String,
                    link: String,
                    guid: String,
                    author: String,
                    thumbnail: String,
                    enclosure: Object,
                    categories: [{ type: String }],
                },
            ],
            required: [true, 'mediums missing'],
        },
    },
    { timestamps: true }
);

const MediumData = models.mediums || model<IMediumUser>('mediums', MediumDataSchema);

export default MediumData;
