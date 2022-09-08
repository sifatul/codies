// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { Octokit } from 'octokit';
import { connectToDatabase } from '../../../Utils/mongodb';
import Github from "./models"
const handler = nextConnect();
export default handler;

const getUserInfo = async (username: String) => {

    const getUserInfoApi = `GET /users/${username}`;
    const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });
    const githubResponse = await octokit.request(getUserInfoApi, {});
    const userInfo = githubResponse?.data;

    return userInfo
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
    if (!GithubData) {
        try {
            const { userInfo, repoList }: any = await Promise.all([getUserInfo(userName), getRepoList(userName)])
            GithubData = { ...userInfo, repos: repoList }
            // let the data be stored in background
            Github.create(GithubData).then(data => {
                console.log("github rank data is stored")
            });
        } catch (e) {
            console.log("github fetch error: ", e)
            return res.status(400).json(e)
        }

    }

    return res.json(GithubData);
});
