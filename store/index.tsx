import {
    Action,

    combineReducers, configureStore, ThunkAction
} from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import filter from './filter';
import codepen from './platforms/codepen';
import github from './platforms/github';
import hackerrank from './platforms/hackerrank';
import leetcode from './platforms/leetcode';
import medium from './platforms/medium';
import search from './search';
import userSlice from './user/basicInfo';
import experiences from './user/experience';

const combinedReducer = combineReducers({
    user: userSlice,
    experiences,
    hackerrank,
    github,
    leetcode,
    codepen,
    filter,
    search,
    medium,

});

const reducer: typeof combinedReducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        };
        return nextState;
    } else {
        return combinedReducer(state, action);
    }
};

export const makeStore = () =>
    configureStore({
        reducer
    });

type Store = ReturnType<typeof makeStore>;

export type AppDispatch = Store['dispatch'];
export type RootState = ReturnType<Store['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export const wrapper = createWrapper(makeStore, { debug: true });

export const UseAppDispatch = () => useDispatch<AppDispatch>();
export const UseAppSelector: TypedUseSelectorHook<RootState> = useSelector;
