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
		updateIsReadedReducer: (state, action: PayloadAction<number>) => {
			const updateState = state.positionsDataStore.map((obj) => {
				if (obj.ship.id === action.payload) {
					obj.isReaded = true;
				}
				return obj;
			})
			state.positionsDataStore = updateState;
		},
		updateAllReadedReducer: (state, action: PayloadAction<boolean>) => {
			const updateState = state.positionsDataStore.map((obj) => {
				obj.isReaded = action.payload;
				return obj
			});
			state.positionsDataStore = updateState;
		},
	}
})

export const { setPositionsReducer, updateIsReadedReducer, updateAllReadedReducer } = positionSlice.actions;
export default positionSlice.reducer;