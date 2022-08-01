import type { NextPage } from 'next';
import Head from 'next/head';
import * as React from 'react';
import { useState } from 'react';
import Footer from '../components/common/footer';
import Hint from '../components/common/hint';
import SearchInput from '../components/common/search.input';
import DataArea from '../components/data-area';
import MiniDrawer from '../components/mini-variant-drawer';
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

  console.log('searchVal');

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
        {searchVal.searchBy === SearchByType.NONE && <div className={styles.seachContainer}>
          <SearchInput callback={searchInputHandler} />
        </div>}
        {searchVal.searchBy === SearchByType.NONE && <Hint />}
        {searchVal.searchBy !== SearchByType.NONE && <MiniDrawer

          searchInputHandler={searchInputHandler} searchVal={searchVal}>

        </MiniDrawer>}
      </main>


      <Footer />
    </div>
  );
};

export default Home;
