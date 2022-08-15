import { getDomain, isEmail } from 'js-string-helper';
import { useCallback } from 'react';
import { UseAppDispatch } from '../store';
import { resetSearchType, setSearchTypeEmail, setSearchTypeName, setSearchTypeUrl, userInfoType } from '../store/search';
import { Filter } from '../types/common.types';
import { GetData } from '../Utils/fetchData';

export default function SearchHelper() {
  const dispatch = UseAppDispatch();

  const getUserByPlatform = useCallback(async (searchVal: string) => {
    const hostnameAndQueryKey = {
      GITHUB: "github_url",
      LEETCODE: "leetcode_url",
      HACKERRANK: "hackerrank_url",
      CODEPEN: "codepen_url",
      MEDIUM: "medium_url",
      LINKEDIN: "linkedin_url"
    }
    if (!searchVal) return
    const _platformName = getDomain(searchVal)
    if (!_platformName) return
    const platformName = _platformName.split('.')?.[0]

    const queryKey = hostnameAndQueryKey[platformName.toUpperCase() as Filter]
    if (!queryKey) return
    const param = {
      [queryKey]: searchVal
    }

    return await GetData(`api/user/get/platform?param=${JSON.stringify(param)}`)


  }, [])

  const searchInputHandler = async (searchVal: string) => {
    if (!searchVal) return;
    dispatch(resetSearchType)

    if (isEmail(searchVal)) {
      const param = {
        email: searchVal
      }
      const userInfo = await GetData(`api/user/get/platform?param=${JSON.stringify(param)}`)

      if (userInfo) {
        dispatch(setSearchTypeEmail(userInfo as userInfoType))
        return
      }
    }


    try {
      // check if it is a valid url

      let { protocol, hostname, pathname } = new URL(searchVal);

      // check values exists in database
      const userInfo = await getUserByPlatform(searchVal)
      if (userInfo) {
        dispatch(setSearchTypeEmail(userInfo as userInfoType))
        return
      }

      //remove trailing slash
      if (pathname.substr(-1) === '/') pathname = pathname.slice(0, -1);

      //its a valid url
      dispatch(setSearchTypeUrl({
        protocol,
        hostname,
        pathname,
        originalSearchVal: searchVal,
      }))
    } catch (e) {
      console.error(e);
      dispatch(setSearchTypeName(searchVal))

    }
  };
  return { searchInputHandler }

}