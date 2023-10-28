import React from 'react';
import styles from './DatePicker.module.scss';
import { DatePickerProps } from './Datepicker.props';
import DPicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.utc().format();
//=========================================================================================================================

export const DatePicker = (props: DatePickerProps) => {
	const [startDate, setStartDate] = React.useState<Date>(new Date());
	console.log(startDate);

	const aaa = dayjs(startDate).set('hour', 0).set('minute', 0).set('second', 0)

	console.log(aaa);






	//console.log(dayjs(startDate).valueOf());
	const dd = dayjs(startDate).utc().valueOf();

	//console.log(dayjs(dd).utc().format('YYYY-MM-DD HH:mm')); // на выходе UTC

	return (
		<DPicker
			showIcon
			selected={startDate}
			onChange={(date) => setStartDate(date as Date)}
		/>
	);
}
