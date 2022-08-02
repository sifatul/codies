
import {
    Container,
    Divider,
    Grid,
    Typography
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import LeetCodeArea from '../components/leetcode-area';
import { useAppDispatch, useAppSelector } from '../store';
import { getHackerRankUserInfo, setHackerRankInfo } from '../store/platforms/hackerrank';
import { getUserState, setCountry, setName, setProfilePic } from '../store/user/basicInfo';
import { getGithubUserInfo, setGithubUserInfo } from '../store/platforms/github';
import { SearchByType } from '../types/common.types';
import { PostData } from '../Utils/fetchData';
import { getGithubInfoByName, getRepoList } from '../Utils/github';
import CodePenArea from './codepen-area';
import CardGithub from './common/card';
import UserInfoArea from './userInfo-area';

interface hackerRankDataType {
    linkedin_url: string;
    github_url: string;
    leetcode_url: string;
    country: string;
    languages: string[];
    avatar: string;
    name: string;
}


const domainList: any = {
    hackerrank: {
        name: 'hackerrank',
        userInfoApi: 'https://www.hackerrank.com/rest/contests/master/hackers/userName/profile',
    },
    github: {
        name: 'github',
        userInfoApi: 'https://api.github.com/users/userName',
        repoListApi: 'https://api.github.com/users/userName/repos',
    },
};
const DataArea = (props: any) => {
    const dispatch = useAppDispatch();
    const hackerrankUserInfo = useAppSelector(getHackerRankUserInfo);
    const githubUserInfo = useAppSelector(getGithubUserInfo);
    console.log("hackerrankUserInfo: ", hackerrankUserInfo)
    console.log("github: ", githubUserInfo)

    const { searchVal } = props;
    const { hostname = '', pathname = '', searchBy, originalSearchVal } = searchVal;
    console.log(searchVal);


    const getHackerRankInfo = React.useCallback(async (nameFromUrl: string) => {
        const getUserProfileApi = domainList.hackerrank.userInfoApi;
        const userProfileApi = getUserProfileApi.replace('userName', nameFromUrl);
        const postApiForwardingApi = '/api/forward-api';
        const data: any = await PostData(postApiForwardingApi, userProfileApi);
        const hackerRankdata: hackerRankDataType = data?.model || {};
        const { name, avatar, country } = hackerRankdata
        if (name) dispatch(setName(name))
        if (avatar) dispatch(setProfilePic(avatar))
        if (country) dispatch(setCountry(country))
        dispatch(setHackerRankInfo(hackerRankdata))
        return hackerRankdata

    }, []);

    const getGithubData = React.useCallback(async (name: string) => {
        if (window == undefined) return;
        const getRepoListApi = domainList.github.repoListApi.replace('userName', name);
        const userProfileApi = domainList.github.userInfoApi.replace('userName', name);

        const [gitHubBasicInfo, githubRepos] = await Promise.all([
            getGithubInfoByName(userProfileApi),
            getRepoList(getRepoListApi),
        ]);
        dispatch(setGithubUserInfo({ ...gitHubBasicInfo, topRepos: githubRepos }))
    }, []);

    const getDataFromUrl = useCallback(() => {
        if (!hostname || !pathname) return;
        const nameFromUrl = pathname.split('/').pop();
        console.log(nameFromUrl);
        if (new RegExp('hackerrank.com').test(hostname)) {
            getHackerRankInfo(nameFromUrl).then((output) => {
                const { github_url } = output;
                const githubUserName = github_url?.split('/').pop() || nameFromUrl;
                getGithubData(githubUserName);
            });
        } else if (new RegExp('github.com').test(hostname)) {
            getHackerRankInfo(nameFromUrl);
            getGithubData(nameFromUrl);
        }
        return;
    }, [hostname, pathname]);
    const getDataFromName = useCallback(async () => {
        if (!originalSearchVal) return;

        const hackerRankInfo = await getHackerRankInfo(originalSearchVal);
        const { github_url } = hackerRankInfo;
        const githubUserName = github_url?.split('/').pop() || originalSearchVal;
        getGithubData(githubUserName);
    }, [originalSearchVal]);

    useEffect(() => {
        console.log(searchBy);
        if (searchBy === SearchByType.URL) {
            getDataFromUrl();
        } else if (searchBy === SearchByType.NAME) {
            getDataFromName();
        }
    }, [searchBy, originalSearchVal]);

    const userAvatar = React.useMemo(() => {
        if (githubUserInfo.avatar_url) return githubUserInfo.avatar_url;
        return hackerrankUserInfo.avatar;
    }, [githubUserInfo.avatar_url, hackerrankUserInfo.avatar]);



    return (
        <Container maxWidth="md" sx={{
            paddingTop: '50px',
        }}>

            <Grid container spacing={2} >
                <Grid item lg={8} md={10} xs={10} p={2}>
                    {(githubUserInfo.topRepos || [])?.length > 0 && (
                        <>
                            <Typography variant='h5' component='div'>
                                Projects
                            </Typography>

                            <Divider sx={{ mb: 5 }} />

                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                {githubUserInfo.topRepos?.map((repo, idx) => (
                                    <CardGithub topRepo={repo} key={'repo' + idx} />
                                ))}
                            </div>
                        </>
                    )}

                    {/* {userInfo?.hackerrank.linkedin_url && <LinkedinArea linkedin_url={userInfo?.hackerrank.linkedin_url} />} */}
                    <CodePenArea {...searchVal} />
                    <LeetCodeArea {...searchVal} />
                </Grid>
                <Grid item lg={4} md={8} xs={8} p={10} >

                    <UserInfoArea
                        userAvatar={userAvatar}
                        userName={hackerrankUserInfo.name}
                        email={githubUserInfo?.email}
                        country={hackerrankUserInfo?.country}
                        blog={githubUserInfo?.blog}
                        github_url={hackerrankUserInfo?.github_url}
                        linkedin_url={hackerrankUserInfo?.linkedin_url}
                        leetcode_url={hackerrankUserInfo?.leetcode_url}
                        languages={hackerrankUserInfo?.languages}

                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default DataArea;
