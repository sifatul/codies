import type { NextApiRequest, NextApiResponse } from 'next';
const scrapper = require('linkedin-scrapper');

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const body = req.body;

    let output = {};

    try {
        output = await new Promise((resolve) => {
            scrapper({
                url: body, // ex: natsu-gupta/
            }).then((res: any) => {
                resolve(res);
                console.warn(res);
            });
        });
    } catch (e) {
        console.error(e);
    }

    res.status(200).json(output);
}
