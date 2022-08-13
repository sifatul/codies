import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import * as React from 'react';
import { useState } from 'react';
import Footer from '../components/common/footer';
import Hint from '../components/common/hint';
import SearchInput from '../components/common/search.input';
import DataArea from '../components/data-area';
import LeftSideDrawer from '../components/drawer/index';
import styles from '../styles/Home.module.css';
import { SearchByType } from '../types/common.types';
import { getDomain, hasValidUrlProtocol, isEmail } from 'js-string-helper'
import { PostData } from '../Utils/fetchData';
import PrimarySearchAppBar from '../components/wordWrapper';
import InitialPage from "../components/initalPage"
import MiniDrawer from '../components/drawer';
interface userInfoType {
    "email": string,
    "first_name": string,
    "last_name": string,
    "github_url": string,
    "leetcode_url": string,
    "hackerrank_url": string,
    "codepen_url": string,
    "medium_url": string,
    "avatar": string,
}

const Home: NextPage = () => {
    const [searchVal, setSearchVal] = useState<{
        protocol: string
        hostname: string
        pathname: string
        originalSearchVal: string
        searchBy: SearchByType
        userFound: {} | userInfoType
    }>({
        protocol: '',
        hostname: '',
        pathname: '',
        originalSearchVal: '',
        searchBy: SearchByType.NONE,
        userFound: {}
    });

    const [state, setState] = React.useState(false);




    const searchInputHandler = async (searchVal: string) => {
        if (!searchVal) return;

        if (isEmail(searchVal)) {
            const userInfo = await PostData('api/getUserNyEmail', searchVal)
            if (userInfo) {
                setSearchVal((prevState) => {
                    return {
                        ...prevState,
                        searchBy: SearchByType.EMAIL,
                        userFound: userInfo,
                    };
                });
                return
            }
        }
        // if search val was not an email || userinfo not found
        try {
            let { protocol, hostname, pathname } = new URL(searchVal);

            //remove trailing slash
            if (pathname.substr(-1) === '/') pathname = pathname.slice(0, -1);

            setSearchVal({
                protocol,
                hostname,
                pathname,
                originalSearchVal: searchVal,
                searchBy: SearchByType.URL,
                userFound: {}
            });
        } catch (e) {
            console.error(e);
            setSearchVal((prevState) => {
                return {
                    ...prevState,
                    searchBy: SearchByType.NAME,
                    originalSearchVal: searchVal,
                };
            });
        }
    };

    return (
        <>

            {searchVal.searchBy === SearchByType.NONE && <InitialPage
                searchInputHandler={searchInputHandler}
                searchVal={searchVal}
                setSearchVal={setSearchVal}

            />}

            {searchVal.searchBy !== SearchByType.NONE && <MiniDrawer searchVal={searchVal} />}
        </>
    );
};

export default Home;
