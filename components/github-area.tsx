import { Divider, Typography } from '@mui/material';
import { removeSpecialCharacter } from 'js-string-helper';
import { userInfo } from 'os';
import React, { useCallback, useEffect } from 'react';
import { UseAppDispatch, UseAppSelector } from '../store';
import { getGithubUserInfo, getTopRepos, setGithubUserInfo, setGithubUsername } from '../store/platforms/github';
import { getSearchState, userInfoType } from '../store/search';
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
      getGithubUserByUrl(originalSearchVal)
    } else if (searchBy === SearchByType.EMAIL) {
      const { github_url } = userFound
      getGithubUserByUrl(github_url)
    } else {
      dispatch(setGithubUsername(githubUserName))
    }

  }, [originalSearchVal]);

  const getGithubUserByUrl = useCallback((githubUrl: string) => {

    if (!githubUrl) return
    let { pathname: githubUserName } = new URL(githubUrl);
    if (!githubUserName) return

    const nameFromUrl = githubUserName.split('/').pop();
    if (!nameFromUrl) return
    dispatch(setGithubUsername(githubUserName))
  }, [])

  useEffect(() => {
    if (!username) return
    getGithubData(username)
  }, [username]);


  const getGithubData = React.useCallback(async (name: string) => {
    if (window == undefined || !name) return;
    name = removeSpecialCharacter(name)

    const [gitHubBasicInfo, githubRepos] = await Promise.all([
      getGithubInfoByName(name),
      getRepoList(name),
    ]);
    const { email } = gitHubBasicInfo;
    if (email) dispatch(setEmail(email))
    dispatch(setGithubUserInfo({ ...gitHubBasicInfo, repos: githubRepos, username: name }))
  }, []);

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
