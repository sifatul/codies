import React from "react"
import {
  getSocialRedirectResult,
  googleLogin, githubLogin,
} from "../../Hooks/socailLogin"
import { css, cx } from '@emotion/css';
import Button, { ButtonType } from '../common/Button';

export const SocialBtnContainer = css`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 24px 0;
    margin: 35px 0;
`;


const SocialAuthComponent = () => {
  React.useEffect(() => {
    getSocialRedirectResult()
  }, [])

  return <>

    <div className={cx(SocialBtnContainer)}>
      <Button
        onClick={e => googleLogin()}
        type={ButtonType.SECONDARY}
        label='Connect with Google'
        icon='/images/auth/Google Logo.png'
      />
      <Button
        onClick={e => githubLogin()}
        type={ButtonType.SECONDARY}
        label='Connect with Github'
        icon='/images/auth/GitHub-Mark-ai 1.png'
      />
    </div>


  </>
}
export default SocialAuthComponent