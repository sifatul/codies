import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user/basicInfo';
import experience from './user/experiences';
import filter from './filter';
import search from './search';
import hackerrank from './platforms/hackerrank';
import github from './platforms/github';
import leetcode from './platforms/leetcode';
import codepen from './platforms/codepen';
import medium from './platforms/medium';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';


import {
    Action,
    AnyAction,
    combineReducers,
    ThunkAction,
} from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';


const combinedReducer = combineReducers({
    user: userSlice,
    experience,
    hackerrank,
    github,
    leetcode,
    codepen,
    filter,
    search,
    medium
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
