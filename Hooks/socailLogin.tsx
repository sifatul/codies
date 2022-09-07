import { signInWithPopup, getAuth, getRedirectResult, GoogleAuthProvider, signInWithRedirect, GithubAuthProvider, OAuthCredential } from "firebase/auth";
import { googleProvider, githubProvider } from "../Utils/auth/providers";
import { getAnalytics, logEvent } from "firebase/analytics";
import { SocialLoginPlatform } from "../types/common.types";


const socialLogin = async (platform: SocialLoginPlatform, idToken: string | OAuthCredential | null | undefined) => {
  const res = await fetch('/api/auth/social', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ platform, token: idToken }),
  });
  if (res) {
    alert(JSON.stringify(res))
  }
}
const googleLogin = () => {
  if (!getAuth()) return
  const auth = getAuth();
  signInWithRedirect(auth, googleProvider)
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(credential)

      // ...
    });
}

const githubLogin = () => {
  if (!getAuth()) return
  const auth = getAuth();
  signInWithRedirect(auth, githubProvider)
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GithubAuthProvider.credentialFromError(error);
      // ...
      socialLogin(SocialLoginPlatform.GOOGLE, credential)

    });
}


const getGoogleRedirectResult = () => {
  const auth = getAuth();
  console.log(auth)
  getRedirectResult(auth)
    .then((result) => {
      console.log("result: ", result)
      if (!result) return

      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (!credential) return
      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;


      const analytics = getAnalytics();
      logEvent(analytics, 'google login successful');


      if (token) socialLogin(SocialLoginPlatform.GOOGLE, user.uid)


    }).catch((error) => {
      console.error("getGoogleRedirectResult > error")
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}



const getGithubRedirectResult = () => {
  const auth = getAuth();
  console.log(auth)
  getRedirectResult(auth)
    .then((result) => {
      console.log("result: ", result)
      if (!result) return

      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GithubAuthProvider.credentialFromResult(result);
      if (!credential) return
      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;


      const analytics = getAnalytics();
      logEvent(analytics, 'github login successful');

      if (token) socialLogin(SocialLoginPlatform.GITHUB, user.uid)


    }).catch((error) => {
      console.error("getGithubRedirectResult > error")
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GithubAuthProvider.credentialFromError(error);
      // ...
    });
}


export {
  googleLogin,
  getGoogleRedirectResult,
  githubLogin, getGithubRedirectResult
};
