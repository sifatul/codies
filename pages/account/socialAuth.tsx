import React from "react"
import {
  getSocialRedirectResult,
  googleLogin, githubLogin,
} from "../../Hooks/socailLogin"
const SocialAuth = () => {
  React.useEffect(() => {
    getSocialRedirectResult()
  }, [])


  return <>
    <button onClick={e => googleLogin()}> Continue with google </button>
    <button onClick={e => githubLogin()}> Continue with github </button>
  </>
}
export default SocialAuth