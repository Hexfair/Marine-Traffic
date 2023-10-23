import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { IPosition } from "@/interfaces/Position.interface";
import { IFilter } from '../FilterBlock/FilterBlock.constants';
//===========================================================================================================

export interface FilterItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	icon: ReactNode;
	text: string;
	isWide?: boolean;
}
