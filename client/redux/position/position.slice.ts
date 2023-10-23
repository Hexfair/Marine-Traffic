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
	name: 'position',
	initialState,
	reducers: {
		setPositionsReducer: (state, action: PayloadAction<IPosition[]>) => {
			state.positionsDataStore = action.payload;
		},
		updateIsReadedReducer: (state, action: PayloadAction<any>) => {
			const updateState = state.positionsDataStore.map((obj) => {
				if (obj.ship.id === action.payload) {
					obj.isReaded = true;
				}
				return obj;
			})
			state.positionsDataStore = updateState;
		},
	}
})

export const { setPositionsReducer, updateIsReadedReducer } = positionSlice.actions;
export default positionSlice.reducer;