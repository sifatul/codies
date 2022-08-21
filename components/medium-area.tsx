import { Box, Divider, Grid, Typography } from '@mui/material';
import { getDomain, getLastPathname } from 'js-string-helper';
import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { UseAppDispatch, UseAppSelector } from '../store';
import { setcodepenUserInfo } from '../store/platforms/codepen';
import { getSearchState } from '../store/search';
import { SearchByType } from '../types/common.types';
import { GetData } from '../Utils/fetchData';



const MediumArea = () => {
  const dispatch = UseAppDispatch();

  const { searchBy, originalSearchVal, userFound } = UseAppSelector(getSearchState);


  const mediumUserName = useMemo(() => {
    if (searchBy === SearchByType.NONE) return ''

    if (searchBy === SearchByType.NAME) return originalSearchVal
    let userName = originalSearchVal
    const { medium_url } = userFound
    try {
      const mediumUrl = medium_url || originalSearchVal
      const domain = getDomain(mediumUrl) || ''
      if (new RegExp('medium.com').test(domain) === false) return ''
      userName = getLastPathname(mediumUrl) || ''

    } catch (e) {
      console.error(e)
      return ''
    }
    return userName
  }, [searchBy])


  const getCodepenData = useCallback(async () => {
    const codepenInfoFetchUrl =
      'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@userName';
    const mediumFetchApi = codepenInfoFetchUrl.replace('userName', mediumUserName);

    const data: any = await GetData(mediumFetchApi);
    console.log("data from medium ", data)

    // TODO
    /* 
    1. store data in medium store >  store/platforms/medium.tsx
    2. show data from  > store/platforms/medium.tsx
    3. store data in database
    3. show data in database

     *  
    */

  }, []);


  useEffect(() => {
    if (!mediumUserName) return
    getCodepenData();
  }, [mediumUserName]);

  return <> Medium data area </>
};
export default MediumArea;
