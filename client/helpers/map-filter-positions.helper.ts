import { IPosition } from '@/interfaces/Position.interface';
import useOptionsStore from '@/redux/options/options.hook';
//=========================================================================================================================

export const mapFilterPositions = (viewData: Omit<IPosition, "ship">[]) => {
	const { positionFilter } = useOptionsStore();

	if (viewData.length > 0) {
		return viewData
			.filter((obj) => {
				if (positionFilter.byChecked.includes(obj.id)) {
					return obj
				}
			})
	}
	return []
}
