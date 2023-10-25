'use client'
import React from 'react'
import styles from './MapRightSide.module.scss';
import { MapRightSideProps } from './MapRightSide.props';
import { ShipListItem } from '../ShipListItem/ShipListItem';
import usePositionStore from '@/redux/position/position.hook';
import { checkOldPosition } from '@/helpers/check-old-position.helper';
import { FilterBlock } from '../FilterBlock/FilterBlock';
import useOptionsStore from '@/redux/options/options.hook';
//===========================================================================================================

export default function MapRightSide(props: MapRightSideProps) {
	const { positionsDataStore } = usePositionStore();
	const { filter, sort } = useOptionsStore();

	return (
		<div className={styles.mapRightSide}>
			<FilterBlock />
			<ul className={styles.shipList}>
				{positionsDataStore.length > 0 && positionsDataStore
					.filter((obj) => {
						if (filter.byTime !== 'all') {
							return checkOldPosition(obj.latestTime, filter) && obj
						}
						return obj
					})
					.filter((obj) => filter.byType.includes(obj.ship.type))
					.toSorted((a, b) => {
						const nameA = a.ship.acronym.toLowerCase();
						const nameB = b.ship.acronym.toUpperCase();
						const oldA = Number(a.latestTime);
						const oldB = Number(b.latestTime);

						if (sort === 'oldest') {
							return oldA - oldB;
						} else if (sort === 'namesUp') {
							if (nameA < nameB) return -1;
							if (nameA > nameB) return 1;
							return 0;
						} else {
							if (nameA > nameB) return -1;
							if (nameA < nameB) return 1;
							return 0;
						}
					})
					.reverse()
					.map((obj) =>
						<ShipListItem
							key={obj.ship.mmsi}
							shipItem={obj}
						/>
					)}
			</ul>
		</div>
	)
}