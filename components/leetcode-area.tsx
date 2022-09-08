import { GitHub, LinkedIn, Twitter } from '@mui/icons-material';
import { Avatar, Box, Divider, Grid, IconButton, Typography } from '@mui/material';
import { getDomain, getLastPathname } from 'js-string-helper';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { UseAppDispatch, UseAppSelector } from '../store';
import { setGithubUsername } from '../store/platforms/github';
import {
    getLeetcodeUserInfo,
    ProblemSolved,
    setLeetcodeLanguageProblemCount,
    setLeetcodeTagProblemCounts,
    setLeetcodeUserInfo,
} from '../store/platforms/leetcode';
import { getSearchState } from '../store/search';
import { Filter, SearchByType } from '../types/common.types';
import { PutData, GetData } from '../Utils/fetchData';
import { getLeetCodeProfileInfo, LeetCodeApi, QueryType } from '../Utils/leetcode';

const LeetCodeArea = () => {
    const { originalSearchVal, searchBy, userFound } = UseAppSelector(getSearchState);
    const [gotNewData, setGotNewData] = useState(false);

    const dispatch = UseAppDispatch();
    const leetcodeUserInfo = UseAppSelector(getLeetcodeUserInfo);

    const leetcodeUserName = useMemo(() => {
        if (searchBy === SearchByType.NONE) return '';

        let userName = originalSearchVal;

        const { leetcode_url } = userFound;
        if (searchBy === SearchByType.NAME) return userName;

        try {
            const leetcodeUrl = leetcode_url || originalSearchVal;
            const domain = getDomain(leetcodeUrl) || '';
            if (new RegExp('leetcode.com').test(domain) === false) return '';
            userName = getLastPathname(leetcodeUrl) || '';
        } catch (e) {
            return '';
        }
        return userName;
    }, []);

    const getLeetCodeInfo = React.useCallback(async () => {
        const getLeetcodeApi = LeetCodeApi + leetcodeUserName;

        const getDataFromDB: any = await GetData(
            `/api/${Filter.LEETCODE.toLocaleLowerCase()}/find?userName=${leetcodeUserName}`
        );
        debugger

        if (getDataFromDB) {
            const param = {
                githubUrl: getDataFromDB?.githubUrl,
                twitterUrl: getDataFromDB?.twitterUrl,
                linkedinUrl: getDataFromDB?.linkedinUrl,
                profile: getDataFromDB?.profile,
                languageProblemCount: getDataFromDB?.languageProblemCount,
                tagProblemCounts: getDataFromDB?.tagProblemCounts,
                username: leetcodeUserName,
            };

            dispatch(setLeetcodeUserInfo(param));
            dispatch(setLeetcodeLanguageProblemCount(getDataFromDB?.languageProblemCount));
            dispatch(setLeetcodeTagProblemCounts(getDataFromDB?.tagProblemCounts));
        } else {
            setGotNewData(true);
            const output: any = await getLeetCodeProfileInfo(
                leetcodeUserName,
                QueryType.userProfileQuery
            );
            dispatch(setLeetcodeUserInfo({ ...output, username: leetcodeUserName }));

            const problemSolved: ProblemSolved = (await getLeetCodeProfileInfo(
                leetcodeUserName,
                QueryType.LangugaeProblemSolvedQuery
            )) as ProblemSolved;
            dispatch(setLeetcodeLanguageProblemCount(problemSolved?.languageProblemCount));

            const problemCount: any = await getLeetCodeProfileInfo(
                leetcodeUserName,
                QueryType.TagProblemsCountQuery
            );
            dispatch(setLeetcodeTagProblemCounts(problemCount));

            if (output) {
                setGotNewData(true);
            }
        }
    }, [leetcodeUserName]);

    useEffect(() => {
        if (!leetcodeUserName) return;
        // already has data
        if (leetcodeUserInfo.username) return
        getLeetCodeInfo();
    }, [leetcodeUserName]);

    useEffect(() => {
        if (!leetcodeUserInfo?.profile_url) return;
        if (gotNewData) {
            const param = {
                source: LeetCodeApi + leetcodeUserName,
                data: leetcodeUserInfo,
            };
            PutData(`/api/platform/${Filter.LEETCODE}`, JSON.stringify(param));
        }
    }, [leetcodeUserInfo?.profile_url, gotNewData]);

    useEffect(() => {
        const githubUrl = leetcodeUserInfo.githubUrl;
        if (!githubUrl) return;
        const nameFromUrl = getLastPathname(githubUrl) || '';
        if (!nameFromUrl) return;
        dispatch(setGithubUsername(nameFromUrl));
    }, []);

    return (
        <>
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
                                    <LinkedIn />
                                </IconButton>
                            ) : (
                                    <IconButton disabled component='a'>
                                        <LinkedIn />
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
        </>
    );
};
export default LeetCodeArea;
