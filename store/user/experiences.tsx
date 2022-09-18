
import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

export interface experienceProjectType {
  companyName: string,
  position: string,
  presentCompany: boolean,
  startDate: Date,
  endDate: Date,
  summary: string,
  techStack: string[],

  // profile links

}

/**
 * Default state object with initial values.
 */
const initialState: { experiences: experienceProjectType[] } = {
  experiences: [] as experienceProjectType[]

} as const;

/**
 * Create a slice as a reducer containing actions.
 *
 * In this example actions are included in the slice. It is fine and can be
 * changed based on your needs.
 */
export const experienceSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    setExperiences: (
      state: Draft<typeof initialState>,
      action: PayloadAction<{ experiences: experienceProjectType[] }>
    ) => action.payload,

  },
});

// A small helper of user state for `useSelector` function.
export const getExperiences = (state: { experience: { experiences: experienceProjectType[] } }) => {
  return { ...state.experience }
};

// Exports all actions
export const { setExperiences } = experienceSlice.actions;

export default experienceSlice.reducer;
