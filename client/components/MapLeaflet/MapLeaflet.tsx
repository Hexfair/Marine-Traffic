'use client'
import React from 'react'
import styles from './MapLeaflet.module.scss';
import "leaflet.offline";
import L from "leaflet";
import { MapContainer, TileLayer, Polygon, Popup, Polyline, Marker } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import { MapLeafletProps } from './MapLeaflet.props';
import MapRecenter from './Plugins/MapRecenter';
import { ShipReadedIcon, ShipNewIcon, ShipSelectedIcon, CircleIcon } from './MapLeaflet.icons';
import "leaflet-rotatedmarker";
import useOptionsStore from '@/redux/options/options.hook';
import useMapsStore from '@/redux/maps/maps.hook';
import { mapFilterShips } from '@/helpers/map-filter-ships.helper';
import { mapFilterPositions } from '@/helpers/map-filter-positions.helper';
import { mapPolylinePositions } from '@/helpers/map-polyline-positions.helper';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
//===========================================================================================================

export default function MapLeaflet(props: MapLeafletProps) {
	const { viewDataPositions, viewDataShips } = props;
	const { positionFilter } = useOptionsStore();
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
				{viewDataShips && mapFilterShips(viewDataShips).map((obj) =>
					<Marker
						key={obj.ship.mmsi}
						position={{ lat: obj.latitude, lng: obj.longitude }}
						icon={mapCenterData.lat === obj.latitude && mapCenterData.lng === obj.longitude
							? ShipSelectedIcon
							: obj.isReaded ? ShipReadedIcon : ShipNewIcon}
						rotationAngle={obj.course}
						rotationOrigin='center center'
					>
						<Popup children={
							<div className={styles.popup}>
								<p className={styles.title}>{`(${obj.ship.acronym}) ${obj.ship.name}`}</p>
								<p className={styles.coords}>
									<span>Координаты: </span>
									<span>{`${obj.latitude}, ${obj.longitude}`}</span>
								</p>
								<p className={styles.date}>
									<span>Дата: </span>
									<span>{dayjs(obj.latestTime).format("HH:mm DD-MM-YYYY")}</span>
								</p>
								<p className={styles.date}>
									<span>Дата UTC: </span>
									<span>{dayjs.utc(obj.latestTime).format("HH:mm DD-MM-YYYY")}</span>
								</p>
							</div>} />
					</Marker>)}
				{viewDataPositions &&
					<>
						{mapFilterPositions(viewDataPositions).map((obj, index) => <Marker
							key={obj.id}
							position={{ lat: obj.latitude, lng: obj.longitude }}
							icon={index === 0 ? ShipNewIcon : CircleIcon}
							rotationAngle={obj.course}
							rotationOrigin='center center'
						>
							<Popup children={
								<div className={styles.popup}>
									<p className={styles.coords}>
										<span>Координаты: </span>
										<span>{`${obj.latitude}, ${obj.longitude}`}</span>
									</p>
									<p className={styles.date}>
										<span>Дата: </span>
										<span>{dayjs(obj.latestTime).format("HH:mm DD-MM-YYYY")}</span>
									</p>
									<p className={styles.date}>
										<span>Дата UTC: </span>
										<span>{dayjs.utc(obj.latestTime).format("HH:mm DD-MM-YYYY")}</span>
									</p>
								</div>} />
						</Marker>)}
						<Polyline pathOptions={{ color: 'black' }} positions={mapPolylinePositions(viewDataPositions, positionFilter)} />
					</>
				}
				<MapRecenter />
			</MapContainer >
		</>
	)
}