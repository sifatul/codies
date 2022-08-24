// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GraphQLClient } from 'graphql-request';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const data = JSON.parse(req.body);
    const { query, variables } = data;
    let { url } = data;

    if (!url) {
        res.status(400).send({ status: 'error', message: 'url param missing' });
    }

    if (!variables) {
        res.status(400).send({ status: 'error', message: 'variable param missing' });
    }

    if (url) {
        url = url.trim();
    }
    if (variables && variables?.username) {
        variables.username = variables?.username.trim();
    }

    const output = {};

    try {
        const client = new GraphQLClient(url);
        const output = await client.request(query, variables);
        res.status(200).json(output);
    } catch (e) {
        res.status(200).json(output);
    }
}
