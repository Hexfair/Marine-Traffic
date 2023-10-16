import L from "leaflet";
import styles from './MapLeaflet.module.scss'

//===========================================================================================================

export const ShipActiveReadedIcon = L.icon({
	iconUrl: 'Icons/ship-readed.svg',
	iconAnchor: [10, 8],
	popupAnchor: [0, -3],
	className: styles.oldShipIcon,
});

export const ShipActiveNewIcon = L.icon({
	iconUrl: 'Icons/ship-new.svg',
	iconAnchor: [12, 10],
	popupAnchor: [0, -3],
	className: styles.newShipIcon
});

export const ShipStopedIcon = L.icon({
	iconUrl: 'Icons/square.svg',
	iconAnchor: [5, 5],
	popupAnchor: [0, -3],
});