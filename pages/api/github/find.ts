// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { Octokit } from 'octokit';
import { connectToDatabase } from '../../../Utils/mongodb';
import Github from './models';
const handler = nextConnect();
export default handler;

const getUserInfo = async (username: String) => {
    const getUserInfoApi = `GET /users/${username}`;
    const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });
    const githubResponse = await octokit.request(getUserInfoApi, {});
    const userInfo = githubResponse?.data;

    return userInfo;
};
const getRepoList = async (username: string) => {
    const getRepoListApi = `GET /users/${username}/repos`;
    const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });
    const githubResponse = await octokit.request(getRepoListApi, {});
    const repos = githubResponse?.data;

    return repos;
};
handler.get(async (req: any, res: any) => {
    await connectToDatabase();
    const userName = req.query.userName as string;
    if (userName === '') {
        res.status(400).send({ status: 'error', message: 'empty userName is not allowed' });
    }

    let GithubData = await Github.findOne({ user_name: userName });
    if (GithubData) return res.json(GithubData);

    try {
        const output: any = await Promise.all([getUserInfo(userName), getRepoList(userName)]);
        const userInfo = output?.[0];
        const repoList = output?.[1];
        let newData = { ...userInfo };
        if (repoList?.length > 0) {
            newData = { ...userInfo, repos: repoList };
            GithubData = await Github.create(newData);
        }
    } catch (e) {
        console.log('github fetch error: ', e);

        return res.status(400).json(e);
    }

    if (!GithubData) return res.status(400).json({ message: 'github data not found' });

    return res.json(GithubData);
});
