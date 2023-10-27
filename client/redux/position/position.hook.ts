import { setPositionsReducer, updateIsReadedReducer, updateAllReadedReducer } from "./position.slice"
import { useAppDispatch, useAppSelector } from "../store";
import { IPosition } from "@/interfaces/Position.interface";
//===========================================================================================================

const usePositionStore = () => {
	const { positionsDataStore } = useAppSelector((state) => state.position);
	const dispatch = useAppDispatch();

	const setInitialPositions = (data: IPosition[]) => {
		dispatch(setPositionsReducer(data));
	};

	const updateStatusPosition = (data: number) => {
		dispatch(updateIsReadedReducer(data));
	};

	const updateStatusAllPositions = (data: boolean) => {
		dispatch(updateAllReadedReducer(data));
	};

	return {
		positionsDataStore,
		setInitialPositions,
		updateStatusPosition,
		updateStatusAllPositions
	};
};

export default usePositionStore;