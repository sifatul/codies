import type { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'rss-to-json';
import { connectToDatabase } from '../../../Utils/mongodb';
import Hackerrank from './models';
import NextCors from 'nextjs-cors';

const getUserProfileApi =
    'https://www.hackerrank.com/rest/contests/master/hackers/userName/profile';

const PostData = (url: string) => {
    return new Promise((resolve) => {
        fetch(url)
            .then((res) => res.json())
            .then((result: any) => {
                resolve(result);
            });
    });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const body = req.body;

    const output = {};
    await NextCors(req, res, {
        // Options
        methods: ['GET'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    try {
        await connectToDatabase();
        const userName = req.query.userName as string;
        if (!userName)
            return res
                .status(400)
                .send({ status: 'error', message: 'empty userName is not allowed' });

        let hackerrank = await Hackerrank.findOne({ user_name: userName });
        if (hackerrank) return res.json(hackerrank);

        const userProfileApi = getUserProfileApi.replace('userName', userName);
        const hankerRankResponse: any = await PostData(userProfileApi);
        const newData = hankerRankResponse?.model;
        try {
            if (newData) hackerrank = await Hackerrank.create(newData);
        } catch (e) {
            return res.status(400).json(e);
        }

        if (!hackerrank) return res.status(400).json({ message: 'data not found' });

        return res.status(200).json(hackerrank);
    } catch (e) {
        console.log(e);
    }

    res.status(200).json(output);
}
