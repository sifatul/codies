import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user/basicInfo';
import filter from './filter';
import search from './search';
import hackerrank from './platforms/hackerrank';
import github from './platforms/github';
import leetcode from './platforms/leetcode';
import codepen from './platforms/codepen';
import medium from './platforms/medium';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

/**
 * Creates a store and includes all the slices as reducers.
 */
export const store = configureStore({
    reducer: {
        user: userSlice,
        hackerrank,
        github,
        leetcode,
        codepen,
        filter,
        search,
        medium
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: { users: UsersState}
type AppDispatch = typeof store.dispatch;

// Since we use typescript, lets utilize `useDispatch`
export const UseAppDispatch = () => useDispatch<AppDispatch>();
export const UseAppSelector: TypedUseSelectorHook<RootState> = useSelector;
