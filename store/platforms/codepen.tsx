
import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';



export interface codepenUserInfoType {
  pubDate: string;
  link: string;
  title: string;

  // profile links

}

/**
 * Default state object with initial values.
 */
const initialState: { pens: codepenUserInfoType[], username: string } = {
  username: '',
  pens: [] as codepenUserInfoType[]

  // topRepos: [],
} as const;

/**
 * Create a slice as a reducer containing actions.
 *
 * In this example actions are included in the slice. It is fine and can be
 * changed based on your needs.
 */
export const codepenSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    setcodepenUserInfo: (
      state: Draft<typeof initialState>,
      action: PayloadAction<{ pens: codepenUserInfoType[], username: string }>
    ) => action.payload,

  },
});

// A small helper of user state for `useSelector` function.
export const getcodepenUserInfo = (state: { codepen: { pens: codepenUserInfoType[], username: string } }) => {
  const profile_url = "codepen.io/userName".replace("userName", state.codepen?.username)
  return { ...state.codepen, profile_url }
};

// Exports all actions
export const { setcodepenUserInfo } = codepenSlice.actions;

export default codepenSlice.reducer;
