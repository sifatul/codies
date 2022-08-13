import { isEmail } from 'js-string-helper';
import type { NextPage } from 'next';
import * as React from 'react';
import { useState } from 'react';
import Footer from '../components/common/footer';
import Hint from '../components/common/hint';
import SearchInput from '../components/common/search.input';
import styles from '../styles/Home.module.css';
import { SearchByType } from '../types/common.types';
import { PostData } from '../Utils/fetchData';

const InitialPage = (props) => {
  const { searchInputHandler, searchVal, setSearchVal } = props


  return (
    <>

      <div className={styles.container}>

        <main className={styles.main}>
          <div className={styles.seachContainer}>
            <SearchInput
              callback={searchInputHandler}
              value={searchVal.originalSearchVal}
            />
          </div>

          <Hint />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default InitialPage;
