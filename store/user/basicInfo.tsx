import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
    _id: string;
    email: string;
    fullName?: string;
    userName: string;
    country: string;
    city?: string;
    phoneNumber?: string;
    designation?: string;
    profileHeading?: string;
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
const initialState: { userInfo: UserState, _id: string, isLoading: boolean } = {
    userInfo: {
        userName: '',
        fullName: 'unknown',
        email: '',
        city: '',
        phoneNumber: '',
        profileHeading: '',
        designation: '',
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
        _id: ''
    },
    _id: '',
    isLoading: false
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
            action: PayloadAction<typeof initialState.userInfo.userName>
        ) => {
            state.userInfo.userName = action.payload;
        },
        setEmail: (
            state: Draft<typeof initialState>,
            action: PayloadAction<typeof initialState.userInfo.email>
        ) => {
            state.userInfo.email = action.payload;
        },
        setProfilePic: (
            state: Draft<typeof initialState>,
            action: PayloadAction<typeof initialState.userInfo.email>
        ) => {
            state.userInfo.profilePic = action.payload;
        },
        setCountry: (
            state: Draft<typeof initialState>,
            action: PayloadAction<typeof initialState.userInfo.email>
        ) => {
            state.userInfo.country = action.payload;
        },
        setMobile: (
            state: Draft<typeof initialState>,
            action: PayloadAction<typeof initialState.userInfo.mobile>
        ) => {
            state.userInfo.mobile = action.payload;
        },
        setUserInfo: (state: Draft<typeof initialState>, action: PayloadAction<UserState>) => {

            const { userName = '', github_url = '', hackerrank_url = '', leetcode_url = '', linkedin_url = '', profilePic = '', fullName = '' } = action.payload
            if (userName) state.userInfo.userName = userName;
            if (github_url) state.userInfo.github_url = github_url;
            if (hackerrank_url) state.userInfo.hackerrank_url = hackerrank_url;
            if (leetcode_url) state.userInfo.leetcode_url = leetcode_url;
            if (linkedin_url) state.userInfo.linkedin_url = linkedin_url;
            if (profilePic) state.userInfo.profilePic = profilePic;
            if (fullName) state.userInfo.fullName = fullName;
        },
        resetState: (state: Draft<typeof initialState>) => {
            state = initialState
        },
        setLoading: (state: Draft<typeof initialState>, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        setMyInfo: (state: Draft<typeof initialState>, action: PayloadAction<any>) => {
            state._id = action.payload._id
            state.userInfo = action.payload
        },
    },
});

// A small helper of user state for `useSelector` function.
export const getUserState = (state: { user: typeof initialState }) => state.user;

// Exports all actions
export const { setName, setEmail, setUserInfo, setProfilePic, setCountry, resetState, setLoading, setMyInfo } = userSlice.actions;

export default userSlice.reducer;
