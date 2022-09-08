
import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';


export interface mediumBlogItemType {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  enclosure?: any;
  categories: string[];
}
interface mediumFeed {
  url: string;
  title: string;
  link: string;
  author: string;
  description: string;
  image: string;
}
/**
 * Default state object with initial values.
 */
const initialState: { feed?: mediumFeed, mediums: mediumBlogItemType[] } = {
  feed: undefined,
  mediums: [] as mediumBlogItemType[]

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
    ) => action.payload,

  },
});

// A small helper of user state for `useSelector` function.
export const getMediumData = (state: { medium: typeof initialState }) => {
  return state.medium
};

// Exports all actions
export const { setMediumData } = mediumSlice.actions;

export default mediumSlice.reducer;
