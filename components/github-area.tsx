import { Divider, Typography } from '@mui/material';
import { getLastPathname } from 'js-string-helper';
import React, { useCallback, useEffect } from 'react';
import { UseAppDispatch, UseAppSelector } from '../store';
import { getGithubUserInfo, getTopRepos, setGithubUserInfo, setGithubUsername } from '../store/platforms/github';
import { getSearchState } from '../store/search';
import { setEmail } from '../store/user/basicInfo';
import { SearchByType } from '../types/common.types';
import { getGithubInfoByName, getRepoList } from '../Utils/github';
import CardGithub from './common/card';

const GithubArea = () => {
  const { searchBy, originalSearchVal, userFound } = UseAppSelector(getSearchState);

  console.log("github-area>originalSearchVal ", originalSearchVal)

  const githubUserInfo = UseAppSelector(getGithubUserInfo);
  const githubTopRepos = UseAppSelector(getTopRepos);
  const { username } = githubUserInfo
  const dispatch = UseAppDispatch();

  useEffect(() => {
    if (username) return
    let githubUserName = originalSearchVal

    if (searchBy === SearchByType.URL) {
      updateGithubUserName(originalSearchVal)
    } else if (searchBy === SearchByType.EMAIL) {
      const { github_url } = userFound
      updateGithubUserName(github_url)
    } else {
      dispatch(setGithubUsername(githubUserName))
    }

  }, [originalSearchVal]);

  const updateGithubUserName = useCallback((githubUrl: string) => {

    if (!githubUrl) return
    try {
      let nameFromUrl = getLastPathname(githubUrl)
      if (!nameFromUrl) return
      dispatch(setGithubUsername(nameFromUrl))
    } catch (e) {
      console.error(e)
    }
  }, [])

  useEffect(() => {
    if (!username) return
    console.log("searching github userinfo", username, githubUserInfo)
    getGithubData()
  }, [username]);


  const getGithubData = React.useCallback(async () => {
    if (window == undefined || !username) return;
    const [gitHubBasicInfo, githubRepos] = await Promise.all([
      getGithubInfoByName(username),
      getRepoList(username),
    ]);
    const { email } = gitHubBasicInfo;
    if (email) dispatch(setEmail(email))
    dispatch(setGithubUserInfo({ ...gitHubBasicInfo, repos: githubRepos, username }))
  }, [username]);

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
