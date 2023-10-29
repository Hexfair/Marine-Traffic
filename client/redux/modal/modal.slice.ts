import { ICoordinate } from '@/components/MapLeaflet/MapLeaflet.interface';
import { IShipMainData } from '@/interfaces/Ship.interface';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
//===========================================================================================================

export interface ModalSliceData {
	isOpen: boolean;
	isEdit: boolean;
	ship: IShipMainData | null;
}

const initialState: ModalSliceData = {
	isOpen: false,
	isEdit: false,
	ship: null
}

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		updateModalViewReducer: (state, action: PayloadAction<ModalSliceData>) => {
			state.isOpen = action.payload.isOpen;
			state.isEdit = action.payload.isEdit;
			state.ship = action.payload.ship;
		},
	}
})

export const { updateModalViewReducer } = modalSlice.actions;
export default modalSlice.reducer;