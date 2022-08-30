// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { Octokit } from 'octokit';
const handler = nextConnect();
export default handler;

const getRepoList = async (req: NextApiRequest, res: NextApiResponse<any>) => {
    const username = req.query.username || '';
    if (!username) res.status(404).end();
    const getRepoListApi = `GET /users/${username}/repos`;
    const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });
    const githubResponse = await octokit.request(getRepoListApi, {});
    const repos = githubResponse?.data;

    return res.status(200).json(repos);
};
handler.get(async (req: any, res: any) => {
    return getRepoList(req, res);
});
