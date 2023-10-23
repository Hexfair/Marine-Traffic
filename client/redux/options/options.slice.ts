import { FilterType, SortType } from '@/components/FilterBlock/FilterBlock.interfaces';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
//===========================================================================================================

export interface OptionsSliceData {
	filter: FilterType,
	sort: 'oldest' | 'namesUp' | 'namesDown'
}

const initialState: OptionsSliceData = {
	filter: 'day',
	sort: 'oldest'
}

const optionsSlice = createSlice({
	name: 'options',
	initialState,
	reducers: {
		setFilterReducer: (state, action: PayloadAction<OptionsSliceData['filter']>) => {
			state.filter = action.payload;
		},
		setSortReducer: (state, action: PayloadAction<OptionsSliceData['sort']>) => {
			state.sort = action.payload;
		},
	}
})

export const { setFilterReducer, setSortReducer } = optionsSlice.actions;
export default optionsSlice.reducer;