import React from 'react';
import styles from './Button.module.scss';
import { ButtonProps } from './Button.props';
//=========================================================================================================================

export const Button = (props: ButtonProps) => {
	const { text, wide, className, ...rest } = props;

	return (
		<button
			className={`${styles.button} ${wide ? styles.wide : ''}`}
			{...rest}
		>
			{text}
		</button>

	)
}
