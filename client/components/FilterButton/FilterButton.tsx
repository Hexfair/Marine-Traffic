import React from 'react';
import styles from './FilterButton.module.scss';
import { FilterItemProps } from './FilterButton.props';
//=========================================================================================================================

export const FilterButton = React.forwardRef((props: FilterItemProps, ref: React.Ref<HTMLButtonElement>) => {
	const { icon, text, isWide, className, ...rest } = props;

	return (
		<button
			className={`${styles.filterItem} ${isWide && styles.wide} ${className}`}
			ref={ref}
			{...rest}
		>
			{icon}<p>{text}</p>
		</button>
	)
})
