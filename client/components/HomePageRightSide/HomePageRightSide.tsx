'use client'
import React from 'react'
import styles from './HomePageRightSide.module.scss';
import { HomePageRightSideProps } from './HomePageRightSide.props';
import { ShipListItem } from '../ShipListItem/ShipListItem';
import usePositionStore from '@/redux/position/position.hook';
import { checkOldPosition } from '@/helpers/check-old-position.helper';
import { FilterBlock } from '../FilterBlock/FilterBlock';
import useOptionsStore from '@/redux/options/options.hook';
import socket from '@/configs/socket';
import useModalStore from '@/redux/modal/modal.hook';
import { Button } from '../Button/Button';
//===========================================================================================================

export default function HomePageRightSide(props: HomePageRightSideProps) {
	const { positionsDataStore, updateStatusAllPositions } = usePositionStore();
	const { shipFilter, sort } = useOptionsStore();
	const { setUpdateModalStatus } = useModalStore();


	const openModalForAdd = () => {
		setUpdateModalStatus({ isOpen: true, isEdit: false });
	}

	const openModalForEdit = () => {
		setUpdateModalStatus({ isOpen: true, isEdit: true });
	}

	const onChangeStatus = () => {
		socket.emit("CLIENT:readed-all-positions");
	};

	React.useEffect(() => {
		// Обновление статуса (прочитано)
		const serverReadedAllPosition = () => updateStatusAllPositions(true);
		socket.on('SERVER:readed-all-positions', serverReadedAllPosition);

		return () => {
			socket.off('SERVER:readed-all-positions', serverReadedAllPosition);
		};
	}, [positionsDataStore]);


	return (
		<div className={styles.mapRightSide}>
			<FilterBlock />
			<Button text='Readed All' onClick={onChangeStatus} />
			<ul className={styles.shipList}>
				{positionsDataStore.length > 0 && positionsDataStore
					.filter((obj) => {
						if (shipFilter.byTime !== 'all') {
							return checkOldPosition(obj.latestTime, shipFilter.byTime) && obj
						}
						return obj
					})
					.filter((obj) => shipFilter.byType.includes(obj.ship.type))
					.filter((obj) => {
						if (sort === 'oldest') {
							return !obj.isReaded
						} else {
							return obj
						}
					})
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
			<Button text='Add a new ship to the database' onClick={openModalForAdd} wide />
			<Button text='Edit ship in database' onClick={openModalForEdit} wide />
		</div>
	)
}