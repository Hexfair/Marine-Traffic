import { IPosition } from '@/interfaces/Position.interface';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
//===========================================================================================================

export interface PositionSliceData {
	positionsDataStore: IPosition[],
}

const initialState: PositionSliceData = {
	positionsDataStore: [],
}

const positionSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setPositionsData: (state, action: PayloadAction<IPosition[]>) => {
			state.positionsDataStore = action.payload;
		},
	}
})

export const { setPositionsData } = positionSlice.actions;
export default positionSlice.reducer;