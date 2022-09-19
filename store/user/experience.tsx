
import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

export interface experiencesProjectType {
  _id?: string,
  companyName: string,
  position: string,
  presentCompany: false,
  startDate: string,
  endDate: string,
  summary: string,
  techStack: string[],
  isPresentCompany: boolean,

  // profile links

}

/**
 * Default state object with initial values.
 */
const initialState: { experiences: experiencesProjectType[], skillTags: string[] } = {
  experiences: [] as experiencesProjectType[],
  skillTags: [] as string[]

  // topRepos: [],
} as const;

/**
 * Create a slice as a reducer containing actions.
 *
 * In this example actions are included in the slice. It is fine and can be
 * changed based on your needs.
 */
export const experiencesSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    setExperience: (
      state: Draft<typeof initialState>,
      action: PayloadAction<experiencesProjectType>
    ) => {

      state.experiences.push(action.payload)
    },
    setExperienceList: (
      state: Draft<typeof initialState>,
      action: PayloadAction<experiencesProjectType[]>
    ) => {

      state.experiences = action.payload
    },
    updateExperience: (
      state: Draft<typeof initialState>,
      action: PayloadAction<experiencesProjectType>
    ) => {

      console.log("action.payload", action.payload)
      const afterUpdate = state.experiences.map(item => {
        if (item._id !== action.payload._id) return item
        else return action.payload
      })
      console.log("afterUpdate: ", afterUpdate)
      state.experiences = afterUpdate
    },
    deleteExperience: (
      state: Draft<typeof initialState>,
      action: PayloadAction<String>
    ) => {
      const afterDeleteExp = state.experiences.filter(item => item._id !== action.payload)
      state.experiences = afterDeleteExp
    },

    setSkillTags: (
      state: Draft<typeof initialState>,
      action: PayloadAction<string[]>
    ) => {

      state.skillTags = action.payload
    },


  },
});

// A small helper of user state for `useSelector` function.
export const getExperiences = (state: { experiences: { experiences: experiencesProjectType[], skillTags: string[] } }) => {
  return state.experiences.experiences
};
export const getSkillTags = (state: { experiences: { experiences: experiencesProjectType[], skillTags: string[] } }) => {
  return state.experiences.skillTags || []
};

// Exports all actions
export const { setExperience, updateExperience, deleteExperience, setExperienceList, setSkillTags } = experiencesSlice.actions;

export default experiencesSlice.reducer;
