'use client'
import React from 'react';
import styles from './ShipListItem.module.scss';
import { ShipListItemProps } from './ShipListItem.props';
import FalseReadedIcon from '@/public/Icons/isReaded-false.svg';
import TrueReadedIcon from '@/public/Icons/isReaded-true.svg';
import ShipTargetIcon from '@/public/Icons/ship-target.svg';
import socket from '@/configs/socket';
import usePositionStore from '@/redux/position/position.hook';
import useMapsStore from '@/redux/maps/maps.hook';
import { ICoordinate } from '../MapLeaflet/MapLeaflet.interface';
//===========================================================================================================

export const ShipListItem = (props: ShipListItemProps) => {
	const { shipItem } = props;
	const { updateStatusPosition } = usePositionStore();
	const { updateMapsCenter } = useMapsStore();

	const onChangeStatus = () => {
		socket.emit("CLIENT:readed-position", { id: shipItem.ship.id });
	};

	const updateMapCenter = (value: ICoordinate) => {
		updateMapsCenter(value);
	}

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
			<div className={styles.names}>{`(${shipItem.ship.acronym}) ${shipItem.ship.name}`}</div>
			<div className={styles.type}>{shipItem.ship.type}</div>
			<div className={styles.options}>
				<button className={styles.buttonReaded} onClick={onChangeStatus}>
					{shipItem.isReaded ? <TrueReadedIcon /> : <FalseReadedIcon />}
				</button>
				<button className={styles.buttonShipTarget} onClick={() => updateMapCenter({ lat: shipItem.latitude, lng: shipItem.longitude })}
				>
					<ShipTargetIcon />
				</button>
			</div>
		</li>
	)
}