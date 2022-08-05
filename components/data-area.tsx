
import {
    Container,
    Divider,
    Grid,
    Typography
} from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import LeetCodeArea from '../components/leetcode-area';
import { UseAppDispatch, UseAppSelector } from '../store';
import { getGithubUserInfo, setGithubUserInfo, setGithubUsername } from '../store/platforms/github';
import { getHackerRankUserInfo, hackerRankDataType, setHackerRankInfo } from '../store/platforms/hackerrank';
import { setCountry, setEmail, setName, setProfilePic } from '../store/user/basicInfo';
import { SearchByType } from '../types/common.types';
import { PostData } from '../Utils/fetchData';
import { getGithubInfoByName, getRepoList } from '../Utils/github';
import CodePenArea from './codepen-area';
import CardGithub from './common/card';
import GithubArea from './github-area';




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
    const dispatch = UseAppDispatch();
    const hackerrankUserInfo = UseAppSelector(getHackerRankUserInfo);
    const githubUserInfo = UseAppSelector(getGithubUserInfo);
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
        console.log("hackerRankdata", hackerRankdata)
        const { username, avatar, country, name } = hackerRankdata
        if (name) dispatch(setName(name))
        if (avatar) dispatch(setProfilePic(avatar))
        if (country) dispatch(setCountry(country))
        dispatch(setHackerRankInfo(hackerRankdata))
        return hackerRankdata

    }, []);



    const getDataFromUrl = useCallback(() => {
        if (!hostname || !pathname) return;
        const nameFromUrl = pathname.split('/').pop();
        console.log(nameFromUrl);
        if (new RegExp('hackerrank.com').test(hostname)) {
            getHackerRankInfo(nameFromUrl).then((output) => {
                const { github_url } = output;
                const githubUserName = github_url?.split('/').pop() || nameFromUrl;
                dispatch(setGithubUsername(githubUserName))
                // getGithubData(githubUserName);
            });
        } else if (new RegExp('github.com').test(hostname)) {
            getHackerRankInfo(nameFromUrl);
            // getGithubData(nameFromUrl);
        }
        return;
    }, [hostname, pathname]);
    const getDataFromName = useCallback(async () => {
        if (!originalSearchVal) return;

        const hackerRankInfo = await getHackerRankInfo(originalSearchVal);
        const { github_url } = hackerRankInfo;
        // const githubUserName = github_url?.split('/').pop() || originalSearchVal;
        // getGithubData(githubUserName);
    }, [originalSearchVal]);

    useEffect(() => {
        console.log(searchBy);
        if (searchBy === SearchByType.URL) {
            getDataFromUrl();
        } else if (searchBy === SearchByType.NAME) {
            getDataFromName();
        }
    }, [searchBy, originalSearchVal]);




    return (
        <Container maxWidth="md" sx={{
            paddingTop: '50px',
        }}>

            <Grid container spacing={2} >
                <Grid item lg={10} md={12} xs={12} p={2}>
                    <GithubArea {...searchVal} />

                    {/* {userInfo?.hackerrank.linkedin_url && <LinkedinArea linkedin_url={userInfo?.hackerrank.linkedin_url} />} */}
                    <CodePenArea {...searchVal} />
                    <LeetCodeArea {...searchVal} />
                </Grid>

            </Grid>
        </Container>
    );
};

export default DataArea;
