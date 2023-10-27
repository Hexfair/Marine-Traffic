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
	}
})

export const { setShipFullDataReducer } = shipSlice.actions;
export default shipSlice.reducer;