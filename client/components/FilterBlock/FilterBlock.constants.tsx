import DayFilterIcon from '@/public/Icons/filters/day-filter.svg';
import WeekFilterIcon from '@/public/Icons/filters/week-filter.svg';
import MonthFilterIcon from '@/public/Icons/filters/month-filter.svg';
import AllFilterIcon from '@/public/Icons/filters/all-filter.svg';
import NewFilterIcon from '@/public/Icons/filters/new-filter.svg';
import AlphabetFilterIcon from '@/public/Icons/filters/alphabet-filter.svg';
import { FiltersByType, IFilterByTime, ISort } from './FilterBlock.interfaces';
//=========================================================================================================================


export const FILTER_BY_TIME: IFilterByTime[] = [
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

export const FILTER_BY_TYPE: FiltersByType[] = ['Submarine Tenders', 'Guided Missile Cruisers', 'Aircraft Carriers',
	'Guided Missile Destroyers', 'Expeditionary Sea Base', 'Amphibious Command Ships',
	'Littoral Combat Ships', 'Amphibious Assault Ships', 'Amphibious Transport Dock', 'Dock Landing Ships',
	'Mine Countermeasures Ships', 'Ballistic Missile Submarines', 'Guided Missile Submarines', 'Attack Submarines', 'Saildrone Voyager', 'Offshore Supply Ship']

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