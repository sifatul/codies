import { Container, Grid } from '@mui/material';
import React from 'react';
import LeetCodeArea from '../components/leetcode-area';
import { UseAppSelector } from '../store';
import { getFilterState } from '../store/filter';
import { Filter } from '../types/common.types';
import CodePenArea from './codepen-area';
import GithubArea from './github-area';
import HackerrankArea from './hackerrank-area';
import MediumArea from './medium-area';
import SummaryPage from './Summary';

const DataArea = () => {
    const filterState = UseAppSelector(getFilterState);

    const renderData = (currentFilter: null | string) => {
        switch (currentFilter) {
            case null:
                return <SummaryPage />
            case Filter.LEETCODE:
                return <LeetCodeArea />;
            case Filter.CODEPEN:
                return <CodePenArea />;
            case Filter.GITHUB:
                return <GithubArea />;
            case Filter.HACKERRANK:
                return <HackerrankArea />;
            case Filter.MEDIUM:
                return <MediumArea />;
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
