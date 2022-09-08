import { Divider, Typography } from '@mui/material';
import { getDomain, getLastPathname } from 'js-string-helper';
import React, { useEffect, useMemo } from 'react';
import { UseAppDispatch, UseAppSelector } from '../store';
import { getGithubUserInfo, getTopRepos, setGithubUserInfo } from '../store/platforms/github';
import { getSearchState } from '../store/search';
import { setEmail } from '../store/user/basicInfo';
import { Filter, SearchByType } from '../types/common.types';
import { GetData } from '../Utils/fetchData';
import CardGithub from './common/card';

const GithubArea = () => {
  const { searchBy, originalSearchVal, userFound } = UseAppSelector(getSearchState);


  const githubUserInfo = UseAppSelector(getGithubUserInfo);
  const githubTopRepos = UseAppSelector(getTopRepos) || [];

  const dispatch = UseAppDispatch();


  const githubUserName = useMemo(() => {
    const { username } = githubUserInfo
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
    if (window == undefined || !githubUserName) return;
    // alread has data
    if (githubUserInfo?.html_url) return
    getGithubData()
  }, [githubUserName]);


  const getGithubData = React.useCallback(async () => {
    if (window == undefined || !githubUserName) return;
    console.log("calling getGithubData")
    const gitHubBasicInfo: any = await GetData(`/api/${Filter.GITHUB.toLocaleLowerCase()}/find?userName=${githubUserName}`);

    const { email } = gitHubBasicInfo;
    if (email) dispatch(setEmail(email))


    const repos = gitHubBasicInfo.repos

    dispatch(setGithubUserInfo({ ...gitHubBasicInfo, repos, username: githubUserName }))
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