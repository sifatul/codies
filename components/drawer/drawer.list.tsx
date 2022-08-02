import { Avatar, Box, ListItem, ListItemAvatar } from "@mui/material";
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React from "react";
import { useAppSelector } from "../../store";
import { getUserState, setName } from '../../store/user/basicInfo';

type Anchor = 'left';
const codingPlatforms = [
  {
    name: 'HackerRank',
    icon: '/icons/hackerrank.png'
  },
  {
    name: 'Leetcode',
    icon: '/icons/leetcode.png'
  },
  {
    name: 'Codepen',
    icon: '/icons/codepen.svg'
  }
]

const otherPlatforms = [
  {
    name: 'Github',
    icon: '/icons/github.svg'
  },
  {
    name: 'Linkedin',
    icon: '/icons/linkedin.svg'
  },

]

const ShowFromList = ({ codingPlatforms }: { codingPlatforms: any[] }) => {
  return <> {
    codingPlatforms.map(({ name, icon }, index) => (
      <ListItem key={name} disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <img src={icon} alt={name} height={40} width={40} />
          </ListItemIcon>
          <ListItemText primary={name} />
        </ListItemButton>
      </ListItem>
    ))
  }
  </>
}

const drawerList = ({ toggleDrawer }: { toggleDrawer: (bol: boolean) => any }) => {

  const UserInfoState = useAppSelector(getUserState);
  const { profilePic = '', name = '', country = '' } = UserInfoState

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
    <Divider />

    <ShowFromList codingPlatforms={otherPlatforms} />
    <Divider />
    <ShowFromList codingPlatforms={codingPlatforms} />
  </ Box>

};
export default drawerList