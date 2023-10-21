import { setPositionsReducer, setIsDateSortReducer, updateIsReadedReducer } from "./position.slice"
import { useAppDispatch, useAppSelector } from "../store";
import { IPosition } from "@/interfaces/Position.interface";
//===========================================================================================================

const usePosition = () => {
	const { positionsDataStore, isDateSorted } = useAppSelector((state) => state.position);
	const dispatch = useAppDispatch();

	const setInitialPositions = (data: IPosition[]) => {
		dispatch(setPositionsReducer(data));
	};

	const setStatusDateSorted = (data: boolean) => {
		dispatch(setIsDateSortReducer(data));
	};

	const updateStatusPosition = (data: number) => {
		dispatch(updateIsReadedReducer(data));
	};

	return {
		positionsDataStore,
		isDateSorted,
		setInitialPositions,
		setStatusDateSorted,
		updateStatusPosition
	};
};

export default usePosition;