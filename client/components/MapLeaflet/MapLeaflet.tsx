'use client'
import React from 'react'
import "leaflet.offline";
import L from "leaflet";
import { MapContainer, TileLayer, Polygon, Popup, Polyline, Marker } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import { MapLeafletProps } from './MapLeaflet.props';
import { ICoordinate } from './MapLeaflet.interface';
import MapRecenter from './Plugins/MapRecenter';
import { ShipReadedIcon, ShipNewIcon, ShipSelectedIcon } from './MapLeaflet.icons';
import "leaflet-rotatedmarker";
import usePositionStore from '@/redux/position/position.hook';
import { checkOldPosition } from '@/helpers/check-old-position.helper';
import useOptionsStore from '@/redux/options/options.hook';
import useMapsStore from '@/redux/maps/maps.hook';
//===========================================================================================================

export default function MapLeaflet(props: MapLeafletProps) {
	const { positionsDataStore } = usePositionStore();
	const { filter } = useOptionsStore();
	const { mapCenterData } = useMapsStore();

	const [map, setMap] = React.useState<L.Map | undefined>();

	React.useEffect(() => {
		if (map) {
			const tileLayerOffline = L.tileLayer('./MapLayers/{z}/{x}/{y}.webp', {
				maxZoom: 9,
				minZoom: 1,
				tileSize: 256,
			}).addTo(map);

			tileLayerOffline.addTo(map);
		}
	}, [map]);

	return (
		<>
			<MapContainer center={mapCenterData} zoom={4} scrollWheelZoom={true} worldCopyJump>
				<TileLayer url="./MapLayers/{z}/{x}/{y}.webp" />
				{positionsDataStore.length > 0 && positionsDataStore
					.filter((obj) => {
						if (filter !== 'all') {
							return checkOldPosition(obj.latestTime, filter) && obj
						}
						return obj
					})
					.map((obj, index) =>
						<Marker
							key={obj.ship.mmsi}
							position={{ lat: obj.latitude, lng: obj.longitude }}
							icon={mapCenterData.lat === obj.latitude && mapCenterData.lng === obj.longitude
								? ShipSelectedIcon
								: obj.isReaded
									? ShipReadedIcon
									: ShipNewIcon}
							rotationAngle={obj.course}
							rotationOrigin='center center'
						>
							<Popup children={<div><p>{`Координаты: ${obj.latitude}, ${obj.longitude}`}</p>
								<p>{obj.ship.acronym}</p>
								<p>{obj.ship.name}</p>
							</div>} />
						</Marker>)}
				{/* <MapZoomLevel /> */}
				<MapRecenter />
			</MapContainer >
		</>
	)
}