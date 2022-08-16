
import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

export interface hackerRankDataType {
  username: string;
  name: string;
  linkedin_url: string;
  github_url: string;
  leetcode_url: string;
  country: string;
  languages?: string[];
  avatar: string;
  school?: string;
  created_at: string;
  level: number;
  website: string;
  short_bio: string;
  personal_first_name: string;
  personal_last_name: string;
  company: string;
  local_language: string;
  job_title: string;
  jobs_headline: string;
  followers_count: 0;
  submissionHistory: { [key: string]: string }

}



/**
 * Default state object with initial values.
 */
const initialState: hackerRankDataType = {
  username: '',
  name: '',
  linkedin_url: '',
  github_url: '',
  leetcode_url: '',
  country: '',
  avatar: '',
  created_at: '',
  level: 0,
  website: '',
  personal_first_name: " ",
  personal_last_name: "",
  company: "",
  local_language: " ",
  job_title: "",
  jobs_headline: "",
  followers_count: 0,
  short_bio: "",
  submissionHistory: {}
} as const;

/**
 * Create a slice as a reducer containing actions.
 *
 * In this example actions are included in the slice. It is fine and can be
 * changed based on your needs.
 */
export const hackerRankUser = createSlice({
  name: 'user',
  initialState,
  reducers: {

    setHackerRankInfo: (
      state: Draft<typeof initialState>,
      action: PayloadAction<hackerRankDataType>
    ) => action.payload,
    setHackerRankSubmissionHistory: (
      state: Draft<typeof initialState>,
      action: PayloadAction<{ [key: string]: string }>
    ) => {
      state.submissionHistory = action.payload
    },
  },
});

// A small helper of user state for `useSelector` function.
export const getHackerRankUserInfo = (state: any) => {

  const profile_url = "hackerrank.com/userName".replace('userName', state.hackerrank?.username)
  return { ...state.hackerrank, profile_url }
}
export const getHackerRankTotalProblemSolved = (state: any) => {
  const TotalCount = Object.keys(state.hackerrank?.submissionHistory || {}).length
  return TotalCount
}

// Exports all actions
export const { setHackerRankInfo, setHackerRankSubmissionHistory } = hackerRankUser.actions;

export default hackerRankUser.reducer;
