import React from 'react';
import styles from './FilterCheckbox.module.scss';
import { FilterCheckboxProps } from './FilterCheckbox.props';
//=========================================================================================================================

export const FilterCheckbox = React.forwardRef((props: FilterCheckboxProps, ref: React.Ref<HTMLInputElement>) => {
	const { label, isChecked, ...rest } = props;

	return (
		<div className={styles.checkbox}>
			<label>
				<input
					type="checkbox"
					checked={isChecked}
					className={`${styles.input} ${isChecked ? styles.checked : ''}`}
					ref={ref}
					{...rest}
				/>
				<span>{label}</span>
			</label>
		</div>
	)
})
