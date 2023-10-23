import DayFilterIcon from '@/public/Icons/filters/day-filter.svg';
import WeekFilterIcon from '@/public/Icons/filters/week-filter.svg';
import MonthFilterIcon from '@/public/Icons/filters/month-filter.svg';
import AllFilterIcon from '@/public/Icons/filters/all-filter.svg';
import NewFilterIcon from '@/public/Icons/filters/new-filter.svg';
import AlphabetFilterIcon from '@/public/Icons/filters/alphabet-filter.svg';
import { FilterType, SortType } from './FilterBlock.interfaces';
//=========================================================================================================================

export interface IFilter {
	text: string,
	icon: React.ReactNode,
	param: FilterType
}

export interface ISort {
	text: string,
	icon: React.ReactNode,
	param: SortType
}

export const FILTER: IFilter[] = [
	{
		text: '1 day',
		icon: <DayFilterIcon />,
		param: 'day'
	},
	{
		text: '1 week',
		icon: <WeekFilterIcon />,
		param: 'week'
	},
	{
		text: '1 month',
		icon: <MonthFilterIcon />,
		param: 'month'
	},
	{
		text: 'all time',
		icon: <AllFilterIcon />,
		param: 'all'
	}
]

export const SORT: ISort[] = [
	{
		text: 'new positions',
		icon: <NewFilterIcon />,
		param: 'oldest'
	},
	{
		text: 'names ships',
		icon: <AlphabetFilterIcon />,
		param: 'names'
	},
]