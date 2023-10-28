import { FiltersByTime, FiltersByType } from '@/components/FilterBlock/FilterBlock.interfaces';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
//===========================================================================================================

export interface OptionsSliceData {
	shipFilter: {
		byTime: FiltersByTime,
		byType: FiltersByType[]
	},
	positionFilter: {
		byTime: string[],
		byChecked: number[]
	},
	sort: 'oldest' | 'namesUp' | 'namesDown'
}

const initialState: OptionsSliceData = {
	shipFilter: {
		byTime: 'day',
		byType: ['Attack Submarines', 'Ballistic Missile Submarines', 'Guided Missile Destroyers', 'Guided Missile Submarines', 'Saildrone Voyager', 'Aircraft Carriers', 'Guided Missile Cruisers']
	},
	positionFilter: {
		byTime: [],
		byChecked: [393, 20, 252]
	},
	sort: 'oldest'
}

const optionsSlice = createSlice({
	name: 'options',
	initialState,
	reducers: {
		setFilterByTimeReducer: (state, action: PayloadAction<FiltersByTime>) => {
			state.shipFilter.byTime = action.payload;
		},
		setFilterByTypeReducer: (state, action: PayloadAction<FiltersByType[]>) => {
			state.shipFilter.byType = action.payload;
		},
		setPositionFilterByCheckedReducer: (state, action: PayloadAction<number[]>) => {
			state.positionFilter.byChecked = action.payload;
		},
		setSortReducer: (state, action: PayloadAction<OptionsSliceData['sort']>) => {
			state.sort = action.payload;
		},
	}
})

export const { setFilterByTimeReducer, setFilterByTypeReducer, setSortReducer, setPositionFilterByCheckedReducer } = optionsSlice.actions;
export default optionsSlice.reducer;