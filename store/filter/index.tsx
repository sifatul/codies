import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

export interface FilterState {
    currentFilter: null | string;
}

const initialState: FilterState = {
    currentFilter: null,
} as const;

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter: (
            state: Draft<typeof initialState>,
            action: PayloadAction<typeof initialState.currentFilter>
        ) => {
            state.currentFilter = action.payload;
        },
    },
});

export const getFilterState = (state: { filter: FilterState }) => state.filter;

export const { setFilter } = filterSlice.actions;

export default filterSlice.reducer;
