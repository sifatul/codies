import React, { useCallback, useEffect, } from "react"
import { UseAppDispatch, UseAppSelector } from "../store"
import { SearchByType } from "../types/common.types"
import { getLeetcodeUserInfo, setLeetcodeLanguageProblemCount, setLeetcodeTagProblemCounts, setLeetcodeUserInfo } from '../store/platforms/leetcode';
import { setGithubUsername } from '../store/platforms/github';
import { getLeetCodeProfileInfo, QueryType } from "../Utils/leetcode";


const LeetCodeArea = (props: any) => {

  const { originalSearchVal, searchBy, pathname, hostname } = props
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


  const getDataFromName = useCallback(async () => {

    if (!originalSearchVal) return

    const leetCodeData = await getLeetCodeInfo(originalSearchVal)
    console.log(leetCodeData)


  }, [originalSearchVal])

  const getDataFromUrl = useCallback(() => {
    if (!hostname || !pathname) return
    const nameFromUrl = pathname.split("/").pop()
    console.log(nameFromUrl)
    if ((new RegExp("leetcode.com")).test(hostname)) getLeetCodeInfo(nameFromUrl);
  }, [hostname, pathname])

  useEffect(() => {

    if (searchBy === SearchByType.URL) {
      getDataFromUrl()
    } else if (searchBy === SearchByType.NAME) {
      getDataFromName()
    }

  }, [searchBy])
  useEffect(() => {
    const githubUrl = leetcodeUserInfo.githubUrl
    if (!githubUrl) return
    let { pathname: githubUserName } = new URL(githubUrl);

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