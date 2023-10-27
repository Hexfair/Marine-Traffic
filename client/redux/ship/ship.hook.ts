import { setShipFullDataReducer } from "./ship.slice"
import { useAppDispatch, useAppSelector } from "../store";
import { IShip } from "@/interfaces/Ship.interface";
//===========================================================================================================

const useShipStore = () => {
	const { positionsDataStore, shipDataStore } = useAppSelector((state) => state.ship);
	const dispatch = useAppDispatch();

	const setShipFullData = (data: IShip) => {
		dispatch(setShipFullDataReducer(data));
	};

	return {
		positionsDataStore,
		shipDataStore,
		setShipFullData
	};
};

export default useShipStore;