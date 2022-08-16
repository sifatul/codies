import { getDomain, getLastPathname } from "js-string-helper";
import React, { useCallback, useEffect, useMemo } from "react";
import { UseAppDispatch, UseAppSelector } from "../store";
import { setGithubUsername } from '../store/platforms/github';
import { getLeetcodeUserInfo, setLeetcodeLanguageProblemCount, setLeetcodeTagProblemCounts, setLeetcodeUserInfo } from '../store/platforms/leetcode';
import { getSearchState } from "../store/search";
import { SearchByType } from "../types/common.types";
import { getLeetCodeProfileInfo, QueryType } from "../Utils/leetcode";


const LeetCodeArea = () => {
  const { originalSearchVal, searchBy, userFound } = UseAppSelector(getSearchState);

  const dispatch = UseAppDispatch();
  const leetcodeUserInfo = UseAppSelector(getLeetcodeUserInfo);
  const leetcodeUserName = useMemo(() => {
    if (searchBy === SearchByType.NONE) return ''

    let userName = originalSearchVal

    const { leetcode_url } = userFound
    if (searchBy === SearchByType.NAME) return userName

    try {
      const leetcodeUrl = leetcode_url || originalSearchVal
      const domain = getDomain(leetcodeUrl) || ''
      if (new RegExp('leetcode.com').test(domain) === false) return ''
      userName = getLastPathname(leetcodeUrl) || ''

    } catch (e) {
      console.error(e)
      return ''
    }
    return userName

  }, [])



  const getLeetCodeInfo = React.useCallback(async () => {
    console.log("getLeetCodeInfo: is calling")
    getLeetCodeProfileInfo(leetcodeUserName, QueryType.userProfileQuery).then((output: any) => {
      dispatch(setLeetcodeUserInfo({ ...output, username: leetcodeUserName }));
    })

    getLeetCodeProfileInfo(leetcodeUserName, QueryType.LangugaeProblemSolvedQuery).then((output: any) => {
      dispatch(setLeetcodeLanguageProblemCount(output?.languageProblemCount));
    })
    getLeetCodeProfileInfo(leetcodeUserName, QueryType.TagProblemsCountQuery).then((output: any) => {
      dispatch(setLeetcodeTagProblemCounts(output));
    })

  }, [leetcodeUserName])


  useEffect(() => {
    if (!leetcodeUserName) return
    console.log("leetcodeUserName ", leetcodeUserName)
    getLeetCodeInfo()
  }, [leetcodeUserName])


  useEffect(() => {
    const githubUrl = leetcodeUserInfo.githubUrl
    if (!githubUrl) return
    const nameFromUrl = getLastPathname(githubUrl) || ''
    if (!nameFromUrl) return
    dispatch(setGithubUsername(nameFromUrl))
  }, []);


  return <>
    <h1>Leetcode page</h1>

    <h2>links</h2>
    githubUrl: {leetcodeUserInfo.githubUrl}<br />
    twitterUrl: {leetcodeUserInfo.twitterUrl}<br />
    linkedinUrl: {leetcodeUserInfo.linkedinUrl}<br />
    username: {leetcodeUserInfo.username}<br />


    userAvatar: {leetcodeUserInfo.profile?.userAvatar}<br />
    realName: {leetcodeUserInfo.profile?.realName}<br />
    aboutMe: {leetcodeUserInfo.profile?.aboutMe}<br />
    school: {leetcodeUserInfo.profile?.school}<br />
    countryName: {leetcodeUserInfo.profile?.countryName}<br />
    company: {leetcodeUserInfo.profile?.company}<br />
    jobTitle: {leetcodeUserInfo.profile?.jobTitle}<br />
    postViewCount: {leetcodeUserInfo.profile?.postViewCount}<br />
    reputation: {leetcodeUserInfo.profile?.reputation}<br />
    solutionCount: {leetcodeUserInfo.profile?.solutionCount}<br />
    websites: {leetcodeUserInfo.profile?.websites.map(website => <div key={website}>{website}</div>)}<br />

    <h2>problem solving</h2>
    TODO


  </>
}
export default LeetCodeArea