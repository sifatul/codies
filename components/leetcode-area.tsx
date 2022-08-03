import React, { useCallback, useEffect, } from "react"
import { UseAppDispatch } from "../store"
import { SearchByType } from "../types/common.types"
import { setLeetcodeLanguageProblemCount, setLeetcodeTagProblemCounts, setLeetcodeUserInfo } from '../store/platforms/leetcode';
import { getLeetCodeProfileInfo, QueryType } from "../Utils/leetcode";


const LeetCodeArea = (props: any) => {

  const { originalSearchVal, searchBy, pathname, hostname } = props
  const dispatch = UseAppDispatch();


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
    if ((new RegExp("leetcode.com")).test(hostname)) {
      getLeetCodeInfo(nameFromUrl).then(output => {
        console.log(output)
      })


    }
  }, [hostname, pathname])

  useEffect(() => {

    if (searchBy === SearchByType.URL) {
      getDataFromUrl()
    } else if (searchBy === SearchByType.NAME) {
      getDataFromName()
    }

  }, [searchBy])


  return <>


  </>
}
export default LeetCodeArea