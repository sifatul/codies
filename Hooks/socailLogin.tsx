import { getAnalytics, logEvent } from "firebase/analytics";
import { getAuth, getRedirectResult, GithubAuthProvider, GoogleAuthProvider, OAuthCredential, signInWithRedirect } from "firebase/auth";
import { SocialLoginPlatform } from "../types/common.types";
import { githubProvider, googleProvider } from "../Utils/auth/providers";
import { GetData } from "../Utils/fetchData";



const socialLogin = async (platform: SocialLoginPlatform, token: string | OAuthCredential | null | undefined, email?: string |  null | undefined) => {
  try {
    const query = `platform=${platform}&token=${token}&email=${email}`;
    const res: any = await GetData(`/api/auth/social?${query}`)
    if (res?.status == 200) return window.location.href = `/account/profile`
    if (res?.status == 404) {
      // user not found
      // proceed to create new user
      window.location.href = `/auth/signup/social?${query}`

    }
  } catch (e) {
    console.error(e)
    alert(JSON.stringify(e))
  }
}


const googleLogin = async () => {
  try {
    if (!getAuth()) return
    const auth = getAuth();
    signInWithRedirect(auth, googleProvider)
  } catch (e) {
    console.error(e)
  }


}

const githubLogin = () => {
  try {
    if (!getAuth()) {
      console.error("firebase auth missing")
      return
    }
    const auth = getAuth();
    signInWithRedirect(auth, githubProvider)
  } catch (e) {
    console.error(e)
  }

}


const getSocialRedirectResult = async () => {

  try {
    const auth = getAuth();
    console.log(auth)
    const result = await getRedirectResult(auth)
    console.log("result: ", result)
    if (!result) return

    const user = result.user;


    let platform, credential;
    if (result.providerId === 'github.com') {
      platform = SocialLoginPlatform.GITHUB
      credential = GithubAuthProvider.credentialFromResult(result);
    } else if (result.providerId === 'google.com') {
      platform = SocialLoginPlatform.GOOGLE
      credential = GoogleAuthProvider.credentialFromResult(result);
    }
    const analytics = getAnalytics();
    logEvent(analytics, 'google login successful');

    console.log(user)
    if (user.uid && platform) await socialLogin(platform, user.uid, user?.email || '')

    if (!credential) return
    const token = credential.accessToken;

    // The signed-in user info.
  } catch (error: any) {
    console.error(error);

    console.error("getGithubRedirectResult > error")
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    // const credential = GithubAuthProvider.credentialFromError(error);
    console.error(`${email} is registered under a different platform`)
  }

}





export {
  googleLogin,
  getSocialRedirectResult,
  githubLogin
};
