import { PostData } from '../Utils/fetchData';
import { isEmail } from 'js-string-helper';
import { UseAppDispatch } from '../store';
import { resetSearchType, setSearchTypeEmail, setSearchTypeName, setSearchTypeUrl, userInfoType } from '../store/search';
export default function SearchHelper() {
  const dispatch = UseAppDispatch();

  const searchInputHandler = async (searchVal: string) => {
    if (!searchVal) return;
    dispatch(resetSearchType)
    debugger

    if (isEmail(searchVal)) {
      const userInfo = await PostData('api/getUserNyEmail', searchVal)
      if (userInfo) {

        setSearchTypeEmail(userInfo as userInfoType)
        return
      }
    }
    // if search val was not an email || userinfo not found
    try {
      let { protocol, hostname, pathname } = new URL(searchVal);

      //remove trailing slash
      if (pathname.substr(-1) === '/') pathname = pathname.slice(0, -1);

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