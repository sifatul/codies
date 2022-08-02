import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import * as React from 'react';
import { useState } from 'react';
import Footer from '../components/common/footer';
import Hint from '../components/common/hint';
import SearchInput from '../components/common/search.input';
import LeftSideDrawer from '../components/drawer/index';
import { useAppDispatch, useAppSelector } from '../store';
import { getUserState } from '../store/user/basicInfo';
import styles from '../styles/Home.module.css';
import { SearchByType } from '../types/common.types';

const Home: NextPage = () => {
  const [searchVal, setSearchVal] = useState({
    protocol: '',
    hostname: '',
    pathname: '',
    originalSearchVal: '',
    searchBy: SearchByType.NONE,
  });

  const dispatch = useAppDispatch();
  const { name, email } = useAppSelector(getUserState);
  console.log(name)

  const [state, setState] = React.useState(false);

  const toggleDrawer =
    (open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setState(open);
      };

  const searchInputHandler = async (searchVal: string) => {
    if (!searchVal) return;
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
    <div className={styles.container}>
      <Head>
        <title>Find Profile</title>
        <meta name='description' content='Find any developer details with their name or profile link' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        {<div className={styles.seachContainer}>
          {(searchVal.searchBy !== SearchByType.NONE) && <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(!state)}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>}
          <SearchInput callback={searchInputHandler} value={searchVal.originalSearchVal} />
        </div>}
        {searchVal.searchBy === SearchByType.NONE && <Hint />}
        {(searchVal.searchBy !== SearchByType.NONE) && <LeftSideDrawer
          state={state}
          toggleDrawer={toggleDrawer}
          searchInputHandler={searchInputHandler}
          searchVal={searchVal}>

        </LeftSideDrawer>}
      </main>


      <Footer />
    </div>
  );
};

export default Home;
