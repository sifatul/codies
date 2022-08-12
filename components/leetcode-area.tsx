import React, { useCallback, useEffect, } from "react"
import { UseAppDispatch, UseAppSelector } from "../store"
import { SearchByType } from "../types/common.types"
import { getLeetcodeUserInfo, setLeetcodeLanguageProblemCount, setLeetcodeTagProblemCounts, setLeetcodeUserInfo } from '../store/platforms/leetcode';
import { setGithubUsername } from '../store/platforms/github';
import { getLeetCodeProfileInfo, QueryType } from "../Utils/leetcode";


const LeetCodeArea = (props: any) => {

  const { originalSearchVal, searchBy, pathname, hostname, userFound } = props
  const dispatch = UseAppDispatch();
  const leetcodeUserInfo = UseAppSelector(getLeetcodeUserInfo);



  const getLeetCodeInfo = React.useCallback(async (nameFromUrl: string) => {
    getLeetCodeProfileInfo(nameFromUrl, QueryType.userProfileQuery).then((output: any) => {
      dispatch(setLeetcodeUserInfo({ ...output, username: nameFromUrl }));
    })

    getLeetCodeProfileInfo(nameFromUrl, QueryType.LangugaeProblemSolvedQuery).then((output: any) => {
      dispatch(setLeetcodeLanguageProblemCount(output));
    })
    getLeetCodeProfileInfo(nameFromUrl, QueryType.TagProblemsCountQuery).then((output: any) => {
      dispatch(setLeetcodeTagProblemCounts(output));
    })

  }, [])


  const getDataFromName = useCallback(async (name: string) => {

    if (!name) return

    const leetCodeData = await getLeetCodeInfo(name)


  }, [originalSearchVal])

  const getDataFromUrl = useCallback((leetcodeUrl: string) => {
    let UrlIfno;
    try {
      UrlIfno = new URL(leetcodeUrl);
    } catch (e) {
      console.error(e);
    }
    if (!UrlIfno) return console.warn("leetcode area> UrlIfno: not found")
    let { pathname, hostname } = UrlIfno;
    console.warn("leetcode area> pathname, hostname", pathname, hostname)

    if (!pathname || !hostname) return console.warn("leetcode area> hostname: not found")

    const nameFromUrl = pathname.split('/').filter(item => item).pop()
    if (!nameFromUrl) return console.warn("leetcode area> nameFromUrl: not found")
    if (new RegExp('leetcode.com').test(hostname) === false) return
    getDataFromName(nameFromUrl)

  }, [hostname, pathname])

  useEffect(() => {
    const { leetcode_url } = userFound

    if (searchBy === SearchByType.URL) {
      getDataFromUrl(originalSearchVal)
    } else if (searchBy === SearchByType.NAME) {
      getDataFromName(originalSearchVal)
    }
    else if (searchBy === SearchByType.EMAIL) {
      getDataFromUrl(leetcode_url)
    }

  }, [searchBy])
  useEffect(() => {
    const githubUrl = leetcodeUserInfo.githubUrl
    if (!githubUrl) return
    let { pathname: githubUserName } = new URL(githubUrl);
    if (!githubUserName) return

    const nameFromUrl = githubUserName.split('/').pop();
    if (!nameFromUrl) return
    dispatch(setGithubUsername(nameFromUrl))

  }, [leetcodeUserInfo.githubUrl]);

  console.log(leetcodeUserInfo)
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