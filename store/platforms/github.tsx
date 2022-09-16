
import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { removeSpecialCharacter } from 'js-string-helper';
import { Filter } from '../../types/common.types';
import { GetData } from '../../Utils/fetchData';

export interface githubRepoType {
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
  repos?: githubRepoType[];
  html_url: string;
  name: string;

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
  name: ''

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
      state.name = removeSpecialCharacter(action.payload)
    },

  },
});

export const getGithubUserInfo = (state: { github: GithubUserInfoType }) => state.github;
export const getTopRepos = (state: { github: GithubUserInfoType }) => state.github.repos?.slice(0, 2);
export const getGithubSummary = (state: { github: GithubUserInfoType }) => {
  let maxLanguageCount = { languageName: "", count: 0 }
  state.github.repos?.reduce((accu: any, current: githubRepoType) => {
    const previousCount = accu[current?.language] || 0
    const newCount = previousCount + 1
    if (newCount > maxLanguageCount.count) {
      maxLanguageCount.languageName = current?.language
      maxLanguageCount.count = newCount
    }

    accu[current?.language] = newCount
    return accu
  }, {})
  return { totalProject: (state.github.repos?.length || 0), maxUsedLanguage: maxLanguageCount.languageName }

}

// Exports all actions
export const { setGithubUserInfo, setGithubUsername } = userSlice.actions;

export default userSlice.reducer;
