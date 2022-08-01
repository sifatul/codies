import GitHubIcon from '@mui/icons-material/GitHub';
import ImageIcon from '@mui/icons-material/Image';
import {
    Avatar,
    Chip,
    Container,
    Divider,
    Grid,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Stack,
    Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import React, { useCallback, useEffect, useState } from 'react';
import { SearchByType } from '../types/common.types';
import { PostData } from '../Utils/fetchData';
import { getGithubInfoByName, getRepoList, githubDataType } from '../Utils/github';
import CodePenArea from './codepen-area';
import CardGithub from './common/card';
import LeetCodeArea from '../components/leetcode-area';
interface hackerRankDataType {
    linkedin_url: string;
    github_url: string;
    leetcode_url: string;
    country: string;
    languages: string[];
    avatar: string;
    name: string;
}
const initialState = {
    hackerrank: {
        linkedin_url: '',
        github_url: '',
        leetcode_url: '',
        country: '',
        languages: [],
        avatar: '',
        name: '',
    },
    github: {
        blog: '',
        email: '',
        avatar_url: '',
        topRepos: [],
    },
};

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
    const { searchVal } = props;
    const { hostname = '', pathname = '', searchBy, originalSearchVal } = searchVal;
    console.log(searchVal);
    const [userInfo, setUserInfo] = useState<{
        hackerrank: hackerRankDataType;
        github: githubDataType;
    }>(initialState);

    const getHackerRankInfo = React.useCallback(async (nameFromUrl: string) => {
        const getUserProfileApi = domainList.hackerrank.userInfoApi;
        const userProfileApi = getUserProfileApi.replace('userName', nameFromUrl);
        const postApiForwardingApi = '/api/forward-api';
        const data: any = await PostData(postApiForwardingApi, userProfileApi);
        const hackerRankdata: hackerRankDataType = data?.model || {};

        const {
            linkedin_url = '',
            country = '',
            github_url = '',
            languages = [],
            avatar = '',
            leetcode_url = '',
            name = '',
        } = hackerRankdata;

        setUserInfo((prevState) => {
            return {
                ...prevState,
                hackerrank: {
                    linkedin_url,
                    country,
                    github_url,
                    languages,
                    avatar,
                    leetcode_url,
                    name,
                },
            };
        });

        return hackerRankdata;
    }, []);

    const getGithubData = React.useCallback(async (name: string) => {
        const getRepoListApi = domainList.github.repoListApi.replace('userName', name);
        const userProfileApi = domainList.github.userInfoApi.replace('userName', name);

        const [gitHubBasicInfo, githubRepos] = await Promise.all([
            getGithubInfoByName(userProfileApi),
            getRepoList(getRepoListApi),
        ]);
        setUserInfo((prevState) => {
            return {
                ...prevState,
                github: {
                    ...gitHubBasicInfo,
                    topRepos: githubRepos,
                },
            };
        });
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
        if (userInfo.github.avatar_url) return userInfo.github.avatar_url;
        return userInfo.hackerrank.avatar;
    }, [userInfo.github.avatar_url, userInfo.hackerrank.avatar]);

    const userName = React.useMemo(() => {
        return userInfo.hackerrank.name;
    }, [userInfo.hackerrank.name]);

    return (
        <Container maxWidth="lg">

            <Grid container spacing={2} sx={{ paddingTop: '100px' }}>
                <Grid item lg={8} md={12} xs={12} p={2}>
                    {(userInfo.github.topRepos || [])?.length > 0 && (
                        <>
                            <Typography variant='h5' component='div'>
                                Projects
                            </Typography>

                            <Divider sx={{ mb: 5 }} />

                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                {userInfo.github.topRepos?.map((repo, idx) => (
                                    <CardGithub topRepo={repo} key={'repo' + idx} />
                                ))}
                            </div>
                        </>
                    )}

                    {/* {userInfo?.hackerrank.linkedin_url && <LinkedinArea linkedin_url={userInfo?.hackerrank.linkedin_url} />} */}
                    <CodePenArea {...searchVal} />
                    <LeetCodeArea {...searchVal} />
                </Grid>
                <Grid item lg={4} md={12} xs={12} p={10} >
                    <Box
                        sx={{
                            width: 'auto',
                            height: 'auto',
                            borderColor: 'primary.dark',
                        }}
                    >
                        {(userAvatar || userName) && (
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar alt='avatar' src={userAvatar} />
                                </ListItemAvatar>
                                <ListItemText primary='Name' secondary={userName} />
                            </ListItem>
                        )}

                        {userInfo.github?.email && (
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <ImageIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary='Email' secondary={userInfo.github?.email} />
                            </ListItem>
                        )}
                        {userInfo.hackerrank?.country && (
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <ImageIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary='Country'
                                    secondary={userInfo.hackerrank?.country}
                                />
                            </ListItem>
                        )}

                        {userInfo.github?.blog && (
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <ImageIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary='Blog' secondary={userInfo.github?.blog} />
                            </ListItem>
                        )}
                        {userInfo.hackerrank?.github_url && (
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <GitHubIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary='Github'
                                    secondary={userInfo.hackerrank?.github_url}
                                />
                            </ListItem>
                        )}

                        {userInfo.hackerrank?.linkedin_url && (
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <ImageIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary='LinkedIn'
                                    secondary={userInfo.hackerrank?.linkedin_url}
                                />
                            </ListItem>
                        )}

                        {userInfo.hackerrank?.leetcode_url && (
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <ImageIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary='LeetCode'
                                    secondary={userInfo.hackerrank?.leetcode_url}
                                />
                            </ListItem>
                        )}

                        {userInfo.hackerrank?.languages?.length > 0 && (
                            <>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <ImageIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary='Language' />
                                </ListItem>

                                <Collapse in={true} timeout='auto' unmountOnExit>
                                    <Stack spacing={1} alignItems='center'>
                                        <Stack direction='row' spacing={1}>
                                            {userInfo.hackerrank.languages.map((item, idx) => {
                                                return (
                                                    <Chip
                                                        label={item[0]}
                                                        color='primary'
                                                        key={idx}
                                                    />
                                                );
                                            })}
                                        </Stack>
                                    </Stack>
                                </Collapse>
                            </>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default DataArea;
