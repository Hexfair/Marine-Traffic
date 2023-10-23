import { OptionsSliceData, setFilterReducer, setSortReducer } from "./options.slice"
import { useAppDispatch, useAppSelector } from "../store";
import { FilterType, SortType } from "@/components/FilterBlock/FilterBlock.interfaces";
//===========================================================================================================

const useOptionsStore = () => {
	const { filter, sort } = useAppSelector((state) => state.options);
	const dispatch = useAppDispatch();

	const setFilter = (data: FilterType) => {
		console.log(data);
		dispatch(setFilterReducer(data));
	};

	const setSort = (data: OptionsSliceData['sort']) => {
		dispatch(setSortReducer(data));
	};

	return {
		filter,
		sort,
		setFilter,
		setSort
	};
};

export default useOptionsStore;