import { PostData } from './fetchData';

export interface githubTopRepoType {
  language: string
  url: string
  html_url: string
  description: string
  homepage: string
  stargazers_count: number
  visibility: "public"
  updated_at: string
}

export interface githubDataType {
  blog: string
  email: string
  avatar_url: string,
  topRepos?: githubTopRepoType[]
}


const getGithubInfoByName = async (userProfileApi: string) => {
  const profileUrl = '/api/hello'
  const data: any = await PostData(profileUrl, userProfileApi)
  const githubData: githubDataType = data || {}
  const { blog = '', email = '', avatar_url = '' } = githubData
  return { blog, email, avatar_url }

}

const getRepoList = async (getRepoListApi: string) => {
  const profileUrl = '/api/hello'
  const data: any = await PostData(profileUrl, getRepoListApi)
  if (data.message === "Not Found") return []
  console.log("data: ", data)
  if (!data || data?.length <= 0) return []

  const onlyPublicRepo: githubTopRepoType[] = (data || []).filter((item: githubTopRepoType) => item.visibility === "public")

  const sortedRepo: githubTopRepoType[] = onlyPublicRepo.sort((a, b) => {
    return b.stargazers_count - a.stargazers_count
  })
  return sortedRepo.slice(0, 2)
  // 
}
export { getRepoList, getGithubInfoByName }

