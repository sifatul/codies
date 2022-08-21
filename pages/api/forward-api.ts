// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const body = req.body;
    const headers = req.headers;

    console.log('====body, headers====')
    console.log(body);
    console.log(headers);
    
    console.log('====body, headers====')
    let output = {};

    try {
        output = await new Promise((resolve) => {
            fetch(body)
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
