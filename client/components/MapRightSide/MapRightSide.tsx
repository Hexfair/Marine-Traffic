import React from 'react'
import styles from './MapRightSide.module.scss'
import { MapRightSideProps } from './MapRightSide.props';
//===========================================================================================================

export default function MapRightSide(props: MapRightSideProps) {
	const { positions } = props;

	return (
		<div className={styles.mapRightSide}>
			<ul>
				{positions
					.sort((a, b) => {
						const nameA = a.ship.acronym.toLowerCase();
						const nameB = b.ship.acronym.toUpperCase();
						if (nameA < nameB) return -1;
						if (nameA > nameB) return 1;
						return 0;
					})
					.reverse()
					.map((obj) =>
						<div
							key={obj.ship.mmsi}
							className={`${styles.shipItem} ${!obj.isReaded && styles.newRecord}`}
						>
							<span>{obj.ship.acronym}</span>
							<span>{obj.ship.name}</span>
						</div>
					)}
			</ul>
		</div>
	)
}