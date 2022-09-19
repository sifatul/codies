import { IncomingForm } from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import { getDataFromCV } from './cv-parser';

var mv = require('mv');


export const config = {
    api: {
       bodyParser: false,
    }
};
 
export default async (req: NextApiRequest, res: NextApiResponse) => {
    
    const localPath:string = await new Promise((resolve, reject) => {
       const form = new IncomingForm()
       
        form.parse(req, (err, fields, files:any) => {
            if (err) return reject(err)
            console.log(fields, files)
            console.log(files.file?.filepath)
            var oldPath = files.file?.filepath;
            var newPath = `./public/uploads/${files.file.originalFilename}`;
            mv(oldPath, newPath, function(err:any) {
              console.log(err)
            });

            // res.status(200).json({ fields, files })
            resolve(newPath)
        })
    })
    if(localPath) {
      const { text, error, data, json } =   await getDataFromCV(localPath)
      res.status(200).json({ text, error, data, json } )
    }

    res.status(400).json({ message: "failed to parse" })
    
}