import { Container, Grid } from '@mui/material';
import React from 'react';
import LeetCodeArea from '../components/leetcode-area';
import { UseAppSelector } from '../store';
import { getFilterState } from '../store/filter';
import { Filter } from '../types/common.types';
import BasicInfo from './basicInfo';
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
                        <BasicInfo />
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
