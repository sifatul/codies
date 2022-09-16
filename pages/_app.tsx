import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { getAnalytics, logEvent } from 'firebase/analytics';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import FirebaseLoginManage from '../Hooks/socailLogin';
import { wrapper } from '../store';
import '../styles/globals.css';
import { app } from '../Utils/firebaseConfig';
config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
    const { getAuthStateChange } = FirebaseLoginManage()
    useEffect(() => {
        if (!app || !app.name) return;
        const analytics = getAnalytics();
        logEvent(analytics, 'page view');

        getAuthStateChange()
    }, []);

    return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
