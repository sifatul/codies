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


const DataArea = () => {
    const filterState = UseAppSelector(getFilterState);

    const renderData = (currentFilter: null | string) => {
        switch (currentFilter) {
            case null:
                return (
                    <>
                        <GithubArea />
                        <CodePenArea />
                        <LeetCodeArea />
                        <HackerrankArea />
                    </>
                );
            case Filter.LEETCODE:
                return <LeetCodeArea />;
            case Filter.CODEPEN:
                return <CodePenArea />;
            case Filter.GITHUB:
                return <GithubArea />;
            case Filter.HACKERRANK:
                return <HackerrankArea />;
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
