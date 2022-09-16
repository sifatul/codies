import type { NextPage } from 'next';
import * as React from 'react';
import MiniDrawer from '../components/drawer';
import InitialPage from '../components/initalPage';
import { UseAppSelector } from '../store';
import { getSearchState } from '../store/search';
import { SearchByType } from '../types/common.types';
import { getAuth, onAuthStateChanged, signOut, fetchSignInMethodsForEmail, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider, signInWithRedirect } from "firebase/auth";
import FirebaseLoginManage from '../Hooks/socailLogin';
const Home: NextPage = () => {
    const SearchState = UseAppSelector(getSearchState);

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
    const supportedPopupSignInMethods = [
        GoogleAuthProvider.PROVIDER_ID,
        FacebookAuthProvider.PROVIDER_ID,
        GithubAuthProvider.PROVIDER_ID,
    ];
    const { socialLogin } = FirebaseLoginManage()
    React.useEffect(() => {
        const auth = getAuth();
        if (!auth) return
        console.log(auth)
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                if (!user.email) return alert("email is missing")
                const providers = await fetchSignInMethodsForEmail(auth, user.email)

                const firstPopupProviderMethod = providers.find(p => supportedPopupSignInMethods.includes(p as "google.com" | "facebook.com" | "github.com"));
                if (!firstPopupProviderMethod) return
                if (user.uid) await socialLogin(firstPopupProviderMethod, user.uid, user?.email || '', user?.displayName || '', user?.photoURL || '')


                // Test: Could this happen with email link then trying social provider?
                if (!firstPopupProviderMethod) {
                    throw new Error(`Your account is linked to a provider that isn't supported.`);
                }

            } else {
                // User is signed out
                // ...
                debugger
            }
        });
    }, [])
    return (
        <>
            {SearchState.searchBy === SearchByType.NONE && <InitialPage />}

            {SearchState.searchBy !== SearchByType.NONE && <MiniDrawer />}
        </>
    );
};

export default Home;
