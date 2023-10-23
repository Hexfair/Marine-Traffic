import { FilterType } from '@/components/FilterBlock/FilterBlock.interfaces';
import dayjs from 'dayjs';
//=========================================================================================================================
const dateNow = dayjs().format('YYYY-MM-DD');

export const checkOldPosition = (time: number, filter: FilterType) => {
	const dateItem = dayjs.unix(time).format("YYYY-MM-DD");
	return filter !== 'all' && Boolean(dayjs(dateNow).diff(dateItem, filter) <= 1)
}
