import * as React from 'react';
import { useCallback, useEffect, useState } from "react";
import { SearchByType } from '../types/common.types';
import { isValidHttpUrl } from '../Utils/crunchUrls';
import { GetData } from "../Utils/fetchData";

const codepenInfoFetchUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https://codepen.io/userName/popular/feed/'
const CodePenArea = (props) => {
  const { originalSearchVal, searchBy, pathname } = props

  let codePenUserName = originalSearchVal
  // considering the input to be a name
  if (searchBy === SearchByType.URL) {
    //extract name from the url
    codePenUserName = pathname.split("/").pop()
  }
  if (!codePenUserName) return <></>
  const codepenInfoFetchApi = codepenInfoFetchUrl.replace('userName', codePenUserName)
  const [popularPen, setPopularPen] = useState([])

  const getCodepenData = useCallback(async () => {
    const data: any = await GetData(codepenInfoFetchApi)
    const { items = [] } = data
    const sortedData = items.sort((a, b) => {
      return b.pubDate - a.pubDate
    })
    setPopularPen(sortedData.slice(0, 2))

  }, [])


  useEffect(() => {
    getCodepenData()
  }, [])
  console.log(popularPen)


  return <div style={{ display: 'flex' }}>
    {
      popularPen.map((item, idx) => {

        const codepenLink = item?.link
        if (!codepenLink) return <></>
        const { pathname } = new URL(codepenLink)
        if (!pathname) return <></>
        const pathnameArr = pathname.split('/').filter(item => item != '')

        // const parts = ['protocol', 'hostname', 'pathname'];

        const userName = pathnameArr[0]
        const projectName = pathnameArr.pop()
        const previewUrl = `https://codepen.io/${userName}/embed/preview/${projectName}`
        return <iframe height="300" scrolling="no" title="Stacking Cards (Motion One Version)" src={previewUrl}
          frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
          See the Pen <a href={codepenLink}>
            Stacking Cards (Motion One Version)</a> by Bramus (<a href={codepenLink}>@bramus</a>)
on <a href={codepenLink}>CodePen</a>.
</iframe>
      }
      )
    }
  </div >
}
export default CodePenArea