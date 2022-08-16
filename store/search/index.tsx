import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { SearchByType } from '../../types/common.types';

export interface userInfoType {
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

export interface SearchStateType {
    protocol: string
    hostname: string
    pathname: string
    originalSearchVal: string
    searchBy: SearchByType
    userFound: userInfoType
}

const initialState: SearchStateType = {
    protocol: '',
    hostname: '',
    pathname: '',
    originalSearchVal: '',
    searchBy: SearchByType.NONE,
    userFound: {

        "email": '',
        "first_name": '',
        "last_name": '',
        "github_url": '',
        "leetcode_url": '',
        "hackerrank_url": '',
        "codepen_url": '',
        "medium_url": '',
        "avatar": '',
    }
} as const;

export const SearchSlice = createSlice({
    name: 'Search',
    initialState,
    reducers: {
        setSearchTypeEmail: (
            state: Draft<SearchStateType>,
            action: PayloadAction<{ userFound: userInfoType, originalSearchVal: string }>
        ) => {
            state.searchBy = SearchByType.EMAIL;
            state.userFound = action.payload.userFound;
            state.originalSearchVal = action.payload.originalSearchVal;
        },
        setSearchTypeUrl: (
            state: Draft<SearchStateType>,
            action: PayloadAction<{
                protocol: string
                hostname: string
                pathname: string
                originalSearchVal: string
            }>
        ) => {
            state.searchBy = SearchByType.URL;
            state.protocol = action.payload.protocol;
            state.hostname = action.payload.hostname;
            state.pathname = action.payload.pathname;
            state.originalSearchVal = action.payload.originalSearchVal;
        },
        setSearchTypeName: (
            state: Draft<SearchStateType>,
            action: PayloadAction<string>
        ) => {
            state.searchBy = SearchByType.NAME;
            state.originalSearchVal = action.payload;
        },
        resetSearchType: (

        ) => {
            initialState
        },
    },
});

export const getSearchState = (state: { search: SearchStateType }) => state.search;

export const { setSearchTypeEmail, setSearchTypeName, setSearchTypeUrl, resetSearchType } = SearchSlice.actions;

export default SearchSlice.reducer;
