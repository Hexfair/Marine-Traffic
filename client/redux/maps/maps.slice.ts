import { ICoordinate } from '@/components/MapLeaflet/MapLeaflet.interface';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
//===========================================================================================================

export interface MapsSliceData {
	mapCenterData: ICoordinate,
}

const initialState: MapsSliceData = {
	mapCenterData: { lat: 50.00, lng: 0.00 }
}

const mapsSlice = createSlice({
	name: 'maps',
	initialState,
	reducers: {
		updateMapCenterViewReducer: (state, action: PayloadAction<ICoordinate>) => {
			state.mapCenterData = action.payload;
		},
	}
})

export const { updateMapCenterViewReducer } = mapsSlice.actions;
export default mapsSlice.reducer;