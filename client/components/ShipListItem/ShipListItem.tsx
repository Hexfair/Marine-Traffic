'use client'
import React from 'react';
import styles from './ShipListItem.module.scss';
import { ShipListItemProps } from './ShipListItem.props';
import FalseReadedIcon from '@/public/Icons/isReaded-false.svg';
import TrueReadedIcon from '@/public/Icons/isReaded-true.svg';
import socket from '@/configs/socket';
import usePosition from '@/redux/position/position.hook';
//===========================================================================================================

export default function ShipListItem(props: ShipListItemProps) {
	const { shipItem } = props;
	const { positionsDataStore, updateStatusPosition } = usePosition();

	const onChangeStatus = () => {
		socket.emit("CLIENT:readed-position", { id: shipItem.ship.id });
	};

	React.useEffect(() => {
		// Обновление статуса (прочитано)
		const serverReadedPosition = (value: number) => value === shipItem.ship.id && updateStatusPosition(value);
		socket.on('SERVER:readed-position', serverReadedPosition);

		return () => {
			socket.off('SERVER:readed-position', serverReadedPosition);
		};
	}, []);

	return (
		<li
			key={shipItem.ship.mmsi}
			className={`${styles.item} ${!shipItem.isReaded && styles.newRecord}`}
		>
			<div className={styles.names}>{`${shipItem.ship.name} (${shipItem.ship.acronym})`}</div>
			<div className={styles.type}>{shipItem.ship.type}</div>
			<div className={styles.position}>
				<span onClick={onChangeStatus}>
					{shipItem.isReaded ? <TrueReadedIcon /> : <FalseReadedIcon />}
				</span>
			</div>
		</li>
	)
}