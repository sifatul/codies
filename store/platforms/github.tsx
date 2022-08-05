
import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

export interface githubTopRepoType {
  language: string;
  url: string;
  html_url: string;
  description: string;
  homepage: string;
  stargazers_count: number;
  visibility: 'public';
  updated_at: string;
}

export interface GithubUserInfoType {
  blog: string;
  email: string;
  avatar_url: string;
  topRepos?: githubTopRepoType[];
  html_url: string;
  username: string;

  // profile links

}

/**
 * Default state object with initial values.
 */
const initialState: GithubUserInfoType = {
  blog: '',
  email: '',
  avatar_url: '',
  html_url: '',
  username: ''

  // topRepos: [],
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

    setGithubUserInfo: (
      state: Draft<typeof initialState>,
      action: PayloadAction<GithubUserInfoType>
    ) => action.payload,
    setGithubUsername: (
      state: Draft<typeof initialState>,
      action: PayloadAction<string>
    ) => {
      state.username = action.payload
    },

  },
});

// A small helper of user state for `useSelector` function.
export const getGithubUserInfo = (state: { github: GithubUserInfoType }) => state.github;

// Exports all actions
export const { setGithubUserInfo, setGithubUsername } = userSlice.actions;

export default userSlice.reducer;
