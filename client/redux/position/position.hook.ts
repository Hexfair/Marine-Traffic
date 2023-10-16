import { setPositionsData } from "./position.slice"
import { useAppDispatch, useAppSelector } from "../store";
import { IPosition } from "@/interfaces/Position.interface";
//===========================================================================================================

const usePosition = () => {
	const { positionsDataStore } = useAppSelector((state) => state.position);
	const dispatch = useAppDispatch();

	const setInitialPositions = (data: IPosition[]) => {
		dispatch(setPositionsData(data));
	};

	return {
		positionsDataStore,
		setInitialPositions
	};
};

export default usePosition;