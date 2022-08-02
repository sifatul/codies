
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
  github_url: string;
  topRepos?: githubTopRepoType[];
  // profile links

}

/**
 * Default state object with initial values.
 */
const initialState: GithubUserInfoType = {
  blog: '',
  email: '',
  avatar_url: '',
  github_url: ''
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
    ) => {
      console.log("setGithub", action.payload)
      state.blog = action.payload.blog,
        state.email = action.payload.email,
        state.github_url = action.payload.github_url,
        state.avatar_url = action.payload.avatar_url
      if (action.payload.topRepos) {
        state.topRepos = action.payload.topRepos
      }

    },
    setGithubProfileUrl: (
      state: Draft<typeof initialState>,
      action: PayloadAction<string>
    ) => {
      console.log("setGithub", action.payload)
      state.github_url = action.payload

    },
  },
});

// A small helper of user state for `useSelector` function.
export const getGithubUserInfo = (state: { github: GithubUserInfoType }) => state.github;

// Exports all actions
export const { setGithubUserInfo } = userSlice.actions;

export default userSlice.reducer;
