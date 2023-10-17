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
	const { updateStatusPosition, positionsDataStore } = usePosition();

	const sendFirstMessage = (id: number) => {
		console.log(id)
		socket.emit("CLIENT:readed-position", { id });
	};

	React.useEffect(() => {
		// Обновление статуса (прочитано)
		const updateReadedPosition = (value: number) => { console.log(value); updateStatusPosition(value) };

		socket.on('SERVER:readed-position', updateReadedPosition);

		return () => {
			socket.off('SERVER:readed-position', updateReadedPosition);
		};
	}, [shipItem.isReaded]);

	return (
		<li
			key={shipItem.ship.mmsi}
			className={`${styles.item} ${!shipItem.isReaded && styles.newRecord}`}
		>
			<div className={styles.names}>{`${shipItem.ship.name} (${shipItem.ship.acronym})`} </div>
			<div className={styles.type}>{shipItem.ship.type}</div>
			<div className={styles.position} onClick={() => sendFirstMessage(shipItem.ship.id)}>
				{shipItem.isReaded ? <TrueReadedIcon /> : <FalseReadedIcon />}
			</div>
		</li>
	)
}