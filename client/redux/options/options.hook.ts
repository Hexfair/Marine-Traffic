import { OptionsSliceData, setFilterByTimeReducer, setFilterByTypeReducer, setSortReducer, setPositionFilterByCheckedReducer } from "./options.slice"
import { useAppDispatch, useAppSelector } from "../store";
import { FiltersByTime, FiltersByType } from "@/components/FilterBlock/FilterBlock.interfaces";
//===========================================================================================================

const useOptionsStore = () => {
	const { shipFilter, positionFilter, sort } = useAppSelector((state) => state.options);
	const dispatch = useAppDispatch();

	const setShipFilterByTime = (data: FiltersByTime) => {
		dispatch(setFilterByTimeReducer(data));
	};

	const setShipFilterByType = (data: FiltersByType[]) => {
		dispatch(setFilterByTypeReducer(data));
	};

	const setPositionFilterByChecked = (data: number[]) => {
		dispatch(setPositionFilterByCheckedReducer(data));
	};

	const setSort = (data: OptionsSliceData['sort']) => {
		dispatch(setSortReducer(data));
	};

	return {
		shipFilter,
		positionFilter,
		setPositionFilterByChecked,
		sort,
		setShipFilterByTime,
		setShipFilterByType,
		setSort
	};
};

export default useOptionsStore;