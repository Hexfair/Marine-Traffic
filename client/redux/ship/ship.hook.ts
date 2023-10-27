import { setShipFullDataReducer } from "./ship.slice"
import { useAppDispatch, useAppSelector } from "../store";
import { IShip } from "@/interfaces/Ship.interface";
//===========================================================================================================

const useShipStore = () => {
	const { shipFullStore } = useAppSelector((state) => state.ship);
	const dispatch = useAppDispatch();

	const setShipFullData = (data: IShip) => {
		dispatch(setShipFullDataReducer(data));
	};

	return {
		shipFullStore,
		setShipFullData
	};
};

export default useShipStore;