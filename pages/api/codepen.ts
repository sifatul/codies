import type { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'rss-to-json';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const body = req.body;

    const output = {};

    try {
        const rss = await parse('https://codepen.io/sifii2013/public/feed/');

        console.log(JSON.stringify(rss, null, 3));
        res.status(200).json(rss);
    } catch (e) {
        console.log(e);
    }

    res.status(200).json(output);
}
