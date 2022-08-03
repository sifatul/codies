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
import { getUserState } from '../../store/user/basicInfo';

const codingPlatforms = [
  {
    name: 'HackerRank',
    icon: '/icons/hackerrank.png',
    secondary: '--'
  },
  {
    name: 'Leetcode',
    icon: '/icons/leetcode.png',
    secondary: '--'
  },
  {
    name: 'Codepen',
    icon: '/icons/codepen.svg',
    secondary: '--'
  }
]

const otherPlatforms = [
  {
    name: 'Github',
    icon: '/icons/github.svg',
    secondary: '--'
  },
  {
    name: 'Linkedin',
    icon: '/icons/linkedin.svg',
    secondary: '--'
  },

]

const ShowFromList = ({ codingPlatforms }: { codingPlatforms: any[] }) => {
  return <> {
    codingPlatforms.map(({ name, icon, secondary }) => (
      <ListItem key={name} disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <img src={icon} alt={name} height={40} width={40} />
          </ListItemIcon>
          <ListItemText primary={name} secondary={secondary} />
        </ListItemButton>
      </ListItem>
    ))
  }
  </>
}

const drawerList = ({ toggleDrawer }: { toggleDrawer: (bol: boolean) => any }) => {

  const UserInfoState = UseAppSelector(getUserState);
  const { blog = '--', html_url = '--' } = UseAppSelector(getGithubUserInfo);
  const { profile_url = '--' } = UseAppSelector(getHackerRankUserInfo);
  const { profilePic = '', name = '--', country = '--', email = '--' } = UserInfoState

  otherPlatforms[0].secondary = html_url.replace('https://', '');
  codingPlatforms[0].secondary = profile_url


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

    <ListItem disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <img src={'/icons/email.png'} alt={'email address'} height={40} width={40} />
        </ListItemIcon>
        <ListItemText primary={'Email'} secondary={email} />
      </ListItemButton>
    </ListItem>

    <ListItem>
      <ListItemIcon>
        <Avatar>
          <LanguageIcon />
        </Avatar>
      </ListItemIcon>
      <ListItemText primary='Blog' secondary={blog} />
    </ListItem>


    <Divider />

    <ShowFromList codingPlatforms={otherPlatforms} />
    <Divider />
    <ShowFromList codingPlatforms={codingPlatforms} />

  </ Box>

};
export default drawerList