import React from 'react';
import styles from './page.module.scss'
import dynamic from 'next/dynamic';
import { IPosition } from '@/interfaces/Position.interface';
import MapRightSide from '@/components/MapRightSide/MapRightSide';
const MapLeaflet = dynamic(() => import("@/components/MapLeaflet/MapLeaflet"), { ssr: false });
//===========================================================================================================

const getPositionsData = async (): Promise<IPosition[]> => {
	const data = await fetch(`http://localhost:4001/api/position`, { cache: "no-cache" });
	return await data.json();
};

export default async function MapPage() {
	const positions = await getPositionsData();

	return (
		<div className={styles.mapPage}>
			<MapLeaflet positions={positions} />
			<MapRightSide positions={positions} />
		</div>
	)
}
