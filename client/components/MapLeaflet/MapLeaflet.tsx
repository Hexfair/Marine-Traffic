'use client'
import React from 'react'
import "leaflet.offline";
import L from "leaflet";
import { MapContainer, TileLayer, Polygon, Popup, Polyline, Marker } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import { MapLeafletProps } from './MapLeaflet.props';
import { ICoordinate } from './MapLeaflet.interface';
import Recenter from './MapRecenter';
import { ShipActiveReadedIcon, ShipActiveNewIcon, ShipStopedIcon } from './MapLeaflet.icons';
import "leaflet-rotatedmarker";
//===========================================================================================================

export default function MapLeaflet(props: MapLeafletProps) {
	const { positions } = props;

	const [map, setMap] = React.useState<L.Map | undefined>();
	const [mapCenter, setMapCenter] = React.useState<ICoordinate>({ lat: 51.505, lng: -0.09 });





	React.useEffect(() => {
		if (map) {
			const tileLayerOffline = L.tileLayer('./MapLayers/{z}/{x}/{y}.png', {
				maxZoom: 9,
				minZoom: 1,
				tileSize: 512,
				zoomOffset: -1
			}).addTo(map);

			tileLayerOffline.addTo(map);
		}
	}, [map]);


	return (
		<>
			<MapContainer center={mapCenter} zoom={4} scrollWheelZoom={true} >
				<TileLayer url="./MapLayers/{z}/{x}/{y}.png" />
				{positions.length > 0 && positions.map((obj, index) =>
					<Marker key={obj.ship.mmsi}
						position={{ lat: obj.latitude, lng: obj.longitude }}
						icon={obj.isReaded ? ShipActiveReadedIcon : ShipActiveNewIcon}
						rotationAngle={obj.course}
					>
						<Popup children={<div><p>Координаты: ${obj.latitude}, ${obj.longitude}</p>
							<p>{obj.ship.acronym}</p>
							<p>{obj.ship.name}</p>
						</div>} />
					</Marker>)}
				{/* <Recenter lat={mapCenter.lat} lng={mapCenter.lng} coords={[{ lat: 50.00, lng: 0.00 }]} setMapCenter={setMapCenter} /> */}
			</MapContainer>
		</>
	)
}