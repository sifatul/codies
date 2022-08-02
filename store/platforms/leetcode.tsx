
import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';


export interface LeetcodeUserInfoType {
  blog: string;
  email: string;
  avatar_url: string;
  leetcode_url: string;
  // profile links

}

/**
 * Default state object with initial values.
 */
const initialState: LeetcodeUserInfoType = {
  blog: '',
  email: '',
  avatar_url: '',
  leetcode_url: ''
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

    setleetcodeUserInfo: (
      state: Draft<typeof initialState>,
      action: PayloadAction<LeetcodeUserInfoType>
    ) => {
      console.log("setleetcode", action.payload)
      state.blog = action.payload.blog

    },
    setleetcodeProfileUrl: (
      state: Draft<typeof initialState>,
      action: PayloadAction<string>
    ) => {
      console.log("setleetcode", action.payload)
      state.leetcode_url = action.payload

    },
  },
});

// A small helper of user state for `useSelector` function.
export const getLeetcodeUserInfo = (state: { leetcode: LeetcodeUserInfoType }) => state.leetcode;

// Exports all actions
export const { setleetcodeUserInfo } = userSlice.actions;

export default userSlice.reducer;
