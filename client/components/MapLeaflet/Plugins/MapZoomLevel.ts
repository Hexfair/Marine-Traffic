import "leaflet.offline";
import { useMapEvents } from 'react-leaflet/hooks'
import { useMap } from 'react-leaflet'
//===========================================================================================================

export default function MapZoomLevel() {
	const map = useMap();

	const mapEvents = useMapEvents({
		zoom: () => {
			if (mapEvents.getZoom() > 9) {
				map.setZoom(9)
			}
		}
	});
	return null
}
