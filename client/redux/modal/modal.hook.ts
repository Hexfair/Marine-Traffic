import { ModalSliceData, updateModalViewReducer } from "./modal.slice"
import { useAppDispatch, useAppSelector } from "../store";
//===========================================================================================================

const useModalStore = () => {
	const { isOpen, isEdit, ship } = useAppSelector((state) => state.modal);
	const dispatch = useAppDispatch();

	const setUpdateModalStatus = (data: ModalSliceData) => {
		dispatch(updateModalViewReducer(data));
	};

	return {
		setUpdateModalStatus,
		isOpen,
		isEdit,
		ship
	};
};

export default useModalStore;