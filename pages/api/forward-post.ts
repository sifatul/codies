// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const data = JSON.parse(req.body);
  const {body, url} = data

  let output = {};


  try {
    output = await new Promise((resolve) => {
      fetch(url, {method: 'POST', body})
        .then((res) => {
          console.log(res)
          return res.json()
        })
        .then((result: any) => {
          resolve(result);
        });
    });
  } catch (e) {
    console.log(e);
  }

  res.status(200).json(output);
}
