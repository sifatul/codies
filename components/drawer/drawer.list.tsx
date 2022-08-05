import LanguageIcon from '@mui/icons-material/Language';
import { Avatar, Box, ListItem, ListItemAvatar } from "@mui/material";
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React from "react";
import { UseAppSelector } from "../../store";
import { getGithubUserInfo } from '../../store/platforms/github';
import { getHackerRankUserInfo } from '../../store/platforms/hackerrank';
import { getLeetcodeUserInfo } from '../../store/platforms/leetcode';
import { getcodepenUserInfo } from '../../store/platforms/codepen';

import { getUserState } from '../../store/user/basicInfo';

const codingPlatforms = {
  hackerrank: {
    name: 'HackerRank',
    icon: '/icons/hackerrank.png',
    secondary: '--'
  },
  leetcode: {
    name: 'Leetcode',
    icon: '/icons/leetcode.png',
    secondary: '--'
  },
  codepen: {
    name: 'Codepen',
    icon: '/icons/codepen.svg',
    secondary: '--'
  }
}

const otherPlatforms = {
  github: {
    name: 'Github',
    icon: '/icons/github.svg',
    secondary: '--'
  },
  linkedin: {
    name: 'Linkedin',
    icon: '/icons/linkedin.svg',
    secondary: '--'
  },

}

const ShowFromList = ({ platformsList }: { platformsList: any }) => {
  const platforms = Object.keys(platformsList)
  return <> {
    platforms.map((name) => {
      const { icon, secondary } = platformsList[name]
      return (
        <ListItem key={name} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <img src={icon} alt={name} height={40} width={40} />
            </ListItemIcon>
            <ListItemText primary={name} secondary={secondary} />
          </ListItemButton>
        </ListItem>
      )
    })
  }
  </>
}

const drawerList = ({ toggleDrawer }: { toggleDrawer: (bol: boolean) => any }) => {

  const UserInfoState = UseAppSelector(getUserState);
  const { profile_url: leetcode_profile_url } = UseAppSelector(getLeetcodeUserInfo);
  const { blog = '--', html_url = '--' } = UseAppSelector(getGithubUserInfo);
  const { profile_url = '--', linkedin_url = "" } = UseAppSelector(getHackerRankUserInfo);
  const { profile_url: codepen_profile_url = '--' } = UseAppSelector(getcodepenUserInfo);
  const { profilePic = '', name = '--', country = '--', email = '--' } = UserInfoState
  if (linkedin_url) {
    const { hostname: linkedinHost, pathname: linkedinPath } = new URL(linkedin_url);
    otherPlatforms.linkedin.secondary = linkedinHost + linkedinPath;

  }

  otherPlatforms.github.secondary = html_url.replace('https://', '');
  codingPlatforms.hackerrank.secondary = profile_url;
  codingPlatforms.leetcode.secondary = leetcode_profile_url;
  codingPlatforms.codepen.secondary = codepen_profile_url;


  return <Box sx={{ width: 250 }}
    role="presentation"
    onClick={toggleDrawer(false)}
    onKeyDown={toggleDrawer(false)}
  >
    <ListItem>
      <ListItemAvatar>
        <Avatar alt='avatar' src={profilePic} />
      </ListItemAvatar>
      <ListItemText primary={name} secondary={country} />
    </ListItem>


    <ShowFromList platformsList={{
      Email: {
        name: 'Email',
        icon: '/icons/email.png',
        secondary: email
      },
    }} />

    <ListItem>
      <ListItemIcon>
        <Avatar>
          <LanguageIcon />
        </Avatar>
      </ListItemIcon>
      <ListItemText primary='Blog' secondary={blog} />
    </ListItem>


    <Divider />

    <ShowFromList platformsList={otherPlatforms} />
    <Divider />
    <ShowFromList platformsList={codingPlatforms} />

  </ Box>

};
export default drawerList