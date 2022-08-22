import { isUrl } from 'js-string-helper';
import * as React from 'react';
import { useCallback, useEffect, useMemo } from 'react';
import { UseAppDispatch, UseAppSelector } from '../store';
import { getMediumData, mediumBlogItemType, setMediumData } from '../store/platforms/medium';
import { getSearchState } from '../store/search';
import { SearchByType } from '../types/common.types';
import { GetData } from '../Utils/fetchData';



const MediumArea = () => {
  const dispatch = UseAppDispatch();
  const mediumData = UseAppSelector(getMediumData);

  const { searchBy, originalSearchVal, userFound } = UseAppSelector(getSearchState);


  const mediumUserName = useMemo(() => {
    if (searchBy === SearchByType.NONE) return ''

    if (searchBy === SearchByType.NAME) return originalSearchVal
    let userName = originalSearchVal
    const { medium_url } = userFound
    try {
      const mediumUrl = medium_url || originalSearchVal
      if (!isUrl(mediumUrl) || !mediumUrl.includes('medium.com')) return ''
      const mediumUrlSplit = mediumUrl.split("@")
      userName = mediumUrlSplit?.pop() || ''

    } catch (e) {
      console.error(e)
      return ''
    }
    return userName
  }, [searchBy])

  console.log("mediumUserName", mediumUserName)


  const fetchMediumData = useCallback(async () => {
    const codepenInfoFetchUrl =
      'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@userName';
    const mediumFetchApi = codepenInfoFetchUrl.replace('userName', mediumUserName);

    const data: any = await GetData(mediumFetchApi);
    if (!data) return
    dispatch(setMediumData(data))

    // TODO
    /* 
    
    2. show data from  > store/platforms/medium.tsx
    3. store data in database
    3. show data in database

     *  
    */

  }, []);


  useEffect(() => {
    if (!mediumUserName) return
    fetchMediumData();
  }, [mediumUserName]);

  return <>
    <h1> Medium data area </h1>
    {mediumData?.items?.map((item: mediumBlogItemType) => {
      return <>
        {item.author}
        {item.link}
        {item.pubDate}
      </>
    })}

  </>
};
export default MediumArea;
