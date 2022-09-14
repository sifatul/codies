import { useCallback } from 'react';
import { GetData } from '../Utils/fetchData';

export default function checkUserInfo() {


  const getUserByName = useCallback(async (userName: string) => {
    try {
      const response: any = await GetData(`/api/users/username-check?userName=${userName}`);
      if (response?.status == 200) return response
      else throw response?.message

    } catch (e) {
      console.log(e);
      return null
    }


  }, [])
  const getUserByEmail = useCallback(async (email: string) => {
    try {

      const response: any = await GetData(`/api/users/email-check?email=${email}`);
      if (response?.status == 200) return response
      else throw response?.message

    } catch (e) {
      console.log(e);
      return null
    }


  }, [])
  return { getUserByName, getUserByEmail }

}