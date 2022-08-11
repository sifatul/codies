// import LanguageIcon from '@mui/icons-material/Language';
import { Avatar, Box, ListItem, ListItemAvatar } from '@mui/material';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React, { useState } from 'react';
import { UseAppDispatch, UseAppSelector } from '../../store';
// import { getGithubUserInfo } from '../../store/platforms/github';
// import { getHackerRankUserInfo } from '../../store/platforms/hackerrank';
// import { getLeetcodeUserInfo } from '../../store/platforms/leetcode';
// import { getcodepenUserInfo } from '../../store/platforms/codepen';

// import { getUserState } from '../../store/user/basicInfo';
import { setFilter } from '../../store/filter';

const codingPlatforms = {
    hackerrank: {
        name: 'HackerRank',
        icon: '/icons/hackerrank.png',
        secondary: '',
    },
    leetcode: {
        name: 'Leetcode',
        icon: '/icons/leetcode.png',
        secondary: '',
    },
    codepen: {
        name: 'Codepen',
        icon: '/icons/codepen.svg',
        secondary: '',
    },
};

const otherPlatforms = {
    github: {
        name: 'Github',
        icon: '/icons/github.svg',
        secondary: '',
    },
    linkedin: {
        name: 'Linkedin',
        icon: '/icons/linkedin.svg',
        secondary: '',
    },
};

const ShowFromList = ({ platformsList, onClick }: { platformsList: any; onClick: Function }) => {
    const platforms = Object.keys(platformsList);
    const dispatch = UseAppDispatch();
    return (
        <>
            {platforms.map((platformName) => {
                const { icon, secondary, name } = platformsList[platformName];
                return (
                    <ListItem
                        key={name}
                        disablePadding
                        onClick={() => {
                            dispatch(setFilter(name.toUpperCase()));
                            onClick(name.toUpperCase());
                        }}
                    >
                        <ListItemButton>
                            <ListItemIcon>
                                <img src={icon} alt={name} height={40} width={40} />
                            </ListItemIcon>
                            <ListItemText primary={name} secondary={secondary} />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </>
    );
};

const DrawerList = ({ toggleDrawer }: { toggleDrawer: (bol: boolean) => any }) => {
    const [activeDrawerItem, setActiveDrawerItem] = useState('CODEPEN');
    // const UserInfoState = UseAppSelector(getUserState);
    // const { profile_url: leetcode_profile_url } = UseAppSelector(getLeetcodeUserInfo);
    // const { blog = '--', html_url = '--' } = UseAppSelector(getGithubUserInfo);
    // const { profile_url = '--', linkedin_url = '' } = UseAppSelector(getHackerRankUserInfo);
    // const { profile_url: codepen_profile_url = '--' } = UseAppSelector(getcodepenUserInfo);
    // const { profilePic = '', name = '--', country = '--', email = '--' } = UserInfoState;
    const dispatch = UseAppDispatch();

    return (
        <Box
            sx={{ width: 250 }}
            role='presentation'
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            {/* <ListItem>
                <ListItemAvatar>
                    <Avatar alt='avatar' src={profilePic} />
                </ListItemAvatar>
                <ListItemText primary={name} secondary={country} />
            </ListItem> */}

            {/* <ShowFromList
                platformsList={{
                    Email: {
                        name: 'Email',
                        icon: '/icons/email.png',
                        secondary: email,
                    },
                }}
            /> */}

            {/* <ListItem>
                <ListItemIcon>
                    <Avatar>
                        <LanguageIcon />
                    </Avatar>
                </ListItemIcon>
                <ListItemText primary='Blog' secondary={blog} />
            </ListItem> */}
            <ListItem
                disablePadding
                onClick={() => {
                    dispatch(setFilter(null));
                    setActiveDrawerItem('ALL');
                }}
            >
                <ListItemButton>
                    <ListItemText primary={'All'} />
                </ListItemButton>
            </ListItem>
            <Divider />
            <ShowFromList platformsList={otherPlatforms} onClick={setActiveDrawerItem} />
            <Divider />
            <ShowFromList platformsList={codingPlatforms} onClick={setActiveDrawerItem} />
        </Box>
    );
};
export default DrawerList;
