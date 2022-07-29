import React, { useCallback, useEffect, useState } from "react"
import { SearchByType } from "../types/common.types"

const LeetCodeApi = "https://leetcode.com/graphql/"
const LeetCodeArea = (props: any) => {

  const { originalSearchVal, searchBy, pathname, hostname } = props
  const [leetcodeInfo, setLeetcodeInfo] = useState({
    aboutMe: '',
    company: '',
    jobTitle: '',
    school: ''
  })

  const getLeetCodeInfo = React.useCallback(async (nameFromUrl: string) => {
    const query = `
    query userProfile($username: String!) {
      matchedUser(username: $username) {
        profile {
          aboutMe
          company
          jobTitle
          school
        }
      }
    }
  `
    const variables = { username: nameFromUrl }


    const param = JSON.stringify({
      query,
      variables,
      url: LeetCodeApi
    })

    fetch('/api/leetcode-api', { method: "POST", body: param })
      .then(function (res) {
        return res.json();
      })
      .then(function (json) {
        // resolve(json)
        console.log(json)
        if (!json) return
        const { matchedUser } = json
        if (!matchedUser) return
        const { profile } = matchedUser

        if (!profile) return
        setLeetcodeInfo(profile)
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
    {leetcodeInfo.aboutMe && <>
      <h1>Leetcode : about me </h1>
      <p>{leetcodeInfo.aboutMe}</p>
    </>}

  </>
}
export default LeetCodeArea