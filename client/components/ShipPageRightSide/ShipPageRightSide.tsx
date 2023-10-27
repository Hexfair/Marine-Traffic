'use client'
import React from 'react'
import styles from './ShipPageRightSide.module.scss';
import { ShipPageRightSideProps } from './ShipPageRightSide.props';
import { PositionListItem } from '../PositionListItem/PositionListItem';
//===========================================================================================================

export default function HomePageRightSide(props: ShipPageRightSideProps) {
	const { shipData, positionsData } = props;

	const updateFilterByType = (value: FiltersByType) => {
		let newFilter: FiltersByType[] = filter.byType.includes(value)
			? [...filter.byType].filter(obj => obj !== value)
			: [...filter.byType, value];
		setFilterByType(newFilter);
	}


	if (shipData === null || positionsData === null) {
		return null
	}

	return (
		<div className={styles.mapRightSide}>
			<details>
				<summary>{`${shipData.name} (${shipData.acronym})`}</summary>
				<p>{`type: ${shipData.type}`}</p>
				<p>{`mmsi: ${shipData.mmsi}`}</p>
				<p>{`base: ${shipData.base}`}</p>
			</details>
			<table className={styles.shipList}>
				<thead className={styles.tableHead}>
					<tr>
						<th>View</th>
						<th>Latitude</th>
						<th>Longitude</th>
						<th>Course</th>
						<th>Date & time</th>
						<th>Options</th>
					</tr>
				</thead>
				<tbody className={styles.tableBody}>
					{positionsData.map(obj =>
						<PositionListItem
							key={obj.id}
							shipPosition={obj}
							onChange={() => updateStatusPosition(obj)} />)}
				</tbody>
			</table>
		</div>
	)
}