import { PostData } from './fetchData';

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

const forwardApiPath = '/api/forward-api';
const getGithubInfoByName = async (name: string) => {
    const userInfoApi = GithuApis.userInfoApi.replace('userName', name)
    const data: any = await PostData(forwardApiPath, userInfoApi);
    const githubData: githubDataType = data || {};
    return githubData
};

const getRepoList = async (name: string) => {
    try {
        const getRepoListApi = GithuApis.userInfoApi.replace('userName', name)
        const data: any = await PostData(forwardApiPath, getRepoListApi);
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
const storeGithubUserInfo = async ({ data, source }: { data: string, source: any }) => {
    const param = {
        data, source
    }
    await PostData('/api/platform/add', JSON.stringify(param))
}
export { getRepoList, getGithubInfoByName, storeGithubUserInfo };
