import { ICoordinate } from '@/components/MapLeaflet/MapLeaflet.interface';
import { IShipMainData } from '@/interfaces/Ship.interface';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
//===========================================================================================================

export interface ModalSliceData {
	isOpen: boolean;
	isEdit: boolean;
	ships: IShipMainData[];
}

const initialState: ModalSliceData = {
	isOpen: false,
	isEdit: false,
	ships: []
}

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		updateModalViewReducer: (state, action: PayloadAction<Omit<ModalSliceData, 'ships'>>) => {
			state.isOpen = action.payload.isOpen;
			state.isEdit = action.payload.isEdit;
		},
		updateModalShipsReducer: (state, action: PayloadAction<IShipMainData[]>) => {
			state.ships = action.payload;
		},
	}
})

export const { updateModalViewReducer, updateModalShipsReducer } = modalSlice.actions;
export default modalSlice.reducer;