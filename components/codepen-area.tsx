import { Box, Divider, Grid, Typography } from '@mui/material';
import { getDomain, getLastPathname } from 'js-string-helper';
import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { UseAppDispatch, UseAppSelector } from '../store';
import { setcodepenUserInfo, getcodepenUserInfo } from '../store/platforms/codepen';
import { getSearchState } from '../store/search';
import { SearchByType, Filter } from '../types/common.types';
import { GetData } from '../Utils/fetchData';
import { PostData, PutData } from '../Utils/fetchData';
interface codepenItemType {
    pubDate: string;
    link: string;
    title: string;
}


const CodePenArea = () => {
    const dispatch = UseAppDispatch();

    const { searchBy, originalSearchVal, userFound } = UseAppSelector(getSearchState);

    const [popularPen, setPopularPen] = useState<codepenItemType[]>([]);
    const codepenUserInfo = UseAppSelector(getcodepenUserInfo);
    const codepenUserName = useMemo(() => {
        if (searchBy === SearchByType.NONE) return ''

        if (searchBy === SearchByType.NAME) return originalSearchVal
        let userName = originalSearchVal
        const { codepen_url } = userFound
        try {
            const codepenUrl = codepen_url || originalSearchVal
            const domain = getDomain(codepenUrl) || ''
            if (new RegExp('codepen.com').test(domain) === false) return ''
            userName = getLastPathname(codepenUrl) || ''

        } catch (e) {
            console.error(e)
            return ''
        }
        return userName
    }, [searchBy])


    const getCodepenData = useCallback(async () => {
        const codepenInfoFetchUrl =
            'https://api.rss2json.com/v1/api.json?rss_url=https://codepen.io/userName/popular/feed/';
        const codepenInfoFetchApi = codepenInfoFetchUrl.replace('userName', codepenUserName);

        const data: any = await GetData(codepenInfoFetchApi);
        const { items = [] } = data;

        const sortedData: codepenItemType[] = items.sort(
            (a: { pubDate: string }, b: { pubDate: string }) => {
                const timeA = new Date(a.pubDate).getTime();
                const timeB = new Date(b.pubDate).getTime();
                return timeB - timeA;
            }
        );
        const codepenData = {
            pens: sortedData,
            username: codepenUserName,
        };
        dispatch(setcodepenUserInfo(codepenData));
        setPopularPen(sortedData.slice(0, 2));
    }, []);


    useEffect(() => {
        if (!codepenUserName) return
        getCodepenData();
    }, [codepenUserName]);

    useEffect(() => {
        if (!codepenUserInfo || !codepenUserInfo?.pens || !codepenUserInfo?.pens?.length) return

        const param2 = {
            source: codepenUserInfo.profile_url,
            data: codepenUserInfo
        }
        PutData(`/api/platform/${Filter.CODEPEN}`, JSON.stringify(param2))
    }, [codepenUserInfo])

    return (
        <Box my={3}>
            <Typography variant='h5' py={1} color='primary'>
                Codepen
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Grid container spacing={3} my={2}>
                {popularPen.map((item, idx) => {
                    if (!item) return <></>;

                    const codepenLink = item?.link;
                    if (!codepenLink) return <></>;
                    const { pathname } = new URL(codepenLink);
                    if (!pathname) return <></>;
                    const pathnameArr = pathname.split('/').filter((item) => item != '');

                    // const parts = ['protocol', 'hostname', 'pathname'];

                    const userName = pathnameArr[0];
                    const projectName = pathnameArr.pop();
                    const previewUrl = `https://codepen.io/${userName}/embed/preview/${projectName}`;
                    return (
                        <Grid item xs={12} md={12} lg={6} key={projectName}>
                            <iframe
                                height='300'
                                key={'ifram-' + idx}
                                scrolling='no'
                                title={item?.title}
                                src={previewUrl}
                                frameBorder='no'
                                loading='lazy'
                                allowTransparency={true}
                                allowFullScreen={true}
                            >
                                See the Pen{' '}
                                <a href={codepenLink}>Stacking Cards (Motion One Version)</a> by
                                Bramus (<a href={codepenLink}>@bramus</a>) on{' '}
                                <a href={codepenLink}>CodePen</a>.
                            </iframe>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};
export default CodePenArea;
