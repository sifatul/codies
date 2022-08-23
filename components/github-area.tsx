import { Divider, Typography } from '@mui/material';
import { getDomain, getLastPathname } from 'js-string-helper';
import React, { useCallback, useEffect, useMemo } from 'react';
import { UseAppDispatch, UseAppSelector } from '../store';
import { getGithubUserInfo, getTopRepos, setGithubUserInfo } from '../store/platforms/github';
import { getSearchState } from '../store/search';
import { setEmail } from '../store/user/basicInfo';
import { Filter, SearchByType } from '../types/common.types';
import { PostData, PutData } from '../Utils/fetchData';
import { getGithubInfoByName, getRepoList, GithuApis } from '../Utils/github';
import CardGithub from './common/card';

const GithubArea = () => {
  const { searchBy, originalSearchVal, userFound } = UseAppSelector(getSearchState);
  const [gotNewData, setGotNewData] = React.useState(false)


  const githubUserInfo = UseAppSelector(getGithubUserInfo);
  const githubTopRepos = UseAppSelector(getTopRepos) || [];

  const dispatch = UseAppDispatch();


  const githubUserName = useMemo(() => {
    const { username } = githubUserInfo
    console.log(githubUserName)
    if (username) return username
    if (searchBy === SearchByType.NONE) return ''



    if (searchBy === SearchByType.NAME) return originalSearchVal
    let userName = originalSearchVal
    const { github_url } = userFound
    try {
      const githubUrl = github_url || originalSearchVal
      const domain = getDomain(githubUrl) || ''
      if (new RegExp('github.com').test(domain) === false) return ''
      userName = getLastPathname(githubUrl) || ''

    } catch (e) {
      console.error(e)
      return ''
    }
    return userName
  }, [githubUserInfo.username, searchBy])

  useEffect(() => {
    if (!githubUserName) return
    console.log("githubUserName: ", githubUserName)
    getGithubData()
  }, [githubUserName]);


  const getGithubData = React.useCallback(async () => {
    if (window == undefined || !githubUserName) return;
    console.log("calling getGithubData")
    const [gitHubBasicInfo, githubRepos] = await Promise.all([
      getGithubInfoByName(githubUserName),
      getRepoList(githubUserName),
    ]);

    const { email } = gitHubBasicInfo;
    if (email) dispatch(setEmail(email))
    const isNew = gitHubBasicInfo.isNewData || githubRepos.isNewData
    if (isNew) {
      setGotNewData(true)
    }

    const repos = githubRepos.repos

    dispatch(setGithubUserInfo({ ...gitHubBasicInfo, repos, username: githubUserName }))
  }, [githubUserName]);

  useEffect(() => {
    // only store new data to database
    if (!gotNewData) return

    // user basic info in github not found yet
    if (!githubUserName || !githubUserInfo?.html_url) return
    const param1 = {
      source: GithuApis.userInfoApi.replace('userName', githubUserName),
      data: githubUserInfo
    }
    PutData(`/api/platform/${Filter.GITHUB}`, JSON.stringify(param1))
    if ((githubUserInfo?.repos || []).length <= 0) return

    const param2 = {
      source: GithuApis.getRepoListApi.replace('userName', githubUserName),
      data: githubUserInfo.repos
    }
    PutData(`/api/platform/${Filter.GITHUB}`, JSON.stringify(param2))

  }, [githubUserInfo?.html_url, userFound.github_url, githubUserName, gotNewData])



  return <>


    {(githubTopRepos || [])?.length > 0 && (
      <>
        <Typography variant='h5' component='div'> Projects  </Typography>

        <Divider sx={{ mb: 5 }} />

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {githubTopRepos?.map((repo, idx) => (
            <CardGithub topRepo={repo} key={'repo' + idx} />
          ))}
        </div>
      </>
    )}</>
}
export default GithubArea
