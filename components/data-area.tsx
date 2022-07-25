import GitHubIcon from '@mui/icons-material/GitHub';
import ImageIcon from '@mui/icons-material/Image';
import { Avatar, Chip, Divider, Grid, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import React from "react";
import CardGithub from "./common/card"
import LinkedinArea from './linkedin-area';

const DataArea = (props) => {
  const { userInfo } = props

  const userAvatar = React.useMemo(() => {
    if (userInfo.github.avatar_url) return userInfo.github.avatar_url
    return userInfo.hackerrank.avatar

  }, [userInfo.github.avatar_url, userInfo.hackerrank.avatar])

  const userName = React.useMemo(() => {
    return userInfo.hackerrank.name

  }, [userInfo.hackerrank.name])

  return <>

    <Grid container spacing={2} sx={{ paddingTop: '100px' }}>
      <Grid item xs={8} p={2}>

        {(userInfo.github.topRepos || [])?.length > 0 && <>
          <Typography variant="h5" component="div">
            Projects
    </Typography>

          <Divider sx={{ mb: 5 }} />

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>

            {userInfo.github.topRepos?.map((repo, idx) => <CardGithub topRepo={repo} key={'repo' + idx} />)}
          </div>
        </>}

        <LinkedinArea linkedin_url={userInfo?.hackerrank.linkedin_url} />
      </Grid>
      <Grid item xs={4} p={10} >
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

    </Grid>
  </>
}

export default DataArea