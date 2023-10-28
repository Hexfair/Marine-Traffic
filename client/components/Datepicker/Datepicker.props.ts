import { DetailedHTMLProps, Dispatch, HTMLAttributes, ReactNode, SetStateAction } from 'react';
//===========================================================================================================

export interface DatePickerProps {
	dateRange: Date[];
	setDateRange: Dispatch<SetStateAction<Date[]>>;
}
