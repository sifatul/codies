// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'


type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const body = req.body
  
  let output ={}
  
 try{
  output = await  new Promise(resolve=>{
    fetch(body)
    .then(res => res.json())
    .then((result:any)=>{
      resolve(result)
    })

  })
 }catch(e){
   console.log(e)
 }
  


  res.status(200).json(output)
}
