import { useCallback } from 'react';
import { UseAppDispatch, UseAppSelector } from '../store';
import { getUserState, setUserInfo } from '../store/user/basicInfo';
import { GetData, PatchData } from '../Utils/fetchData';

export default function checkUserInfo() {
  const dispatch = UseAppDispatch();
  const { _id = '' } = UseAppSelector(getUserState);



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
  const updateUserInfo = useCallback(async (data: any, callback?: any) => {


    dispatch(setUserInfo(data))

    try {
      await PatchData(`/api/users/${_id}`, JSON.stringify(data))
      callback()
    } catch (e) {
      console.error(e)
    }

  }, [_id])

  return { getUserByName, getUserByEmail, updateUserInfo }

}