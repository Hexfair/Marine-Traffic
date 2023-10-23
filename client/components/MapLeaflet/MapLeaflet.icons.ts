import L from "leaflet";
import styles from './MapLeaflet.module.scss'

//===========================================================================================================

export const ShipReadedIcon = L.icon({
	iconUrl: 'Icons/ship-readed.svg',
	iconAnchor: [10, 8],
	popupAnchor: [0, -3],
	className: styles.oldShipIcon,
});

export const ShipNewIcon = L.icon({
	iconUrl: 'Icons/ship-new.svg',
	iconAnchor: [12, 10],
	popupAnchor: [0, -3],
	className: styles.newShipIcon
});

export const ShipSelectedIcon = L.icon({
	iconUrl: 'Icons/ship-selected.svg',
	iconAnchor: [5, 5],
	popupAnchor: [0, -3],
});