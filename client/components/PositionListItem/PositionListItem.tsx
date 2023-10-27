'use client'
import React from 'react';
import styles from './PositionListItem.module.scss';
import { PositionListItemProps } from './PositionListItem.props';
import DeleteIcon from '@/public/Icons/delete.svg';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc)
//===========================================================================================================

export const PositionListItem = (props: PositionListItemProps) => {
	const { children, shipPosition } = props;



	return (
		<tr key={shipPosition.id} className={styles.item}>
			<td>{children}</td>
			<td>{shipPosition.latitude}</td>
			<td>{shipPosition.longitude}</td>
			<td>{shipPosition.course}<sup>o</sup></td>
			<td>{dayjs(shipPosition.latestTime * 1000).format('HH:mm D MMM YYYY')}</td>
			<td><DeleteIcon /></td>
		</tr>
	)
}
