import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { getAnalytics, logEvent } from 'firebase/analytics';
import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import FirebaseLoginManage from '../Hooks/socailLogin';
import { wrapper } from '../store';
import '../styles/globals.css';
import { app } from '../Utils/firebaseConfig';
import BackdropComponent from "../components/common/Backdrop"
import ProfileWrapper from '../Hoc/profileWrapper';
import AlertDialog from '../components/common/TakeUserFeedback';
config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
    const { getSocialRedirectResult, getAuthStateChange } = FirebaseLoginManage()
    useEffect(() => {
        if (!app || !app.name) return;
        const analytics = getAnalytics();
        logEvent(analytics, 'page view');

        getSocialRedirectResult()
        // getAuthStateChange()


    }, []);


    return <>
        <AlertDialog />
        <ProfileWrapper>
            <Component {...pageProps} />
        </ProfileWrapper>
    </>;
}

export default wrapper.withRedux(MyApp);
