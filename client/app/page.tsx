'use client'
import React from 'react';
import styles from './page.module.scss'
import dynamic from 'next/dynamic';
import { IPosition } from '@/interfaces/Position.interface';
import HomePageRightSide from '@/components/HomePageRightSide/HomePageRightSide';
import usePositionStore from '@/redux/position/position.hook';
import socket from '@/configs/socket';
const MapLeaflet = dynamic(() => import("@/components/MapLeaflet/MapLeaflet"), { ssr: false });
//===========================================================================================================

export default function Home() {
	const { positionsDataStore, setInitialPositions } = usePositionStore();

	React.useEffect(() => {
		const fetchData = async () => {
			const data = await fetch(`http://localhost:4001/api/position`);
			const result: IPosition[] = await data.json();
			setInitialPositions(result);
		}
		fetchData();
	}, []);

	React.useEffect(() => {
		socket.connect();
		return () => { socket.disconnect() };
	}, []);

	if (positionsDataStore.length === 0) {
		return <p>LOADING</p>
	};

	return (
		<main className={styles.main}>
			<MapLeaflet viewDataShips={positionsDataStore} />
			<HomePageRightSide />
		</main>
	)
}
