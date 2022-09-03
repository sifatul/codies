import { getDomain, getLastPathname, removeSpecialCharacter } from 'js-string-helper';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { UseAppDispatch, UseAppSelector } from '../store';
import { setGithubUsername } from '../store/platforms/github';
import {
    getHackerRankUserInfo,
    hackerRankDataType,
    setHackerRankInfo,
    setHackerRankSubmissionHistory,
} from '../store/platforms/hackerrank';
import { GitHub, LinkedIn } from '@mui/icons-material';
import { Avatar, CircularProgress, Divider, Grid, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { getSearchState } from '../store/search';
import { setCountry, setName, setProfilePic } from '../store/user/basicInfo';
import { SearchByType, Filter } from '../types/common.types';
import { PostData, PutData } from '../Utils/fetchData';
const getUserProfileApi =
'https://www.hackerrank.com/rest/contests/master/hackers/userName/profile';
const HackerrankArea = () => {
    const dispatch = UseAppDispatch();
    const [loading, setLoading] = useState(false);
    const hackerrankUserInfo = UseAppSelector(getHackerRankUserInfo);
    const { searchBy, originalSearchVal, userFound } = UseAppSelector(getSearchState);

    const hackerRankUserName = useMemo(() => {
        if (searchBy === SearchByType.NONE) return '';

        let userName = originalSearchVal;

        const { hackerrank_url } = userFound;
        if (searchBy === SearchByType.NAME) return userName;

        try {
            const hackerrankUrl = hackerrank_url || originalSearchVal;
            const domain = getDomain(hackerrankUrl) || '';
            if (new RegExp('hackerrank.com').test(domain) === false) return '';
            userName = getLastPathname(hackerrankUrl) || '';
        } catch (e) {
            console.error(e);
            return '';
        }
        return userName;
    }, []);

    useEffect(() => {
        getDataFromName();
    }, [hackerRankUserName]);

    const getHackerRankInfo = React.useCallback(async (nameFromUrl: string) => {
       
        const userProfileApi = getUserProfileApi.replace('userName', nameFromUrl);
        const postApiForwardingApi = '/api/forward-api';
        const data: any = await PostData(postApiForwardingApi, userProfileApi);
        const hackerRankdata: hackerRankDataType = data?.model || {};
        const { avatar, country, name } = hackerRankdata;
        if (name) dispatch(setName(name));
        if (avatar) dispatch(setProfilePic(avatar));
        if (country) dispatch(setCountry(country));
        dispatch(setHackerRankInfo(hackerRankdata));
        console.log("hackerRankdata> ", hackerRankdata);
        return hackerRankdata;
    }, []);

    const getHackerRankSubmissionHistory = React.useCallback(async (nameFromUrl: string) => {
        const hackerRankApi =
            'https://www.hackerrank.com/rest/hackers/userName/submission_histories';
        const hackerRankSubmissionHistoryApi = hackerRankApi.replace('userName', nameFromUrl);
        const postApiForwardingApi = '/api/forward-api';
        const data: any = await PostData(postApiForwardingApi, hackerRankSubmissionHistoryApi);
        if (!data) return;
        const dataKeys = Object.keys(data);
        if (dataKeys.length <= 0) return;
        dispatch(setHackerRankSubmissionHistory(data));
    }, []);

    const getDataFromName = useCallback(async () => {
        if (!hackerRankUserName) return;

        setLoading(true);
        const { github_url } = await getHackerRankInfo(hackerRankUserName);
        getHackerRankSubmissionHistory(hackerRankUserName);
        setLoading(false);
        if (!github_url) return console.warn('hackerrank area> github_url: not found');

        const githubUserName = getLastPathname(github_url);
        if (!githubUserName) return console.warn('hackerrank area> githubUserName: not found');
        dispatch(setGithubUsername(githubUserName));
    }, [hackerRankUserName]);
    console.log(hackerrankUserInfo)
    useEffect(() => {
        if (!hackerrankUserInfo.name) return
        const codepenInfoFetchApi = getUserProfileApi.replace('userName', hackerRankUserName);

        const param2 = {
            source: codepenInfoFetchApi,
            data: hackerrankUserInfo
        }
        PutData(`/api/platform/${Filter.HACKERRANK}`, JSON.stringify(param2))
    }, [hackerrankUserInfo])


    return (
        <>
            {loading && <CircularProgress />}
            {!loading && (
                <Box>
                    <Typography variant='h5' color={'primary'} py={1}>
                        Hackerrank Page
                    </Typography>
                    <Divider sx={{ mb: 3 }} />
                    <Grid container spacing={3}>
                        <Grid item lg={8} md={8} sm={12}>
                            <Typography>Name: {hackerrankUserInfo?.name}</Typography>
                            <Typography>Position: {hackerrankUserInfo?.job_title}</Typography>
                            <Typography>Company: {hackerrankUserInfo?.company}</Typography>
                            <Typography>Country: {hackerrankUserInfo?.country}</Typography>
                            <Typography>Username: {hackerrankUserInfo.username}</Typography>
                            <Typography>Level: {hackerrankUserInfo.level}</Typography>
                            <Typography>
                                Problem Solved: {hackerrankUserInfo?.solutionCount}
                            </Typography>
                            <Typography>{hackerrankUserInfo?.short_bio}</Typography>

                            <Box>
                                {hackerrankUserInfo.github_url ? (
                                    <IconButton
                                        component='a'
                                        target='_blank'
                                        href={hackerrankUserInfo.github_url || ''}
                                        rel='noopener noreferrer'
                                    >
                                        <GitHub />
                                    </IconButton>
                                ) : (
                                        <IconButton disabled component='a'>
                                            <GitHub />
                                        </IconButton>
                                    )}
                                {hackerrankUserInfo.linkedin_url ? (
                                    <IconButton
                                        component='a'
                                        target='_blank'
                                        href={hackerrankUserInfo.linkedin_url || ''}
                                        rel='noopener noreferrer'
                                    >
                                        <LinkedIn />
                                    </IconButton>
                                ) : (
                                        <IconButton disabled component='a'>
                                            <LinkedIn />
                                        </IconButton>
                                    )}
                            </Box>
                        </Grid>
                        <Grid item lg={4} md={4} sm={12}>
                            {hackerrankUserInfo.avatar ? (
                                <img
                                    src={hackerrankUserInfo?.avatar}
                                    alt='avatar'
                                    width={150}
                                    height={150}
                                />
                            ) : (
                                    <Avatar />
                                )}
                        </Grid>
                    </Grid>
                </Box>
            )}
        </>
    );
};
export default HackerrankArea;
