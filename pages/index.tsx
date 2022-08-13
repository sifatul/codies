import type { NextPage } from 'next';
import * as React from 'react';
import MiniDrawer from '../components/drawer';
import InitialPage from "../components/initalPage";
import { UseAppSelector } from '../store';
import { getSearchState } from '../store/search';
import { SearchByType } from '../types/common.types';
const Home: NextPage = () => {
    const SearchState = UseAppSelector(getSearchState);
    console.log(SearchState)

    return (
        <>

            {SearchState.searchBy === SearchByType.NONE && <InitialPage />}

            {SearchState.searchBy !== SearchByType.NONE && <MiniDrawer />}
        </>
    );
};

export default Home;
