import { CircularProgress } from '@mui/material';
import { removeSpecialCharacter } from 'js-string-helper';
import React, { useCallback, useEffect, useState } from "react";
import { UseAppDispatch, UseAppSelector } from "../store";
import { setGithubUsername } from '../store/platforms/github';
import { getHackerRankUserInfo, hackerRankDataType, setHackerRankInfo, setHackerRankSubmissionHistory } from "../store/platforms/hackerrank";
import { getSearchState } from '../store/search';
import { setCountry, setName, setProfilePic } from "../store/user/basicInfo";
import { SearchByType } from "../types/common.types";
import { PostData } from "../Utils/fetchData";

const HackerrankArea = (props: any) => {

  const dispatch = UseAppDispatch();
  const [loading, setLoading] = useState(false);
  const hackerrankUserInfo = UseAppSelector(getHackerRankUserInfo);
  const { searchBy, originalSearchVal, userFound, } = UseAppSelector(getSearchState);

  useEffect(() => {

    const { hackerrank_url } = userFound
    if (searchBy === SearchByType.URL) {
      getDataFromUrl(originalSearchVal);
    } else if (searchBy === SearchByType.NAME) {
      getDataFromName(originalSearchVal);
    } else if (searchBy === SearchByType.EMAIL && hackerrank_url) {
      console.log("hackerrank_url: ", hackerrank_url)
      getDataFromUrl(hackerrank_url);
    }
  }, [searchBy, originalSearchVal, userFound]);


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

  const getHackerRankSubmissionHistory = React.useCallback(async (nameFromUrl: string) => {
    const hackerRankApi = 'https://www.hackerrank.com/rest/hackers/userName/submission_histories'
    const hackerRankSubmissionHistoryApi = hackerRankApi.replace('userName', nameFromUrl);
    const postApiForwardingApi = '/api/forward-api';
    const data: any = await PostData(postApiForwardingApi, hackerRankSubmissionHistoryApi);
    if (!data) return
    const dataKeys = Object.keys(data);
    if (dataKeys.length <= 0) return
    dispatch(setHackerRankSubmissionHistory(data))

  }, []);


  const getDataFromUrl = useCallback(async (hackerRankUrl: string) => {

    let UrlIfno;
    try {
      UrlIfno = new URL(hackerRankUrl);
    } catch (e) {
      console.error(e);
    }
    if (!UrlIfno) return console.warn("hackerrank area> UrlIfno: not found")
    let { pathname, hostname } = UrlIfno;
    console.warn("hackerrank area> pathname, hostname", pathname, hostname)

    if (!pathname || !hostname) return console.warn("hackerrank area> hostname: not found")

    const nameFromUrl = pathname.split('/').filter(item => item).pop()
    if (!nameFromUrl) return console.warn("hackerrank area> nameFromUrl: not found")

    if (new RegExp('hackerrank.com').test(hostname) === false) return

    setLoading(true);
    const { github_url } = await getHackerRankInfo(nameFromUrl);
    getHackerRankSubmissionHistory(nameFromUrl)
    setLoading(false);
    if (!github_url) return console.warn("hackerrank area> github_url: not found")

    const githubUserName = github_url?.split('/').pop();
    if (!githubUserName) return console.warn("hackerrank area> githubUserName: not found")
    dispatch(setGithubUsername(githubUserName));
  }, []);

  const getDataFromName = useCallback(async (name: string) => {
    if (!name) return;
    name = removeSpecialCharacter(name);

    const { github_url } = await getHackerRankInfo(name);
    getHackerRankSubmissionHistory(name)
    setLoading(false);
    if (!github_url) return
    dispatch(setGithubUsername(github_url));
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