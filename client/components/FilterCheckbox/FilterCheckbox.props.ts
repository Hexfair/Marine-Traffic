import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
//===========================================================================================================

export interface FilterCheckboxProps extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	label: string;
	isChecked: boolean
}
