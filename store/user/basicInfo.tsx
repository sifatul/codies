import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
    _id?: string;
    email: string;
    name: string;
    country: string;
    gender: string;
    dob: string;
    profilePic: string;
    mobile: string;
    // profile links
}

/**
 * Default state object with initial values.
 */
const initialState: UserState = {
    _id: '',
    name: '',
    email: '',
    country: '',
    gender: '',
    dob: '',
    profilePic: '',
    mobile: '',
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
            action: PayloadAction<typeof initialState.name>
        ) => {
            state.name = action.payload;
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
            state._id = "action.payload";
        },
    },
});

// A small helper of user state for `useSelector` function.
export const getUserState = (state: { user: UserState }) => state.user;

// Exports all actions
export const { setName, setEmail, setUserInfo, setProfilePic, setCountry } = userSlice.actions;

export default userSlice.reducer;
