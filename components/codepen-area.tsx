import { Box, Divider, Grid, Typography } from '@mui/material';
import { getDomain, getLastPathname } from 'js-string-helper';
import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { UseAppDispatch, UseAppSelector } from '../store';
import { setcodepenUserInfo, getcodepenUserInfo, codepenProjectType } from '../store/platforms/codepen';
import { getSearchState } from '../store/search';
import { SearchByType, Filter } from '../types/common.types';
import { GetData } from '../Utils/fetchData';
import { PostData, PutData } from '../Utils/fetchData';

const codepenPensApiDemo = 'https://codepen.io/userName/popular/feed/'


const CodePenArea = () => {
    const dispatch = UseAppDispatch();

    const { searchBy, originalSearchVal, userFound } = UseAppSelector(getSearchState);
    const [popularPen, setPopularPen] = useState<codepenProjectType[]>([]);
    const codepenUserInfo = UseAppSelector(getcodepenUserInfo);
    const [gotNewData, setGotNewData] = React.useState(false)

    const codepenUserName = useMemo(() => {
        if (searchBy === SearchByType.NONE) return ''

        if (searchBy === SearchByType.NAME) return originalSearchVal
        let userName = originalSearchVal
        const { codepen_url } = userFound
        try {
            const codepenUrl = codepen_url || originalSearchVal
            const domain = getDomain(codepenUrl) || ''
            if (new RegExp('codepen.io').test(domain) === false) return ''
            userName = getLastPathname(codepenUrl) || ''

        } catch (e) {
            console.error(e)
            return ''
        }
        return userName
    }, [searchBy])

    // console.log("codepenUserName", codepenUserName)

    const getCodepenData = useCallback(async () => {
        if (!codepenUserName) return

        const codepenInfoFetchApi = codepenPensApiDemo.replace('userName', codepenUserName);
        // look into database first
        let data: any = await GetData(`/api/codepen/find?userName=${codepenUserName}`);

        let items: codepenProjectType[] = data;

        if (!items || items.length <= 0 || !items?.[0]) return

        const sortedData: codepenProjectType[] = items.sort(
            (a: { pubDate: number }, b: { pubDate: number }) => {
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
    }, [codepenUserName]);


    useEffect(() => {
        if (!codepenUserName) return
        // already has data
        if (codepenUserInfo.pens && codepenUserInfo.pens.length > 0) return
        getCodepenData();
    }, [codepenUserName]);

    useEffect(() => {
        if (!codepenUserInfo?.pens?.length || !gotNewData) return
        const codepenInfoFetchApi = codepenPensApiDemo.replace('userName', codepenUserName);

        const param2 = {
            source: codepenInfoFetchApi,
            data: codepenUserInfo?.pens
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
