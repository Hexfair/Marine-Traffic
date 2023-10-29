'use client'
import React from 'react'
import styles from './ShipPageRightSide.module.scss';
import { ShipPageRightSideProps } from './ShipPageRightSide.props';
import { PositionListItem } from '../PositionListItem/PositionListItem';
import { Checkbox } from '../Checkbox/Checkbox';
import useOptionsStore from '@/redux/options/options.hook';
import { DatePicker } from '../Datepicker/Datepicker';
import { setInitialDates } from '@/helpers/set-initial-dates';
import socket from '@/configs/socket';
import { IPosition } from '@/interfaces/Position.interface';
import useShipStore from '@/redux/ship/ship.hook';
import { Button } from '../Button/Button';
//===========================================================================================================

export default function HomePageRightSide(props: ShipPageRightSideProps) {
	const { shipData } = props;

	const [dateRange, setDateRange] = React.useState<Date[]>(setInitialDates());

	const checkboxRef = React.useRef<HTMLInputElement>(null);
	const { positionFilter, setPositionFilterByChecked } = useOptionsStore();
	const { updatePositionsByDate } = useShipStore();

	const updatePositionFilterByChecked = (value: number) => {
		let newFilter: number[] = positionFilter.byChecked.includes(value)
			? [...positionFilter.byChecked].filter(obj => obj !== value)
			: [...positionFilter.byChecked, value];
		setPositionFilterByChecked(newFilter);
	}

	const getPositionsByDates = () => {

		socket.emit("CLIENT:get-positions-date", { mmsi: shipData.mmsi, dates: dateRange });
	};

	React.useEffect(() => {
		// Обновление статуса (прочитано)
		const serverShipPositionsByDate = (value: IPosition[] | null) => updatePositionsByDate(value);
		socket.on('SERVER:get-positions-date', serverShipPositionsByDate);

		return () => {
			socket.off('SERVER:get-positions-date', serverShipPositionsByDate);
		};
	}, [shipData]);


	if (shipData === null) {
		return null
	}

	return (
		<div className={styles.mapRightSide}>
			<details className={styles.details}>
				<summary className={styles.summary}>{`${shipData.name} (${shipData.acronym})`}</summary>
				<p className={styles.label}>{`type: ${shipData.type}`}</p>
				<p className={styles.label}>{`mmsi: ${shipData.mmsi}`}</p>
				<p className={styles.label} >{`base: ${shipData.base}`}</p>
			</details>
			<div className={styles.dateOptions}>
				<DatePicker dateRange={dateRange} setDateRange={setDateRange} />
				<Button text='Set Date' onClick={getPositionsByDates} />
			</div>
			<hr className={styles.divider} />
			<table className={styles.shipList}>
				<thead className={styles.tableHead}>
					<tr>
						<th>View</th>
						<th>Latitude</th>
						<th>Longitude</th>
						<th>Course</th>
						<th>Date & time</th>
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