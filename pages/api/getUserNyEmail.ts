// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

const mockData = [{
  "email":"devsifat@gmail.com",
  "first_name":"sifatul",
  "last_name":"islam",
  "github_url":"https://github.com/sifatul",
  "leetcode_url":"https://leetcode.com/sifatul2020/",
  "hackerrank_url":"https://www.hackerrank.com/sifatul/",
  "codepen_url":"https://codepen.io/sifii2013/",
  "medium_url":"https://devsifat.medium.com/",
  "avatar":"https://avatars.githubusercontent.com/u/10746740?v=4"
},
{
  "email":"sifii2013@gmail.com",
  "first_name":"sifatul",
  "last_name":"islam",
  "github_url":"https://github.com/sifatul",
  "leetcode_url":"https://leetcode.com/sifatul2020/",
  "hackerrank_url":"https://www.hackerrank.com/sifatul/",
  "codepen_url":"https://codepen.io/sifii2013/",
  "medium_url":"https://devsifat.medium.com/",
  "avatar":"https://avatars.githubusercontent.com/u/10746740?v=4"
}]

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    
    if(!req.body) res.status(400).json({message: "email missing"});     
    const user = mockData.find(user=> user.email === req.body);
    if(!user) res.status(404).json({message: "no user found"});     
    res.status(200).json(user);
}
