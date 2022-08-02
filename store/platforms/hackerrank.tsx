
import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

export interface hackerRankDataType {
  linkedin_url: string;
  github_url: string;
  leetcode_url: string;
  country: string;
  languages?: string[];
  avatar: string;
  username: string;
}



/**
 * Default state object with initial values.
 */
const initialState: hackerRankDataType = {
  linkedin_url: '',
  github_url: '',
  leetcode_url: '',
  country: '',
  avatar: '',
  username: '',
} as const;

/**
 * Create a slice as a reducer containing actions.
 *
 * In this example actions are included in the slice. It is fine and can be
 * changed based on your needs.
 */
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    setHackerRankInfo: (
      state: Draft<typeof initialState>,
      action: PayloadAction<hackerRankDataType>
    ) => {
      console.log("setHackerRankInfo, payload ", action.payload)
      state.username = action.payload.username;
      state.avatar = action.payload.avatar;
      state.country = action.payload.country;
      state.leetcode_url = action.payload.leetcode_url;
      state.linkedin_url = action.payload.linkedin_url;
    },
  },
});

// A small helper of user state for `useSelector` function.
export const getHackerRankUserInfo = (state: any) => {
  console.log("getHackerRankUserInfo", state)
  return state.hackerrank
}

// Exports all actions
export const { setHackerRankInfo } = userSlice.actions;

export default userSlice.reducer;
