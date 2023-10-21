import dayjs from 'dayjs';

const dateNow = dayjs().format('YYYY-MM-DD');

export const checkOldPosition = (time: number) => {
	const dateItem = dayjs.unix(time).format("YYYY-MM-DD");
	return Boolean(dayjs(dateNow).diff(dateItem, 'day') <= 1)
}
