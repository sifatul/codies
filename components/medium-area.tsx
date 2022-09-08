import { isUrl } from 'js-string-helper';
import * as React from 'react';
import { useCallback, useEffect, useMemo } from 'react';
import { UseAppDispatch, UseAppSelector } from '../store';
import { getMediumData, mediumBlogItemType, setMediumData } from '../store/platforms/medium';
import { getSearchState } from '../store/search';
import { Filter, SearchByType } from '../types/common.types';
import { GetData, PutData } from '../Utils/fetchData';

const mediumInfoFetchUrl =
  'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@userName';

const MediumArea = () => {
  const dispatch = UseAppDispatch();
  const mediumData = UseAppSelector(getMediumData);
  const [gotNewData, setGotNewData] = React.useState(false)

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

    if (!mediumUserName) return
    // const mediumFetchApi = mediumInfoFetchUrl.replace('userName', mediumUserName);

    // let data: any = await GetData(`/api/platform/${Filter.MEDIUM}?source=${mediumFetchApi}`);
    // if (!data) {
    //   data = await GetData(mediumFetchApi);
    //   //new data found
    //   if (data) setGotNewData(true);
    // }
    let data: any = await GetData(`/api/medium/find?userName=${mediumUserName}`);

    if (!data || !data.feed) return
    dispatch(setMediumData(data))

  }, [mediumUserName]);


  useEffect(() => {
    if (!mediumUserName) return
    fetchMediumData();
  }, [mediumUserName]);

  useEffect(() => {
    if (!gotNewData || mediumData.mediums?.length <= 0 || !mediumUserName) return

    // only store new data in database

    const param = {
      source: mediumInfoFetchUrl.replace('userName', mediumUserName),
      data: mediumData
    }
    PutData(`/api/platform/${Filter.MEDIUM}`, JSON.stringify(param))
}, [mediumData?.mediums?.length, gotNewData])

  return <>
    <h1> Medium data area </h1>
    {mediumData?.mediums?.map((item: mediumBlogItemType) => {
      return <>
        {item.author}
        {item.link}
        {item.pubDate}
      </>
    })}

  </>
};
export default MediumArea;
