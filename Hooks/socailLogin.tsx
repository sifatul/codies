import { getAnalytics, logEvent } from "firebase/analytics";
import { FacebookAuthProvider, fetchSignInMethodsForEmail, getAuth, getRedirectResult, GithubAuthProvider, GoogleAuthProvider, OAuthCredential, signInWithRedirect } from "firebase/auth";
import { useRouter } from "next/router";
import React from "react";
import { UseAppDispatch } from "../store";
import { setUserInfo } from "../store/user/basicInfo";
import { SocialLoginPlatform } from "../types/common.types";
import { githubProvider, googleProvider } from "../Utils/auth/providers";
import { GetData } from "../Utils/fetchData";






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

function getProvider(providerId: string) {
  switch (providerId) {
    case GoogleAuthProvider.PROVIDER_ID:
      return new GoogleAuthProvider();
    case FacebookAuthProvider.PROVIDER_ID:
      return new FacebookAuthProvider();
    case GithubAuthProvider.PROVIDER_ID:
      return new GithubAuthProvider();
    default:
      throw new Error(`No provider implemented for ${providerId}`);
  }
}


export default function FirebaseLoginManage() {
  const dispatch = UseAppDispatch();
  const router = useRouter()


  const socialLogin = async (providerId: string, token: string | OAuthCredential | null | undefined, email?: string | null | undefined, fullName?: string, profilePic?: string) => {
    let platform;
    if (providerId === GithubAuthProvider.PROVIDER_ID) {
      platform = SocialLoginPlatform.GITHUB
    } else if (providerId === GoogleAuthProvider.PROVIDER_ID) {
      platform = SocialLoginPlatform.GOOGLE
    }

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

  const getSocialRedirectResult = async () => {
    const supportedPopupSignInMethods = [
      GoogleAuthProvider.PROVIDER_ID,
      FacebookAuthProvider.PROVIDER_ID,
      GithubAuthProvider.PROVIDER_ID,
    ];

    try {
      const auth = getAuth();

      console.log(auth)
      const result = await getRedirectResult(auth)
      console.log("result: ", result)
      if (!result) return

      const user = result.user;


      let credential;
      if (result.providerId === GithubAuthProvider.PROVIDER_ID) {
        credential = GithubAuthProvider.credentialFromResult(result);
      } else if (result.providerId === GoogleAuthProvider.PROVIDER_ID) {
        credential = GoogleAuthProvider.credentialFromResult(result);
      }
      const analytics = getAnalytics();
      logEvent(analytics, 'google login successful');

      if (user.uid && result.providerId) await socialLogin(result.providerId, user.uid, user?.email || '', user?.displayName || '', user?.photoURL || '')

      if (!credential) return
      const token = credential.accessToken;

      // The signed-in user info.
    } catch (err: any) {
      const auth = getAuth();

      // if (err.email && err.credential && err.code === 'auth/account-exists-with-different-credential') {
      //   const providers = await fetchSignInMethodsForEmail(auth, err.email)
      //   const firstPopupProviderMethod = providers.find(p => supportedPopupSignInMethods.includes(p));

      //   // Test: Could this happen with email link then trying social provider?
      //   if (!firstPopupProviderMethod) {
      //     throw new Error(`Your account is linked to a provider that isn't supported.`);
      //   }

      //   const linkedProvider = getProvider(firstPopupProviderMethod);
      //   linkedProvider.setCustomParameters({ login_hint: err.email });

      //   const result: any = await signInWithRedirect(auth, linkedProvider);
      //   if (!result?.user) return
      //   result.user.linkWithCredential(err.credential);
      // }
      console.error(err);

      console.error("getGithubRedirectResult > error")
      // Handle Errors here.
      const errorCode = err.code;
      const errorMessage = err.message;
      // The email of the user's account used.
      const email = err.customData.email;
      // The AuthCredential type that was used.
      // const credential = GithubAuthProvider.credentialFromError(error);
      console.error(`${email} is registered under a different platform`)
    }

  }


  React.useEffect(() => {
    getSocialRedirectResult()
  }, [])

  return { socialLogin }

}



export {
  googleLogin,
  githubLogin
};
