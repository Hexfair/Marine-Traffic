import { FiltersByTime } from '@/components/FilterBlock/FilterBlock.interfaces';
import dayjs from 'dayjs';
//=========================================================================================================================
const dateNow = dayjs().format('YYYY-MM-DD');

export const checkOldPosition = (time: Date, filter: FiltersByTime) => {
	return filter !== 'all' && Boolean(dayjs(dateNow).diff(time, filter) <= 1)
}
