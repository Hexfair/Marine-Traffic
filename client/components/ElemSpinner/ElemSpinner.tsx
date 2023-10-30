import React from "react";
import styles from './ElemSpinner.module.scss';
//=========================================================================================================================

export default function ElemSpinner() {
	return (
		<div className={styles.box}>
			<svg className={styles.spinner} width='40px' height='40px' x='0' y='0' viewBox='0 0 40 40'>
				<circle cx="20" cy="20" r="18"></circle>
			</svg>
		</div>
	);
}