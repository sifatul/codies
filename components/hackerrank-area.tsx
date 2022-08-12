import { CircularProgress } from '@mui/material';
import React, { useCallback, useEffect, useState } from "react";
import { UseAppDispatch, UseAppSelector } from "../store";
import { setGithubUsername } from '../store/platforms/github';
import { getHackerRankUserInfo, hackerRankDataType, setHackerRankInfo } from "../store/platforms/hackerrank";
import { setCountry, setName, setProfilePic } from "../store/user/basicInfo";
import { SearchByType } from "../types/common.types";
import { PostData } from "../Utils/fetchData";




const HackerrankArea = (props: any) => {

  const dispatch = UseAppDispatch();
  const [loading, setLoading] = useState(false);
  const hackerrankUserInfo = UseAppSelector(getHackerRankUserInfo);
  const { hostname = '', pathname = '', searchBy, originalSearchVal } = props;
  console.log(props)
  useEffect(() => {
    if (new RegExp('hackerrank.com').test(hostname) === false) return

    if (searchBy === SearchByType.URL) {
      getDataFromUrl();
    } else if (searchBy === SearchByType.NAME) {
      getDataFromName();
    }
  }, [searchBy, originalSearchVal]);


  const getHackerRankInfo = React.useCallback(async (nameFromUrl: string) => {
    const getUserProfileApi = 'https://www.hackerrank.com/rest/contests/master/hackers/userName/profile'
    const userProfileApi = getUserProfileApi.replace('userName', nameFromUrl);
    const postApiForwardingApi = '/api/forward-api';
    const data: any = await PostData(postApiForwardingApi, userProfileApi);
    const hackerRankdata: hackerRankDataType = data?.model || {};
    const { avatar, country, name } = hackerRankdata;
    if (name) dispatch(setName(name));
    if (avatar) dispatch(setProfilePic(avatar));
    if (country) dispatch(setCountry(country));
    dispatch(setHackerRankInfo(hackerRankdata));
    console.log(hackerRankdata)
    return hackerRankdata;
  }, []);

  const getDataFromUrl = useCallback(async () => {
    if (!hostname || !pathname) return;
    const nameFromUrl = pathname.split('/').pop();
    setLoading(true);
    const { github_url } = await getHackerRankInfo(nameFromUrl);
    setLoading(false);
    if (!github_url) return

    const githubUserName = github_url?.split('/').pop() || nameFromUrl;
    dispatch(setGithubUsername(githubUserName));
  }, [hostname, pathname]);

  const getDataFromName = useCallback(async () => {
    if (!originalSearchVal) return;

    const { github_url } = await getHackerRankInfo(originalSearchVal);
    setLoading(false);
    if (!github_url) return
    const githubUserName = github_url?.split('/').pop() || originalSearchVal;
    dispatch(setGithubUsername(githubUserName));
  }, [originalSearchVal]);


  return <>
    {loading && <CircularProgress />}
    {!loading && <>
      <h1>Hackerrank Page</h1>
      username:  {hackerrankUserInfo.username} <br />

name: {hackerrankUserInfo.name} <br />

linkedin_url: { hackerrankUserInfo.linkedin_url} <br />
github_url: { hackerrankUserInfo.github_url} <br />
leetcode_url: { hackerrankUserInfo.leetcode_url} <br />
country: { hackerrankUserInfo.country} <br />
avatar: { hackerrankUserInfo.avatar} <br />
created_at: { hackerrankUserInfo.created_at} <br />
level: : { hackerrankUserInfo.level} <br />
website: : { hackerrankUserInfo.website} <br />
personal_first_name: : { hackerrankUserInfo.personal_first_name} <br />
personal_last_name: : { hackerrankUserInfo.personal_last_name} <br />
company: : { hackerrankUserInfo.company} <br />
local_language: : { hackerrankUserInfo.local_language} <br />
job_title: : { hackerrankUserInfo.job_title} <br />
jobs_headline: : { hackerrankUserInfo.jobs_headline} <br />
followers_count: : { hackerrankUserInfo.followers_count} <br />
short_bio: : { hackerrankUserInfo.short_bio} <br />
    </>}

  </>
}
export default HackerrankArea