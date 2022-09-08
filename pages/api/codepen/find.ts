import type { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'rss-to-json';
import { connectToDatabase } from '../../../Utils/mongodb';
import Pens from './models/penSchema';


export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const body = req.body;

    const output = {};

    try {
        
        await connectToDatabase();
        const param = req.query.param as string;
        if (param === '') {
            res.status(400).send({ status: 'error', message: 'empty param is not allowed' });
        }
    
        const emailQuery = JSON.parse(param) as object;
    
        if (!emailQuery) return res.status(400).json({ message: 'email missing' });
    
        const userData = await User.findOne(emailQuery);

        
        
        const rss = await parse('https://codepen.io/sifii2013/public/feed/');

        console.log(JSON.stringify(rss, null, 3));
        res.status(200).json(rss);
    } catch (e) {
        console.log(e);
    }

    res.status(200).json(output);
}
