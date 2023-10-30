import { ModalSliceData, updateModalViewReducer, updateModalShipsReducer } from "./modal.slice"
import { useAppDispatch, useAppSelector } from "../store";
import { IShipMainData } from "@/interfaces/Ship.interface";
//===========================================================================================================

const useModalStore = () => {
	const { isOpen, isEdit, ships } = useAppSelector((state) => state.modal);
	const dispatch = useAppDispatch();

	const setUpdateModalStatus = (data: Omit<ModalSliceData, 'ships'>) => {
		dispatch(updateModalViewReducer(data));
	};

	const setUpdateModalShips = (data: IShipMainData[]) => {
		dispatch(updateModalShipsReducer(data));
	};

	return {
		setUpdateModalStatus,
		setUpdateModalShips,
		isOpen,
		isEdit,
		ships
	};
};

export default useModalStore;