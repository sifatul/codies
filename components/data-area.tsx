import { CircularProgress, Container, Grid } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import LeetCodeArea from '../components/leetcode-area';
import { UseAppDispatch, UseAppSelector } from '../store';
import { getFilterState } from '../store/filter';
import { getGithubUserInfo, setGithubUsername } from '../store/platforms/github';
import {
    getHackerRankUserInfo,
    hackerRankDataType,
    setHackerRankInfo,
} from '../store/platforms/hackerrank';
import { setCountry, setName, setProfilePic } from '../store/user/basicInfo';
import { Filter, SearchByType } from '../types/common.types';
import { PostData } from '../Utils/fetchData';
import CodePenArea from './codepen-area';
import GithubArea from './github-area';
import HackerrankArea from './hackerrank-area';


const DataArea = (props: any) => {
    const { searchVal } = props;
    const filterState = UseAppSelector(getFilterState);

    const renderData = (currentFilter: null | string) => {
        switch (currentFilter) {
            case null:
                return (
                    <>
                        <GithubArea {...searchVal} />
                        <CodePenArea {...searchVal} />
                        <LeetCodeArea {...searchVal} />
                        <HackerrankArea {...searchVal} />
                    </>
                );
            case Filter.LEETCODE:
                return <LeetCodeArea {...searchVal} />;
            case Filter.CODEPEN:
                return <CodePenArea {...searchVal} />;
            case Filter.GITHUB:
                return <GithubArea {...searchVal} />;
            case Filter.HACKERRANK:
                return <HackerrankArea {...searchVal} />;
        }
    };



    return (
        <Container
            maxWidth='md'
            sx={{
                paddingTop: '50px',
            }}
        >

            <Grid container spacing={2}>
                <Grid item lg={10} md={12} xs={12} p={2}>
                    {renderData(filterState.currentFilter)}
                </Grid>
            </Grid>

        </Container>
    );
};

export default DataArea;
