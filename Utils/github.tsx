import { Filter } from '../types/common.types';
import { GetData, PostData } from './fetchData';

export interface githubTopRepoType {
    language: string;
    url: string;
    html_url: string;
    description: string;
    homepage: string;
    stargazers_count: number;
    visibility: 'public';
    updated_at: string;
}

export interface githubDataType {
    blog: string;
    email: string;
    avatar_url: string;
    html_url: string;
    topRepos?: githubTopRepoType[];
}
export const GithuApis = {
    userInfoApi: `https://api.github.com/users/userName`,
    getRepoListApi: `https://api.github.com/users/userName/repos`
}

const githubHeader = {
    clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET
}


const forwardApiPath = '/api/forward-api';
const getGithubInfoByName = async (name: string) => {
    const userInfoApi = GithuApis.userInfoApi.replace('userName', name)
    let data: any = await GetData(`/api/platform/${Filter.GITHUB}?source=${userInfoApi}`);
    let isNewData = false;
    if (!data) {
        data = await PostData(forwardApiPath, userInfoApi, githubHeader);
        if (data) isNewData = true;

    }
    const githubData: githubDataType = data || {};
    return { ...githubData, isNewData }
};

const getRepoList = async (name: string) => {
    try {
        const getRepoListApi = GithuApis.getRepoListApi.replace('userName', name)
        let repos: any = await GetData(`/api/platform/${Filter.GITHUB}?source=${getRepoListApi}`);
        let isNewData = false;


        if ((repos || []).length <= 0) {
            repos = await PostData(forwardApiPath, getRepoListApi, githubHeader);
            if (repos.length > 0) isNewData = true;
        }
        const onlyPublicRepo: githubTopRepoType[] = (repos || []).filter(
            (item: githubTopRepoType) => item.visibility === 'public'
        );

        const sortedRepo: githubTopRepoType[] = onlyPublicRepo.sort((a, b) => {
            return b.stargazers_count - a.stargazers_count;
        });
        return { repos: sortedRepo, isNewData }
    } catch (e) {
        console.error(e)
        return { repos: [], isNewData: false }
    }
    //
};

export { getRepoList, getGithubInfoByName };
