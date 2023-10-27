import React from 'react';
import styles from './Checkbox.module.scss';
import { CheckboxProps } from './Checkbox.props';
//=========================================================================================================================

export const Checkbox = React.forwardRef((props: CheckboxProps, ref: React.Ref<HTMLInputElement>) => {
	const { label, isChecked, small, ...rest } = props;

	return (
		<label className={styles.checkbox}>
			<input
				type="checkbox"
				checked={isChecked}
				className={`${styles.input} ${isChecked && styles.checked} ${small && styles.small}`}
				ref={ref}
				{...rest}
			/>
			{label && <span>{label}</span>}
		</label>
	)
})
