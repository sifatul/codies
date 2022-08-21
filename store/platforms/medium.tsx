
import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';



/**
 * Default state object with initial values.
 */
const initialState: any = {


  // topRepos: [],
} as const;

/**
 * Create a slice as a reducer containing actions.
 *
 * In this example actions are included in the slice. It is fine and can be
 * changed based on your needs.
 */
export const mediumSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    setMediumData: (
      state: Draft<typeof initialState>,
      action: PayloadAction<any>
    ) => {
      // TODO 
      action.payload
    },

  },
});

// A small helper of user state for `useSelector` function.
export const getMediumData = (state: any) => {
  // TODO 
  return state
};

// Exports all actions
export const { setMediumData } = mediumSlice.actions;

export default mediumSlice.reducer;
