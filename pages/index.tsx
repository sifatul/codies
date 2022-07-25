import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import ImageIcon from '@mui/icons-material/Image';
import { Chip, Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import type { NextPage } from 'next';
import Head from 'next/head';
import * as React from 'react';
import { useState } from 'react';
import CardGithub from "../components/common/card";
import Hint from "../components/common/hint";
import SearchInput from '../components/common/search.input';
import styles from '../styles/Home.module.css';
import { isValidHttpUrl } from '../Utils/crunchUrls';
import { PostData } from '../Utils/fetchData';
import { getGithubInfoByName, getRepoList, githubDataType } from "../Utils/github";
interface hackerRankDataType {
  linkedin_url: string
  github_url: string
  leetcode_url: string
  country: string
  languages: string[]
  avatar: string
  name: string
}
const initialState = {
  searchVal: '',
  hackerrank: {
    linkedin_url: '', github_url: "", leetcode_url: '', country: '', languages: [], avatar: '', name: ''
  },
  github: {
    blog: "", email: "", avatar_url: "",
    topRepos: [

    ]
  }


}


const domainList: any = {
  "hackerrank": {
    name: "hackerrank",
    userInfoApi: "https://www.hackerrank.com/rest/contests/master/hackers/userName/profile",
  },
  "github": {
    name: "github",
    userInfoApi: "https://api.github.com/users/userName",
    repoListApi: "https://api.github.com/users/userName/repos"
  }
}
const Home: NextPage = () => {

  const [userInfo, setUserInfo] = useState<{
    searchVal: string,
    hackerrank: hackerRankDataType,
    github: githubDataType
  }>(initialState)
  const [linkedinInfo, setLinkedinInfo] = useState({})


  const getHackerRankInfo = React.useCallback(async (nameFromUrl: string) => {
    const getUserProfileApi = domainList.hackerrank.userInfoApi
    const userProfileApi = getUserProfileApi.replace('userName', nameFromUrl)
    const postApiForwardingApi = '/api/hello'
    const data: any = await PostData(postApiForwardingApi, userProfileApi)
    const hackerRankdata: hackerRankDataType = data?.model || {}

    const { linkedin_url = '', country = '', github_url = "", languages = [], avatar = '', leetcode_url = '', name = '' } = hackerRankdata

    setUserInfo(prevState => {
      return {
        ...prevState,
        hackerrank: {
          linkedin_url, country, github_url, languages, avatar, leetcode_url, name
        }
      }
    })

    return hackerRankdata
  }, [])
  const getLinkedinUserInfo = React.useCallback(async (linkedinUserName: string) => {

    const linkinedApi = '/api/linkedin'

    const linkedinInfo: any = await PostData(linkinedApi, linkedinUserName)
    setLinkedinInfo(prevState => {
      return {
        ...prevState,
        ...linkedinInfo
      }
    })
  }, [userInfo.hackerrank.linkedin_url])


  React.useEffect(() => {
    if (!userInfo.hackerrank.linkedin_url) return
    const linkedInUrl = new URL(userInfo.hackerrank.linkedin_url)
    const { pathname } = linkedInUrl
    const linkedinUserName = pathname.split("/").pop()
    if (!linkedinUserName) return

    getLinkedinUserInfo(linkedinUserName)


  }, [userInfo.hackerrank.linkedin_url])


  const getGithubData = React.useCallback(async (name: string) => {

    const getRepoListApi = domainList.github.repoListApi.replace('userName', name)
    const userProfileApi = domainList.github.userInfoApi.replace('userName', name)

    const [gitHubBasicInfo, githubRepos] = await Promise.all([getGithubInfoByName(userProfileApi), getRepoList(getRepoListApi)])
    setUserInfo(prevState => {
      return {
        ...prevState,
        github: {
          ...gitHubBasicInfo,
          topRepos: githubRepos
        }
      }
    })
  }, [])





  const searchInputHandler = async (searchVal: string) => {

    setUserInfo(prevState => {
      return {
        ...prevState,
        searchVal
      }
    })


    const isValidUrl = isValidHttpUrl(searchVal)
    if (!isValidUrl) {

      getGithubData(searchVal)
      getHackerRankInfo(searchVal);
      return

    }

    const myUrl = new URL(searchVal)
    // const parts = ['protocol', 'hostname', 'pathname'];

    const domain = myUrl.hostname
    const pathname = myUrl.pathname
    const nameFromUrl = pathname.split("/").pop()


    if (!nameFromUrl) return

    if ((new RegExp("hackerrank.com")).test(domain)) {
      const { github_url } = await getHackerRankInfo(nameFromUrl)
      const githubUserName = github_url?.split("/").pop() || nameFromUrl
      getGithubData(githubUserName)

    } else if ((new RegExp("github.com")).test(domain)) {
      getHackerRankInfo(nameFromUrl);
      getGithubData(nameFromUrl)
    }

    return
  }
  const userAvatar = React.useMemo(() => {
    if (userInfo.github.avatar_url) return userInfo.github.avatar_url
    return userInfo.hackerrank.avatar

  }, [userInfo.github.avatar_url, userInfo.hackerrank.avatar])

  const userName = React.useMemo(() => {
    return userInfo.hackerrank.name

  }, [userInfo.hackerrank.name])
  return (
    <div className={styles.container}>
      <Head>
        <title>Find Profile</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.seachContainer}>
          <SearchInput callback={searchInputHandler} />

        </div>

        {!userInfo.searchVal && <Hint />}

        <Grid container spacing={2} sx={{ paddingTop: '100px' }}>

          <Grid item xs={6} p={10} >
            <Box
              sx={{
                width: 'auto',
                height: 'auto',
                borderColor: 'primary.dark'
              }}
            >
              {(userAvatar || userName) && <ListItem>
                <ListItemAvatar>
                  <Avatar alt="avatar" src={userAvatar} />
                </ListItemAvatar>
                <ListItemText primary="Name" secondary={userName} />
              </ListItem>}

              {userInfo.github?.email && <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Email" secondary={userInfo.github?.email} />
              </ListItem>}
              {userInfo.hackerrank?.country && <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Country" secondary={userInfo.hackerrank?.country} />
              </ListItem>}

              {userInfo.github?.blog && <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Blog" secondary={userInfo.github?.blog} />
              </ListItem>}
              {userInfo.hackerrank?.github_url && <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <GitHubIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Github" secondary={userInfo.hackerrank?.github_url} />
              </ListItem>}

              {userInfo.hackerrank?.linkedin_url && <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="LinkedIn" secondary={userInfo.hackerrank?.linkedin_url} />
              </ListItem>
              }

              {userInfo.hackerrank?.leetcode_url && <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="LeetCode" secondary={userInfo.hackerrank?.leetcode_url} />
              </ListItem>}


              {userInfo.hackerrank?.languages?.length > 0 && <>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Language" />
                </ListItem>

                <Collapse in={true} timeout="auto" unmountOnExit >
                  <Stack spacing={1} alignItems="center">
                    <Stack direction="row" spacing={1}>
                      {userInfo.hackerrank.languages.map((item, idx) => {
                        return <Chip label={item[0]} color="primary" key={idx} />
                      })}
                    </Stack>

                  </Stack>
                </Collapse>

              </>}

            </Box>

          </Grid>

          <Grid item xs={3}>
            {(userInfo.github.topRepos || [])?.length > 0 && userInfo.github.topRepos?.map((repo, idx) => <CardGithub topRepo={repo} key={'repo' + idx} />)}
          </Grid>

        </Grid>


      </main>


      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made with
          <span className={styles.logo}>
            <FavoriteRoundedIcon style={{ color: 'red' }} />
          </span>
        </a>
      </footer>
    </div >
  )
}

export default Home



