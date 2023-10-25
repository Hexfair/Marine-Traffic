export type FiltersByTime = 'day' | 'week' | 'month' | 'all';
export type FiltersByType = 'Submarine Tenders' | 'Guided Missile Cruisers' | 'Aircraft Carriers'
	| 'Guided Missile Destroyers' | 'Expeditionary Sea Base' | 'Amphibious Command Ships'
	| 'Littoral Combat Ships' | 'Amphibious Assault Ships' | 'Amphibious Transport Dock' | 'Dock Landing Ships'
	| 'Mine Countermeasures Ships' | 'Ballistic Missile Submarines' | 'Guided Missile Submarines'
	| 'Attack Submarines' | 'Saildrone Voyager'

export type SortType = 'oldest' | 'names';

export interface IFilterByTime {
	text: string,
	icon: React.ReactNode,
	param: FiltersByTime
}

export interface ISort {
	text: string,
	icon: React.ReactNode,
	param: SortType
}