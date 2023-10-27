import { IPosition } from '@/interfaces/Position.interface';
//=========================================================================================================================

export const mapPolylinePositions = (viewData: Omit<IPosition, "ship">[], positionFilter: {
	byTime: string[],
	byChecked: number[]
}) => {
	if (viewData.length > 0) {
		return viewData
			.filter(obj => Boolean(positionFilter.byChecked.includes(obj.id)))
			.map(obj => {
				const coord = {
					lat: Number(obj.latitude),
					lng: Number(obj.longitude)
				};
				return coord;
			})
	}
	return []
}
