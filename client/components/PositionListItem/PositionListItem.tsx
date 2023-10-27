'use client'
import React from 'react';
import styles from './PositionListItem.module.scss';
import { PositionListItemProps } from './PositionListItem.props';
import { Checkbox } from '../FilterCheckbox/Checkbox';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc)
//===========================================================================================================

export const PositionListItem = (props: PositionListItemProps) => {
	const { shipPosition } = props;



	return (
		<tr key={shipPosition.id} className={styles.item}>
			<td><Checkbox isChecked={true} small /></td>
			<td>{shipPosition.latitude}</td>
			<td>{shipPosition.longitude}</td>
			<td>{shipPosition.course}</td>
			<td>{dayjs(shipPosition.latestTime * 1000).format('HH:mm D MMM YYYY')}</td>
		</tr>
	)
}
