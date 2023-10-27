import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
//===========================================================================================================

export interface CheckboxProps extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	label?: string;
	isChecked: boolean;
	small?: boolean;
}
