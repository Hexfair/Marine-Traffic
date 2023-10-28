import { setShipFullDataReducer, setPositionsByDateReducer } from "./ship.slice"
import { useAppDispatch, useAppSelector } from "../store";
import { IShip } from "@/interfaces/Ship.interface";
import { IPosition } from "@/interfaces/Position.interface";
//===========================================================================================================

const useShipStore = () => {
	const { shipFullStore } = useAppSelector((state) => state.ship);
	const dispatch = useAppDispatch();

	const setShipFullData = (data: IShip) => {
		dispatch(setShipFullDataReducer(data));
	};

	const updatePositionsByDate = (data: IPosition[] | null) => {
		dispatch(setPositionsByDateReducer(data));
	};

	return {
		shipFullStore,
		setShipFullData,
		updatePositionsByDate
	};
};

export default useShipStore;