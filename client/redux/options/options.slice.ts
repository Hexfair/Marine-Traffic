import { FiltersByTime, FiltersByType, SortType } from '@/components/FilterBlock/FilterBlock.interfaces';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
//===========================================================================================================

export interface OptionsSliceData {
	filter: {
		byTime: FiltersByTime,
		byType: FiltersByType[]
	},
	sort: 'oldest' | 'namesUp' | 'namesDown'
}

const initialState: OptionsSliceData = {
	filter: {
		byTime: 'day',
		byType: ['Attack Submarines', 'Ballistic Missile Submarines', 'Guided Missile Destroyers', 'Guided Missile Submarines', 'Saildrone Voyager']
	},
	sort: 'oldest'
}

const optionsSlice = createSlice({
	name: 'options',
	initialState,
	reducers: {
		setFilterByTimeReducer: (state, action: PayloadAction<FiltersByTime>) => {
			state.filter.byTime = action.payload;
		},
		setFilterByTypeReducer: (state, action: PayloadAction<FiltersByType[]>) => {
			state.filter.byType = action.payload;
		},
		setSortReducer: (state, action: PayloadAction<OptionsSliceData['sort']>) => {
			state.sort = action.payload;
		},
	}
})

export const { setFilterByTimeReducer, setFilterByTypeReducer, setSortReducer } = optionsSlice.actions;
export default optionsSlice.reducer;