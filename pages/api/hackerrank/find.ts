import type { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'rss-to-json';
import { connectToDatabase } from '../../../Utils/mongodb';
import Hackerrank from './models';
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

    try {
        
        await connectToDatabase();
        const userName = req.query.userName as string;
        if (userName === '') {
            res.status(400).send({ status: 'error', message: 'empty userName is not allowed' });
        }
    

        let hackerrank = await Hackerrank.findOne({user_name:userName });
        if(!hackerrank){
          const userProfileApi = getUserProfileApi.replace('userName', userName);
          const hankerRankResponse: any = await PostData(userProfileApi);
          hackerrank = hankerRankResponse?.model

          // let the data be stored in background
          Hackerrank.create(hackerrank).then(data=>{
            console.log("hacker rank data is stored")
          });
        }
         
        if(!hackerrank) res.status(400).json({message: 'data not found'})

         
        res.status(200).json(hackerrank);
    } catch (e) {
        console.log(e);
    }

    res.status(200).json(output);
}
