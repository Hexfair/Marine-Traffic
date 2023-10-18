import React from 'react'
import { useMap } from 'react-leaflet'
import "leaflet.offline";
import { IRecenter } from '../MapLeaflet.interface';
//===========================================================================================================

export default function MapRecenter(props: IRecenter) {
	const { lat, lng, coords, setMapCenter } = props;
	const map = useMap();

	React.useEffect(() => {
		map.setView([coords.lat, coords.lng]);
	}, [coords]);

	return null;
}
