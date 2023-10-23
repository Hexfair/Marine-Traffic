import { updateMapCenterViewReducer } from "./maps.slice"
import { useAppDispatch, useAppSelector } from "../store";
import { ICoordinate } from "@/components/MapLeaflet/MapLeaflet.interface";
//===========================================================================================================

const useMapsStore = () => {
	const { mapCenterData } = useAppSelector((state) => state.maps);
	const dispatch = useAppDispatch();

	const updateMapsCenter = (data: ICoordinate) => {
		dispatch(updateMapCenterViewReducer(data));
	};

	return {
		updateMapsCenter,
		mapCenterData,
	};
};

export default useMapsStore;