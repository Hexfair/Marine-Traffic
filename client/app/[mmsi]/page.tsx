'use client'
import React from 'react';
import styles from './page.module.scss'
import useShipStore from '@/redux/ship/ship.hook';
import MapLeaflet from '@/components/MapLeaflet/MapLeaflet';
import { IShip } from '@/interfaces/Ship.interface';
import ShipPageRightSide from '@/components/ShipPageRightSide/ShipPageRightSide';
import useOptionsStore from '@/redux/options/options.hook';
import useMapsStore from '@/redux/maps/maps.hook';
import ElemSpinner from '@/components/ElemSpinner/ElemSpinner';
//===========================================================================================================

export default function ShipPage({ params }: { params: { mmsi: string } }) {
	const { shipFullStore, setShipFullData } = useShipStore();
	const { setPositionFilterByChecked } = useOptionsStore();
	const { updateMapsCenter } = useMapsStore();


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

			const initialCheckPosition = result.positions[0].id
			setPositionFilterByChecked([initialCheckPosition]);

			const mapInitialCenterCoord = {
				lat: result.positions[0].latitude,
				lng: result.positions[0].longitude,
			}
			updateMapsCenter(mapInitialCenterCoord);
		}
		fetchData();
	}, [])

	if (shipFullStore === null) {
		return <ElemSpinner />
	}

	return (
		<div className={styles.page}>
			<MapLeaflet viewDataPositions={shipFullStore.positions} />
			<ShipPageRightSide shipData={shipFullStore} />
		</div>
	)
}
