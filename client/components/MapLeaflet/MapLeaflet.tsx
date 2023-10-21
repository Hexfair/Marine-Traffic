'use client'
import React from 'react'
import "leaflet.offline";
import L from "leaflet";
import { MapContainer, TileLayer, Polygon, Popup, Polyline, Marker } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import { MapLeafletProps } from './MapLeaflet.props';
import { ICoordinate } from './MapLeaflet.interface';
import MapRecenter from './Plugins/MapRecenter';
import { ShipActiveReadedIcon, ShipActiveNewIcon, ShipStopedIcon } from './MapLeaflet.icons';
import "leaflet-rotatedmarker";
import usePosition from '@/redux/position/position.hook';
import { useMapEvents } from 'react-leaflet/hooks'
import MapZoomLevel from './Plugins/MapZoomLevel';
import socket from '@/configs/socket';
import { checkOldPosition } from '@/helpers/check-old-position.helper';
//===========================================================================================================

export default function MapLeaflet(props: MapLeafletProps) {
	// const { positions } = props;
	const { positionsDataStore, isDateSorted } = usePosition();

	const [map, setMap] = React.useState<L.Map | undefined>();
	const [mapCenter, setMapCenter] = React.useState<ICoordinate>({ lat: 51.505, lng: -0.09 });

	React.useEffect(() => {
		if (map) {
			const tileLayerOffline = L.tileLayer('./MapLayers/{z}/{x}/{y}.png', {
				maxZoom: 9,
				minZoom: 1,
				tileSize: 256,
			}).addTo(map);

			tileLayerOffline.addTo(map);
		}
	}, [map, mapCenter]);

	return (
		<>
			<MapContainer center={mapCenter} zoom={4} scrollWheelZoom={true} worldCopyJump>
				<TileLayer url="./MapLayers/{z}/{x}/{y}.png" />
				{positionsDataStore.length > 0 && positionsDataStore
					.filter((obj) => {
						if (isDateSorted) {
							return checkOldPosition(obj.latestTime) && obj
						} else {
							return obj
						}
					})
					.map((obj, index) =>
						<Marker
							key={obj.ship.mmsi}
							position={{ lat: obj.latitude, lng: obj.longitude }}
							icon={obj.isReaded ? ShipActiveReadedIcon : ShipActiveNewIcon}
							rotationAngle={obj.course}
							rotationOrigin='center center'
						>
							<Popup children={<div><p>{`Координаты: ${obj.latitude}, ${obj.longitude}`}</p>
								<p onClick={() => setMapCenter({ lat: 11.505, lng: -0.09 })}>{obj.ship.acronym}</p>
								<p>{obj.ship.name}</p>
							</div>} />
						</Marker>)}
				{/* <MapZoomLevel /> */}
				<MapRecenter lat={mapCenter.lat} lng={mapCenter.lng} coords={mapCenter} setMapCenter={setMapCenter} />
			</MapContainer>
		</>
	)
}