import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
    _id?: string;
    email: string;
    fullName?: string;
    userName: string;

    country: string;
    gender: string;
    dob: string;
    profilePic: string;
    mobile: string;
    // profile links
    linkedin_url?: string;
    github_url?: string;
    leetcode_url?: string;
    hackerrank_url?: string;
    codepen_url?: string;
    medium_url?: string;
}

/**
 * Default state object with initial values.
 */
const initialState: UserState = {
    _id: '',
    userName: '',
    fullName: 'unknown',
    email: '',
    country: '',
    gender: '',
    dob: '',
    profilePic: '',
    mobile: '',

    linkedin_url: '',
    github_url: '',
    leetcode_url: '',
    hackerrank_url: '',
    codepen_url: '',
    medium_url: '',
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
        setName: (
            state: Draft<typeof initialState>,
            action: PayloadAction<typeof initialState.userName>
        ) => {
            state.userName = action.payload;
        },
        setEmail: (
            state: Draft<typeof initialState>,
            action: PayloadAction<typeof initialState.email>
        ) => {
            state.email = action.payload;
        },
        setProfilePic: (
            state: Draft<typeof initialState>,
            action: PayloadAction<typeof initialState.email>
        ) => {
            state.profilePic = action.payload;
        },
        setCountry: (
            state: Draft<typeof initialState>,
            action: PayloadAction<typeof initialState.email>
        ) => {
            state.country = action.payload;
        },
        setMobile: (
            state: Draft<typeof initialState>,
            action: PayloadAction<typeof initialState.mobile>
        ) => {
            state.mobile = action.payload;
        },
        setUserInfo: (state: Draft<typeof initialState>, action: PayloadAction<UserState>) => {
            console.log("action.payload: ", action.payload)
            const { _id = '', userName = '', github_url = '', hackerrank_url = '', leetcode_url = '', linkedin_url = '', profilePic = '', fullName = '' } = action.payload
            state._id = _id;
            state.userName = userName;
            state.github_url = github_url;
            state.hackerrank_url = hackerrank_url;
            state.leetcode_url = leetcode_url;
            state.linkedin_url = linkedin_url;
            state.profilePic = profilePic;
            state.fullName = fullName;
        },
        setProfileLinks: (state: Draft<typeof initialState>, action: PayloadAction<UserState>) => {
            console.log("action.payload: ", action.payload)
            const { github_url, hackerrank_url, leetcode_url, linkedin_url } = action.payload
            if (github_url) state.github_url = github_url;
            if (hackerrank_url) state.hackerrank_url = hackerrank_url;
            if (leetcode_url) state.leetcode_url = leetcode_url;
            if (linkedin_url) state.linkedin_url = linkedin_url;
        },
    },
});

// A small helper of user state for `useSelector` function.
export const getUserState = (state: { user: UserState }) => state.user;

// Exports all actions
export const { setName, setEmail, setUserInfo, setProfilePic, setCountry, setProfileLinks } = userSlice.actions;

export default userSlice.reducer;
