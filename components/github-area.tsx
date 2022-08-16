import { Divider, Typography } from '@mui/material';
import { getDomain, getLastPathname } from 'js-string-helper';
import React, { useCallback, useEffect, useMemo } from 'react';
import { UseAppDispatch, UseAppSelector } from '../store';
import { getGithubUserInfo, getTopRepos, setGithubUserInfo, setGithubUsername } from '../store/platforms/github';
import { getSearchState } from '../store/search';
import { setEmail } from '../store/user/basicInfo';
import { SearchByType } from '../types/common.types';
import { getGithubInfoByName, getRepoList } from '../Utils/github';
import { StorePlatformData } from '../Utils/storePlatformData';
import CardGithub from './common/card';

const GithubArea = () => {
  const { searchBy, originalSearchVal, userFound } = UseAppSelector(getSearchState);

  console.log("github-area>originalSearchVal ", originalSearchVal)

  const githubUserInfo = UseAppSelector(getGithubUserInfo);
  const githubTopRepos = UseAppSelector(getTopRepos);

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
    // TODO 
    // if (gitHubBasicInfo) {
    //   const dataBody = {
    //     source: githubUserInfo.html_url,
    //     data: gitHubBasicInfo
    //   }
    //   await StorePlatformData('/api/platform/add', dataBody)
    // }
    const { email } = gitHubBasicInfo;
    if (email) dispatch(setEmail(email))
    dispatch(setGithubUserInfo({ ...gitHubBasicInfo, repos: githubRepos, username: githubUserName }))
  }, [githubUserName]);

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
