import React from "react"
import {
  getSocialRedirectResult,
  googleLogin, githubLogin,
} from "../../Hooks/socailLogin"
import { css, cx } from '@emotion/css';
import Button, { ButtonType } from '../common/Button';
import { setUserInfo } from "../../store/user/basicInfo";
import { OAuthCredential } from "firebase/auth";
import { UseAppDispatch } from "../../store";
import { SocialLoginPlatform } from "../../types/common.types";
import { GetData } from "../../Utils/fetchData";
import { useRouter } from "next/router";

export const SocialBtnContainer = css`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 24px 0;
    margin: 35px 0;
`;


const SocialAuthComponent = () => {

  const dispatch = UseAppDispatch();
  const router = useRouter()


  const socialLogin = async (platform: SocialLoginPlatform, token: string | OAuthCredential | null | undefined, email?: string | null | undefined, fullName?: string, profilePic?: string) => {

    try {
      const query = `platform=${platform}&token=${token}&email=${email}&fullName=${fullName}&profilePic=${profilePic}`;
      const res: any = await GetData(`/api/auth/social?${query}`)
      if (res?.status == 200) {
        delete res.status

        dispatch(setUserInfo(res))
        router.push(`/account/profile?username=${res?.userName}`)
      }
      if (res?.status == 404) {
        // user not found
        // proceed to create new user

        router.push(`/auth/signup/social?${query}`)


      }
    } catch (e) {
      console.error(e)
      alert(JSON.stringify(e))
    }
  }
  React.useEffect(() => {
    getSocialRedirectResult(socialLogin)
  }, [])

  return <>

    <div className={cx(SocialBtnContainer)}>
      <Button
        onClick={e => {
          e.preventDefault()
          googleLogin()
        }}
        type={ButtonType.SECONDARY}
        label='Connect with Google'
        icon='/images/auth/Google Logo.png'
      />
      <Button
        onClick={e => {
          e.preventDefault()
          githubLogin()
        }}
        type={ButtonType.SECONDARY}
        label='Connect with Github'
        icon='/images/auth/GitHub-Mark-ai 1.png'
      />
    </div>


  </>
}
export default SocialAuthComponent