import React from 'react'
import { useMap } from 'react-leaflet'
import "leaflet.offline";
import useMapsStore from '@/redux/maps/maps.hook';
//===========================================================================================================

export default function MapRecenter() {
	const { mapCenterData } = useMapsStore();

	const map = useMap();

	React.useEffect(() => {
		map.setView([mapCenterData.lat, mapCenterData.lng]);
	}, [mapCenterData]);

	return null;
}
