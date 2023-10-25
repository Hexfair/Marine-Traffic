import { OptionsSliceData, setFilterByTimeReducer, setFilterByTypeReducer, setSortReducer } from "./options.slice"
import { useAppDispatch, useAppSelector } from "../store";
import { FiltersByTime, FiltersByType } from "@/components/FilterBlock/FilterBlock.interfaces";
//===========================================================================================================

const useOptionsStore = () => {
	const { filter, sort } = useAppSelector((state) => state.options);
	const dispatch = useAppDispatch();

	const setFilterByTime = (data: FiltersByTime) => {
		dispatch(setFilterByTimeReducer(data));
	};

	const setFilterByType = (data: FiltersByType[]) => {
		dispatch(setFilterByTypeReducer(data));
	};

	const setSort = (data: OptionsSliceData['sort']) => {
		dispatch(setSortReducer(data));
	};

	return {
		filter,
		sort,
		setFilterByTime,
		setFilterByType,
		setSort
	};
};

export default useOptionsStore;