import { IPosition } from '@/interfaces/Position.interface';
import { IShip } from '@/interfaces/Ship.interface';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
//===========================================================================================================

export interface ShipSliceData {
	shipDataStore: Omit<IShip, 'positions'> | null,
	positionsDataStore: Omit<IPosition, 'ship'>[] | null,
}

const initialState: ShipSliceData = {
	shipDataStore: null,
	positionsDataStore: null,
}

const shipSlice = createSlice({
	name: 'shipFull',
	initialState,
	reducers: {
		setShipFullDataReducer: (state, action: PayloadAction<IShip>) => {
			const { positions, ...ship } = action.payload;
			state.shipDataStore = ship;
			state.positionsDataStore = positions;
		},
	}
})

export const { setShipFullDataReducer } = shipSlice.actions;
export default shipSlice.reducer;