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
//===========================================================================================================

export default function MapLeaflet(props: MapLeafletProps) {
	const { positions } = props;
	const { positionsDataStore, setInitialPositions } = usePosition();

	const [map, setMap] = React.useState<L.Map | undefined>();
	const [mapCenter, setMapCenter] = React.useState<ICoordinate>({ lat: 51.505, lng: -0.09 });

	React.useEffect(() => {
		socket.connect();
		return () => { socket.disconnect(); };
	}, [map]);

	React.useEffect(() => {
		setInitialPositions(positions)
	}, []);


	React.useEffect(() => {
		if (map) {
			const tileLayerOffline = L.tileLayer('./MapLayers/{z}/{x}/{y}.png', {
				maxZoom: 9,
				minZoom: 1,
				tileSize: 256,
			}).addTo(map);

			tileLayerOffline.addTo(map);
		}
	}, [map]);

	return (
		<>
			<MapContainer center={mapCenter} zoom={4} scrollWheelZoom={true} worldCopyJump>
				<TileLayer url="./MapLayers/{z}/{x}/{y}.png" />
				{positionsDataStore.length > 0 && positionsDataStore.map((obj, index) =>
					<Marker
						key={obj.ship.mmsi}
						position={{ lat: obj.latitude, lng: obj.longitude }}
						icon={obj.isReaded ? ShipActiveReadedIcon : ShipActiveNewIcon}
						rotationAngle={obj.course}
						rotationOrigin='center center'
					>
						<Popup children={<div><p>{`Координаты: ${obj.latitude}, ${obj.longitude}`}</p>
							<p>{obj.ship.acronym}</p>
							<p>{obj.ship.name}</p>
						</div>} />
					</Marker>)}
				{/* <MapZoomLevel /> */}
				{/* <MapRecenter lat={mapCenter.lat} lng={mapCenter.lng} coords={[{ lat: 50.00, lng: 0.00 }]} setMapCenter={setMapCenter} /> */}
			</MapContainer>
		</>
	)
}