'use client'
import React from 'react'
import styles from './MapRightSide.module.scss'
import { MapRightSideProps } from './MapRightSide.props';
import ShipListItem from '../ShipListItem/ShipListItem';
import usePosition from '@/redux/position/position.hook';
//===========================================================================================================

export default function MapRightSide(props: MapRightSideProps) {
	const { positions } = props;

	return (
		<div className={styles.mapRightSide}>
			<ul>
				{positions
					.sort((a, b) => {
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