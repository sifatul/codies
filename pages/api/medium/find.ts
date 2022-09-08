import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../Utils/mongodb';
import MediumData from './models/mediumSchema';

const GetData = (url: string) => {
    return new Promise((resolve) => {
        fetch(url, { method: 'GET' })
            .then((res) => res.json())
            .then((result: any) => {
                resolve(result);
            });
    });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const body = req.body;

    const output = {};
    const mediumInfoFetchUrl =
        'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@userName';
    try {
        await connectToDatabase();
        const userName = req.query.userName as string;
        if (userName === '') {
            res.status(400).send({ status: 'error', message: 'empty userName is not allowed' });
        }

        let mediumData = await MediumData.findOne({ userName });
        if (!mediumData) {
            const mediumFetchApi = mediumInfoFetchUrl.replace('userName', userName);
            const mediumInfoFromWebSite: any = await GetData(mediumFetchApi);

            if (mediumInfoFromWebSite.status === 'error')
                return res.status(404).json({ message: 'data not found' });

            // store data in database
            const mediums = mediumInfoFromWebSite.items.map((medium: any) => {
                return {
                    pubDate: medium.pubDate,
                    title: medium.title,
                    link: medium.link,
                    guid: medium.guid,
                    author: medium.author,
                    thumbnail: medium.thumbnail,
                    enclosure: medium.enclosure,
                    categories: medium.categories,
                };
            });
            const mediumsData = {
                userName,
                url: mediumInfoFromWebSite.feed.url,
                title: mediumInfoFromWebSite.feed.title,
                link: mediumInfoFromWebSite.feed.link,
                author: mediumInfoFromWebSite.feed.author,
                description: mediumInfoFromWebSite.feed.description,
                image: mediumInfoFromWebSite.feed.image,
                mediums,
            };

            mediumData = await MediumData.create(mediumsData);
        }
        if (!mediumData) return res.status(404).json({ message: 'data not found' });

        return res.status(200).json(mediumData);
    } catch (e) {
        console.log(e);
    }

    return res.status(200).json(output);
}
