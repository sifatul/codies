import { css, cx } from '@emotion/css';
import { useRouter } from "next/router";
import React from "react";
import FirebaseLoginManage, { githubLogin, googleLogin } from "../../Hooks/socailLogin";
import { UseAppDispatch } from "../../store";
import Button, { ButtonType } from '../common/Button';

export const SocialBtnContainer = css`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 24px 0;
    margin-top: 35px;
    margin-bottom: 24px;
`;


const SocialAuthComponent = () => {


  FirebaseLoginManage()





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