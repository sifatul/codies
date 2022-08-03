
import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
interface LanguageProblemCountType {
  languageName: string,
  problemsSolved: number
}
interface TagProblemItemType {
  tagName: string,
  tagSlug: number
  problemsSolved: number
}
export interface LeetcodeUserProfileType {
  userAvatar: string | null;
  realName: string | null;
  aboutMe: string | null;
  school: string | null;
  countryName: string | null;
  company: string | null;
  jobTitle: string | null;
  postViewCount: number;
  reputation: number;
  solutionCount: number;
  websites?: string[]

}

export interface LeetcodeUserInfoType {
  githubUrl: string | null;
  twitterUrl: string | null;
  linkedinUrl: string | null;
  username: string | null;
  profile: LeetcodeUserProfileType;
  languageProblemCount?: LanguageProblemCountType[];
  tagProblemCounts?: {
    advanced: TagProblemItemType[],
    medium: TagProblemItemType[],
    fundamental: TagProblemItemType[],
  }
}

/**
 * Default state object with initial values.
 */
const initialState: LeetcodeUserInfoType = {
  githubUrl: null,
  twitterUrl: null,
  linkedinUrl: null,
  username: "",
  profile: {
    userAvatar: "",
    realName: "",
    aboutMe: "",
    school: null,
    countryName: null,
    company: null,
    jobTitle: null,
    postViewCount: 0,
    reputation: 0,
    solutionCount: 0,

  },
  languageProblemCount: [],
  tagProblemCounts: {
    advanced: [],
    medium: [],
    fundamental: [],
  }

} as const;

/**
 * Create a slice as a reducer containing actions.
 *
 * In this example actions are included in the slice. It is fine and can be
 * changed based on your needs.
 */
export const leetcodeUser = createSlice({
  name: 'user',
  initialState,
  reducers: {

    setLeetcodeUserInfo: (
      state: Draft<typeof initialState>,
      action: PayloadAction<LeetcodeUserInfoType>
    ) => {
      state.githubUrl = action.payload.githubUrl;
      state.twitterUrl = action.payload.twitterUrl;
      state.linkedinUrl = action.payload.linkedinUrl;
      state.profile = action.payload.profile;
      state.username = action.payload.username;
    },
    setLeetcodeLanguageProblemCount: (
      state: Draft<typeof initialState>,
      action: PayloadAction<LanguageProblemCountType[]>
    ) => {
      state.languageProblemCount = action.payload;
    },
    setLeetcodeTagProblemCounts: (
      state: Draft<typeof initialState>,
      action: PayloadAction<{
        advanced: TagProblemItemType[],
        medium: TagProblemItemType[],
        fundamental: TagProblemItemType[],

      }>
    ) => {
      state.tagProblemCounts = action.payload;
    }
  },
});

// A small helper of user state for `useSelector` function.
export const getLeetcodeUserInfo = (state: { leetcode: LeetcodeUserInfoType }) => state.leetcode;

// Exports all actions
export const { setLeetcodeUserInfo, setLeetcodeLanguageProblemCount, setLeetcodeTagProblemCounts } = leetcodeUser.actions;

export default leetcodeUser.reducer;
