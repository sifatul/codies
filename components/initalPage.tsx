import * as React from 'react';
import Footer from '../components/common/footer';
import Hint from '../components/common/hint';
import SearchInput from '../components/common/search.input';
import styles from '../styles/Home.module.css';

const InitialPage = (searchInputHandler: any) => {


  return (
    <>

      <div className={styles.container}>

        <main className={styles.main}>
          <div className={styles.seachContainer}>
            <SearchInput
              callback={searchInputHandler}
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
