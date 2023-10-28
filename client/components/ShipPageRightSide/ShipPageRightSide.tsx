'use client'
import React from 'react'
import styles from './ShipPageRightSide.module.scss';
import { ShipPageRightSideProps } from './ShipPageRightSide.props';
import { PositionListItem } from '../PositionListItem/PositionListItem';
import { Checkbox } from '../Checkbox/Checkbox';
import useOptionsStore from '@/redux/options/options.hook';
import { DatePicker } from '../Datepicker/Datepicker';
//===========================================================================================================

export default function HomePageRightSide(props: ShipPageRightSideProps) {
	const { shipData } = props;
	const checkboxRef = React.useRef<HTMLInputElement>(null);
	const { positionFilter, setPositionFilterByChecked } = useOptionsStore();

	const updatePositionFilterByChecked = (value: number) => {
		let newFilter: number[] = positionFilter.byChecked.includes(value)
			? [...positionFilter.byChecked].filter(obj => obj !== value)
			: [...positionFilter.byChecked, value];
		setPositionFilterByChecked(newFilter);
	}

	if (shipData === null) {
		return null
	}

	return (
		<div className={styles.mapRightSide}>
			<details>
				<summary className={styles.summary}>{`${shipData.name} (${shipData.acronym})`}</summary>
				<p className={styles.label}>{`type: ${shipData.type}`}</p>
				<p className={styles.label}>{`mmsi: ${shipData.mmsi}`}</p>
				<p className={styles.label} >{`base: ${shipData.base}`}</p>
			</details>
			<DatePicker />
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
					{shipData.positions.map(obj =>
						<PositionListItem
							key={obj.id}
							shipPosition={obj}
						>
							<Checkbox
								onChange={() => updatePositionFilterByChecked(obj.id)}
								isChecked={positionFilter.byChecked.includes(obj.id)}
								ref={checkboxRef}
								small />
						</PositionListItem >)}
				</tbody>
			</table>
		</div>
	)
}