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
		updateIsReadedPosition: (state, action: PayloadAction<any>) => {
			const updateState = state.positionsDataStore.map((obj) => {
				if (obj.ship.id === action.payload.id) {
					obj.isReaded = true;
					return obj;
				} else {
					return obj;
				}
			})
			state.positionsDataStore = updateState;
			console.log(state.positionsDataStore)
		},
	}
})

export const { setPositionsData, updateIsReadedPosition } = positionSlice.actions;
export default positionSlice.reducer;