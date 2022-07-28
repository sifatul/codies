import React, { useCallback, useEffect } from "react"
import { SearchByType } from "../types/common.types"
import { ForwardPostData, PostData } from "../Utils/fetchData"

const LeetCodeApi = `https://leetcode.com/userName/`
const LeetCodeArea = (props: any) => {

  const { originalSearchVal, searchBy, pathname, hostname } = props

  const getLeetCodeInfo = React.useCallback(async (nameFromUrl: string) => {
    console.log(" nameFromUrl", nameFromUrl)
    const userProfileApi = LeetCodeApi.replace('userName', nameFromUrl)
    const postApiForwardingApi = '/api/forward-api'
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
    const variables = { username: "user2608ZW" }

    // fetch(, {method: 'POST', body: JSON.stringify({ query, variables })})
    const param = JSON.stringify({ query, variables })

    const data: any = await ForwardPostData("https://leetcode.com/graphql/", param)
    console.log(data)
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