import { signInWithPopup, getAuth, getRedirectResult, GoogleAuthProvider, signInWithRedirect, GithubAuthProvider, OAuthCredential } from "firebase/auth";
import { googleProvider, githubProvider } from "../Utils/auth/providers";
import { getAnalytics, logEvent } from "firebase/analytics";
import { SocialLoginPlatform } from "../types/common.types";



const socialLogin = async (platform: SocialLoginPlatform, idToken: string | OAuthCredential | null | undefined) => {
  try {
    const res = await fetch('/api/auth/social', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ platform, token: idToken }),
    });

    if (res.status == 400) {
      alert("user not registered. insert username");
      window.location.href = `account/userName/?platform=${platform}&token=${idToken}`
    }
    else if (res) {
      alert(JSON.stringify(res))
    }
  } catch (e) {
    console.error(e)
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
    if (!getAuth()) return
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

    if (user.uid && platform) await socialLogin(platform, user.uid)

    if (!credential) return
    const token = credential.accessToken;

    // The signed-in user info.
  } catch (error) {
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
