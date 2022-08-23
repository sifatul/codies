// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const body = req.body;
    let output = {};

    const headers = new Headers();
    if (req.headers.clientid && req.headers.clientsecret) {
        const clientId = req.headers.clientid;
        const clientSecret = req.headers.clientsecret;
        const convertToBase64 = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
        headers.append('Authorization', `Basic ${convertToBase64}`);

        console.log(`Basic ${convertToBase64}`);
    }

    try {
        output = await new Promise((resolve) => {
            fetch(body, { headers })
                .then((res) => res.json())
                .then((result: any) => {
                    resolve(result);
                });
        });
    } catch (e) {
        console.log(e);
    }

    res.status(200).json(output);
}
