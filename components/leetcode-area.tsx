import React, { useCallback, useEffect } from 'react';
import { UseAppDispatch, UseAppSelector } from '../store';
import { SearchByType } from '../types/common.types';
import {
    getLeetcodeUserInfo,
    setLeetcodeLanguageProblemCount,
    setLeetcodeTagProblemCounts,
    setLeetcodeUserInfo,
} from '../store/platforms/leetcode';
import { setGithubUsername } from '../store/platforms/github';
import { getLeetCodeProfileInfo, QueryType } from '../Utils/leetcode';
import { getSearchState } from '../store/search';
import { Avatar, Box, Button, Divider, Grid, IconButton, Typography } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { GitHub, Twitter } from '@mui/icons-material';

const LeetCodeArea = (props: any) => {
    const { originalSearchVal, searchBy, pathname, hostname, userFound } =
        UseAppSelector(getSearchState);

    const dispatch = UseAppDispatch();
    const leetcodeUserInfo = UseAppSelector(getLeetcodeUserInfo);

    const getLeetCodeInfo = React.useCallback(async (nameFromUrl: string) => {
        getLeetCodeProfileInfo(nameFromUrl, QueryType.userProfileQuery).then((output: any) => {
            dispatch(setLeetcodeUserInfo({ ...output, username: nameFromUrl }));
        });

        getLeetCodeProfileInfo(nameFromUrl, QueryType.LangugaeProblemSolvedQuery).then(
            (output: any) => {
                dispatch(setLeetcodeLanguageProblemCount(output));
            }
        );
        getLeetCodeProfileInfo(nameFromUrl, QueryType.TagProblemsCountQuery).then((output: any) => {
            dispatch(setLeetcodeTagProblemCounts(output));
        });
    }, []);

    const getDataFromName = useCallback(
        async (name: string) => {
            if (!name) return;

            await getLeetCodeInfo(name);
        },
        [originalSearchVal]
    );

    const getDataFromUrl = useCallback(
        (leetcodeUrl: string) => {
            let UrlIfno;
            try {
                UrlIfno = new URL(leetcodeUrl);
            } catch (e) {
                console.error(e);
            }
            if (!UrlIfno) return console.warn('leetcode area> UrlIfno: not found');
            let { pathname, hostname } = UrlIfno;
            console.warn('leetcode area> pathname, hostname', pathname, hostname);

            if (!pathname || !hostname) return console.warn('leetcode area> hostname: not found');

            const nameFromUrl = pathname
                .split('/')
                .filter((item) => item)
                .pop();
            if (!nameFromUrl) return console.warn('leetcode area> nameFromUrl: not found');
            if (new RegExp('leetcode.com').test(hostname) === false) return;
            getDataFromName(nameFromUrl);
        },
        [hostname, pathname]
    );

    useEffect(() => {
        const { leetcode_url } = userFound;

        if (searchBy === SearchByType.URL) {
            getDataFromUrl(originalSearchVal);
        } else if (searchBy === SearchByType.NAME) {
            getDataFromName(originalSearchVal);
        } else if (searchBy === SearchByType.EMAIL) {
            getDataFromUrl(leetcode_url);
        }
    }, [searchBy]);
    useEffect(() => {
        const githubUrl = leetcodeUserInfo.githubUrl;
        if (!githubUrl) return;
        let { pathname: githubUserName } = new URL(githubUrl);
        if (!githubUserName) return;

        const nameFromUrl = githubUserName.split('/').pop();
        if (!nameFromUrl) return;
        dispatch(setGithubUsername(nameFromUrl));
    }, [leetcodeUserInfo.githubUrl]);

    console.log(leetcodeUserInfo);
    return (
        <Box>
            <Typography variant='h5' color={'primary'} py={1}>
                Leetcode page
            </Typography>
            <Divider sx={{ mb: 3 }} />
            {/* <h2>links</h2> */}
            <Grid container spacing={2}>
                <Grid item lg={8} md={8} sm={12}>
                    <Typography>Name: {leetcodeUserInfo.profile?.realName}</Typography>
                    <Typography>Position: {leetcodeUserInfo.profile?.jobTitle}</Typography>
                    <Typography>Company: {leetcodeUserInfo.profile?.company}</Typography>
                    <Typography>Country: {leetcodeUserInfo.profile?.countryName}</Typography>
                    <Typography>Username: {leetcodeUserInfo.username}</Typography>
                    <Typography>
                        Problem Solved: {leetcodeUserInfo.profile?.solutionCount}
                    </Typography>
                    <Typography>{leetcodeUserInfo.profile?.aboutMe}</Typography>

                    <Box>
                        {leetcodeUserInfo.githubUrl ? (
                            <IconButton
                                component='a'
                                target='_blank'
                                href={leetcodeUserInfo.githubUrl || ''}
                                rel='noopener noreferrer'
                            >
                                <GitHub />
                            </IconButton>
                        ) : (
                            <IconButton disabled component='a'>
                                <GitHub />
                            </IconButton>
                        )}
                        {leetcodeUserInfo.linkedinUrl ? (
                            <IconButton
                                component='a'
                                target='_blank'
                                href={leetcodeUserInfo.linkedinUrl || ''}
                                rel='noopener noreferrer'
                            >
                                <LinkedInIcon />
                            </IconButton>
                        ) : (
                            <IconButton disabled component='a'>
                                <LinkedInIcon />
                            </IconButton>
                        )}
                        {leetcodeUserInfo.twitterUrl ? (
                            <IconButton
                                component='a'
                                target='_blank'
                                href={leetcodeUserInfo.twitterUrl || ''}
                                rel='noopener noreferrer'
                            >
                                <Twitter />
                            </IconButton>
                        ) : (
                            <IconButton disabled component='a'>
                                <Twitter />
                            </IconButton>
                        )}
                    </Box>
                </Grid>
                <Grid item lg={4} md={4} sm={12}>
                    {leetcodeUserInfo.profile?.userAvatar ? (
                        <img
                            src={leetcodeUserInfo.profile?.userAvatar}
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
    );
};
export default LeetCodeArea;
