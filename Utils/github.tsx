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
    const getDataFromDB: any = await GetData(`/api/platform/${Filter.GITHUB}?source=${userInfoApi}`);
    const data: any = getDataFromDB || await PostData(forwardApiPath, userInfoApi, githubHeader);

    const githubData: githubDataType = data || {};
    return githubData
};

const getRepoList = async (name: string) => {
    try {
        const getRepoListApi = GithuApis.getRepoListApi.replace('userName', name)
        const getDataFromDB: any = await GetData(`/api/platform/${Filter.GITHUB}?source=${getRepoListApi}`);
        let data: any;


        if ((getDataFromDB?.repos || []).length > 0) {
            data = getDataFromDB?.repos
        } else {
            data = await PostData(forwardApiPath, getRepoListApi, githubHeader);
        }
        const onlyPublicRepo: githubTopRepoType[] = (data || []).filter(
            (item: githubTopRepoType) => item.visibility === 'public'
        );

        const sortedRepo: githubTopRepoType[] = onlyPublicRepo.sort((a, b) => {
            return b.stargazers_count - a.stargazers_count;
        });
        return sortedRepo
    } catch (e) {
        console.error(e)
        return []
    }
    //
};

export { getRepoList, getGithubInfoByName };
