import { configureStore } from "@reduxjs/toolkit";
import positionReducer from "./position/position.slice";
import optionsReducer from "./options/options.slice";
import mapsReducer from "./maps/maps.slice";
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
//===========================================================================================================

export const store = configureStore({
	reducer: {
		position: positionReducer,
		options: optionsReducer,
		maps: mapsReducer
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;