import React from 'react';
import styles from './FilterItem.module.scss';
import { FilterItemProps } from './FilterItem.props';
import MinusIcon from '@/public/Icons/minus.svg';
//=========================================================================================================================

export const FilterItem = React.forwardRef((props: FilterItemProps, ref: React.Ref<HTMLButtonElement>) => {
	const { icon, text, isWide, className, ...rest } = props;
	const [isOpenFilter, setIsOpenFilter] = React.useState<boolean>(false);

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
