import { IPosition } from '@/interfaces/Position.interface';
import useOptionsStore from '@/redux/options/options.hook';
import { checkOldPosition } from './check-old-position.helper';
//=========================================================================================================================

export const mapFilterShips = (viewData: IPosition[]) => {
	const { shipFilter } = useOptionsStore();

	if (viewData.length > 0) {
		return viewData
			.filter((obj) => {
				if (shipFilter.byTime !== 'all') {
					return checkOldPosition(obj.latestTime, shipFilter.byTime) && obj
				}
				return obj
			})
			.filter((obj) => shipFilter.byType.includes(obj.ship.type))
	}
	return []
}
