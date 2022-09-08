import type { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'rss-to-json';
import { connectToDatabase } from '../../../Utils/mongodb';
import Pens from './models/penSchema';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const body = req.body;

    const output = {};

    try {
        await connectToDatabase();
        const userName = req.query.userName as string;
        if (userName === '') {
            res.status(400).send({ status: 'error', message: 'empty userName is not allowed' });
        }

        let codepenData = await Pens.findOne({ userName });
        if (!codepenData) {
            const codePenInfoFromWebSite = await parse(
                `https://codepen.io/${userName}/public/feed/`
            );
            // store data in database
            const pens = codePenInfoFromWebSite.items.map((pen) => {
                return {
                    pubDate: pen.published,
                    title: pen.title,
                    link: pen.link,
                };
            });
            const pensData = { userName, pens };

            codepenData = await Pens.create(pensData);
        }
        if (!codepenData) return res.status(400).json({ message: 'data not found' });

        return res.status(200).json(codepenData);
    } catch (e) {
        console.log(e);
    }

    return res.status(200).json(output);
}
