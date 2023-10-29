import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
//===========================================================================================================

export interface ButtonProps extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	text: string;
	wide?: boolean;
	type?: "button" | "reset" | "submit" | undefined;
}
