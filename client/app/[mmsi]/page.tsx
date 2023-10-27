'use client'
import React from 'react';
import styles from './page.module.scss'
import MapRightSide from '@/components/HomePageRightSide/HomePageRightSide';
import useShipStore from '@/redux/ship/ship.hook';
import MapLeaflet from '@/components/MapLeaflet/MapLeaflet';
import { IShip } from '@/interfaces/Ship.interface';
import ShipPageRightSide from '@/components/ShipPageRightSide/ShipPageRightSide';
//===========================================================================================================

export default function ShipPage({ params }: { params: { mmsi: string } }) {
	const { positionsDataStore, shipDataStore, setShipFullData } = useShipStore();

	React.useEffect(() => {
		const fetchData = async () => {
			const data = await fetch(`http://localhost:4001/api/ship/${params.mmsi}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ page: 1 }),
				}
			);
			const result: IShip = await data.json();
			setShipFullData(result);
		}
		fetchData();
	}, [])

	if (shipDataStore === null || positionsDataStore === null) {
		return <p>LOADING</p>
	}

	return (
		<div className={styles.page}>
			<MapLeaflet viewData={positionsDataStore} isFullShipPage />
			<ShipPageRightSide shipData={shipDataStore} positionsData={positionsDataStore} />
		</div>
	)
}
