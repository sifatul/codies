import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user/basicInfo';
import hackerrank from './platforms/hackerrank';
import github from './platforms/github';
import leetcode from './platforms/leetcode';
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';

/**
 * Creates a store and includes all the slices as reducers.
 */
export const store = configureStore({
  reducer: {
    user: userSlice,
    hackerrank: hackerrank,
    github: github,
    leetcode: leetcode
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: { users: UsersState}
type AppDispatch = typeof store.dispatch;

// Since we use typescript, lets utilize `useDispatch`
export const UseAppDispatch = () => useDispatch<AppDispatch>();
export const UseAppSelector: TypedUseSelectorHook<RootState> = useSelector;