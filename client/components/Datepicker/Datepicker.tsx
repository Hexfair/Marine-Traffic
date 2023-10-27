import React from 'react';
import styles from './DatePicker.module.scss';
import { DatePickerProps } from './Datepicker.props';
//=========================================================================================================================

export const DatePicker = (props: DatePickerProps) => {
	const [startDate, setStartDate] = React.useState<Date>(new Date());

	return (
		<DatePicker
			showIcon
			selected={startDate}
			onChange={(date) => setStartDate(date)}
		/>
	);
}
