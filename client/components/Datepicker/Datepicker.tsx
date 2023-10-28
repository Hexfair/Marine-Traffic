import React from 'react';
import styles from './DatePicker.module.scss';
import { DatePickerProps } from './Datepicker.props';
import DPicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
// dayjs.utc().format();
//=========================================================================================================================

//=========================================================================================================================
export const DatePicker = (props: DatePickerProps) => {
	const { dateRange, setDateRange } = props;

	return (
		<DPicker
			showIcon
			selectsRange={true}
			startDate={dateRange[0]}
			endDate={dateRange[1]}
			onChange={(update) => {
				const start = update[0];
				const end = update[1];
				end?.setHours(23);
				end?.setMinutes(59);
				end?.setSeconds(59);
				setDateRange([start as Date, end as Date]);
			}}
			isClearable={true}
			className={styles.DatePicker}
			placeholderText='Set filter by dates'
			calendarClassName={styles.rasta}
		/>
	);
}
