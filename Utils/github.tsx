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

const forwardApiPath = '/api/forward-api';
const getGithubInfoByName = async (name: string) => {
    const userInfoApi = `https://api.github.com/users/${name}`
    const data: any = await PostData(forwardApiPath, userInfoApi);
    const githubData: githubDataType = data || {};
    return githubData
};

const getRepoList = async (name: string) => {
    try {
        const getRepoListApi = `https://api.github.com/users/${name}/repos`
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
export { getRepoList, getGithubInfoByName };
