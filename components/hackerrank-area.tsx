import { GitHub, LinkedIn } from '@mui/icons-material';
import { Avatar, CircularProgress, Divider, Grid, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useCallback, useEffect, useState } from 'react';
import { UseAppDispatch, UseAppSelector } from '../store';
import { setGithubUsername } from '../store/platforms/github';
import {
    getHackerRankUserInfo,
    hackerRankDataType,
    setHackerRankInfo,
} from '../store/platforms/hackerrank';
import { getSearchState } from '../store/search';
import { setCountry, setName, setProfilePic } from '../store/user/basicInfo';
import { SearchByType } from '../types/common.types';
import { PostData } from '../Utils/fetchData';

const HackerrankArea = (props: any) => {
    const dispatch = UseAppDispatch();
    const [loading, setLoading] = useState(false);
    const hackerrankUserInfo = UseAppSelector(getHackerRankUserInfo);
    const { searchBy, originalSearchVal, userFound } = UseAppSelector(getSearchState);

    useEffect(() => {
        const { hackerrank_url } = userFound;
        if (searchBy === SearchByType.URL) {
            getDataFromUrl(originalSearchVal);
        } else if (searchBy === SearchByType.NAME) {
            getDataFromName(originalSearchVal);
        } else if (searchBy === SearchByType.EMAIL && hackerrank_url) {
            console.log('hackerrank_url: ', hackerrank_url);
            getDataFromUrl(hackerrank_url);
        }
    }, [searchBy, originalSearchVal, userFound]);

    const getHackerRankInfo = React.useCallback(async (nameFromUrl: string) => {
        const getUserProfileApi =
            'https://www.hackerrank.com/rest/contests/master/hackers/userName/profile';
        const userProfileApi = getUserProfileApi.replace('userName', nameFromUrl);
        const postApiForwardingApi = '/api/forward-api';
        const data: any = await PostData(postApiForwardingApi, userProfileApi);
        const hackerRankdata: hackerRankDataType = data?.model || {};
        const { avatar, country, name } = hackerRankdata;
        if (name) dispatch(setName(name));
        if (avatar) dispatch(setProfilePic(avatar));
        if (country) dispatch(setCountry(country));
        dispatch(setHackerRankInfo(hackerRankdata));
        console.log(hackerRankdata);
        return hackerRankdata;
    }, []);

    const getDataFromUrl = useCallback(async (hackerRankUrl: string) => {
        let UrlIfno;
        try {
            UrlIfno = new URL(hackerRankUrl);
        } catch (e) {
            console.error(e);
        }
        if (!UrlIfno) return console.warn('hackerrank area> UrlIfno: not found');
        let { pathname, hostname } = UrlIfno;
        console.warn('hackerrank area> pathname, hostname', pathname, hostname);

        if (!pathname || !hostname) return console.warn('hackerrank area> hostname: not found');

        const nameFromUrl = pathname
            .split('/')
            .filter((item) => item)
            .pop();
        if (!nameFromUrl) return console.warn('hackerrank area> nameFromUrl: not found');

        if (new RegExp('hackerrank.com').test(hostname) === false) return;

        setLoading(true);
        const { github_url } = await getHackerRankInfo(nameFromUrl);
        setLoading(false);
        if (!github_url) return console.warn('hackerrank area> github_url: not found');

        const githubUserName = github_url?.split('/').pop();
        if (!githubUserName) return console.warn('hackerrank area> githubUserName: not found');
        dispatch(setGithubUsername(githubUserName));
    }, []);

    const getDataFromName = useCallback(
        async (name: string) => {
            if (!name) return;

            const { github_url } = await getHackerRankInfo(name);
            setLoading(false);
            if (!github_url) return;
            dispatch(setGithubUsername(github_url));
        },
        [originalSearchVal]
    );

    return (
        <>
            {loading && <CircularProgress />}
            {!loading && (
                <>
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
                    {/* username: {hackerrankUserInfo.username} <br />
                    name: {hackerrankUserInfo.name} <br />
                    linkedin_url: {hackerrankUserInfo.linkedin_url} <br />
                    github_url: {hackerrankUserInfo.github_url} <br />
                    leetcode_url: {hackerrankUserInfo.leetcode_url} <br />
                    country: {hackerrankUserInfo.country} <br />
                    avatar: {hackerrankUserInfo.avatar} <br />
                    created_at: {hackerrankUserInfo.created_at} <br />
                    level: : {hackerrankUserInfo.level} <br />
                    website: : {hackerrankUserInfo.website} <br />
                    personal_first_name: : {hackerrankUserInfo.personal_first_name} <br />
                    personal_last_name: : {hackerrankUserInfo.personal_last_name} <br />
                    company: : {hackerrankUserInfo.company} <br />
                    local_language: : {hackerrankUserInfo.local_language} <br />
                    job_title: : {hackerrankUserInfo.job_title} <br />
                    jobs_headline: : {hackerrankUserInfo.jobs_headline} <br />
                    followers_count: : {hackerrankUserInfo.followers_count} <br />
                    short_bio: : {hackerrankUserInfo.short_bio} <br /> */}
                </>
            )}
        </>
    );
};
export default HackerrankArea;
