import { IPosition } from '@/interfaces/Position.interface';
import { IShip } from '@/interfaces/Ship.interface';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
//===========================================================================================================

export interface ShipSliceData {
	shipFullStore: IShip | null,
}

const initialState: ShipSliceData = {
	shipFullStore: null,
}

const shipSlice = createSlice({
	name: 'shipFull',
	initialState,
	reducers: {
		setShipFullDataReducer: (state, action: PayloadAction<IShip>) => {
			state.shipFullStore = action.payload;
		},
		setPositionsByDateReducer: (state, action: PayloadAction<IPosition[] | null>) => {
			if (state.shipFullStore && action.payload) {
				state.shipFullStore.positions = action.payload;
			}
			if (state.shipFullStore && action.payload === null) {
				state.shipFullStore.positions = [];
			}
		},
	}
})

export const { setShipFullDataReducer, setPositionsByDateReducer } = shipSlice.actions;
export default shipSlice.reducer;