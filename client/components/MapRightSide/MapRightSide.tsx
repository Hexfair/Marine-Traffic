'use client'
import React from 'react'
import styles from './MapRightSide.module.scss'
import { MapRightSideProps } from './MapRightSide.props';
import ShipListItem from '../ShipListItem/ShipListItem';
import usePosition from '@/redux/position/position.hook';
import socket from '@/configs/socket';
import { checkOldPosition } from '@/helpers/check-old-position.helper';
//===========================================================================================================

export default function MapRightSide(props: MapRightSideProps) {
	const { positionsDataStore, setStatusDateSorted, isDateSorted } = usePosition();

	const handleChange = () => {
		setStatusDateSorted(!isDateSorted);
	};

	return (
		<div className={styles.mapRightSide}>
			<label>
				<input
					type="checkbox"
					checked={isDateSorted}
					onChange={handleChange}
				/>
				last 1 day
			</label>
			<ul>
				{positionsDataStore.length > 0 && positionsDataStore
					.filter((obj) => {
						if (isDateSorted) {
							return checkOldPosition(obj.latestTime) && obj
						} else {
							return obj
						}
					})
					.toSorted((a, b) => {
						const nameA = a.ship.acronym.toLowerCase();
						const nameB = b.ship.acronym.toUpperCase();
						if (nameA < nameB) return -1;
						if (nameA > nameB) return 1;
						return 0;
					})
					.reverse()
					.map((obj) => <ShipListItem key={obj.ship.mmsi} shipItem={obj} />)}
			</ul>
		</div>
	)
}