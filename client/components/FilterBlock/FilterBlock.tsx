'use client'
import React from 'react';
import styles from './FilterBlock.module.scss';
import PlusIcon from '@/public/Icons/plus.svg';
import MinusIcon from '@/public/Icons/minus.svg';
import { FilterButton } from '../FilterButton/FilterButton';
import { FILTER_BY_TIME, FILTER_BY_TYPE, SORT } from './FilterBlock.constants';
import useOptionsStore from '@/redux/options/options.hook';
import { FiltersByTime, FiltersByType, SortType } from './FilterBlock.interfaces';
import { Checkbox } from '../FilterCheckbox/Checkbox';
//=========================================================================================================================


export const FilterBlock = () => {
	const [isOpenFilter, setIsOpenFilter] = React.useState<boolean>(false);
	const { filter, sort, setFilterByTime, setFilterByType, setSort } = useOptionsStore();

	const buttonRef = React.useRef<HTMLButtonElement>(null);
	const checkboxRef = React.useRef<HTMLInputElement>(null);

	const updateFilterByTime = (value: FiltersByTime) => {
		setFilterByTime(value);
	}

	const updateFilterByType = (value: FiltersByType) => {
		let newFilter: FiltersByType[] = filter.byType.includes(value)
			? [...filter.byType].filter(obj => obj !== value)
			: [...filter.byType, value];
		setFilterByType(newFilter);
	}

	const updateSort = (value: SortType) => {
		if (sort === 'namesUp' && value === 'names') {
			setSort('namesDown');
		}

		if (sort === 'namesDown' && value === 'names') {
			setSort('namesUp');
		}

		if (sort === 'oldest' && value === 'names') {
			setSort('namesUp');
		}

		if (value === 'oldest') {
			setSort('oldest')
		}
	}

	const setClassNameFunc = (value: SortType) => {
		if (sort === 'oldest' && value === 'oldest') {
			return styles.activeFilter;
		}

		if (sort.includes('names') && value === 'names') {
			return styles.activeFilter;
		}

		return ''
	}

	return (
		<div className={styles.filterBlock}>
			<div className={styles.topBlock}>
				<p className={styles.title}>WarShips Positions:</p>
				<button className={styles.controls} onClick={() => setIsOpenFilter(!isOpenFilter)}>
					<span className={styles.icon}>{isOpenFilter ? <MinusIcon /> : <PlusIcon />}</span>
					<span className={styles.text}>Filters</span>
				</button>
			</div>
			<div className={`${styles.filters} ${isOpenFilter && styles.active}`}>
				<p className={styles.filterTextOption}>Sort by:</p>
				<div className={styles.byOther}>
					{SORT.map((obj) =>
						<FilterButton
							key={obj.text}
							icon={obj.icon}
							text={obj.text}
							onClick={() => updateSort(obj.param)}
							className={setClassNameFunc(obj.param)}
							ref={buttonRef}
							isWide />)}
				</div>
				<hr className={styles.divider} />
				<p className={styles.filterTextOption}>Filter by time:</p>
				<div className={styles.byTime}>
					{FILTER_BY_TIME.map((obj) =>
						<FilterButton
							key={obj.text}
							icon={obj.icon}
							text={obj.text}
							onClick={() => updateFilterByTime(obj.param)}
							className={filter.byTime === obj.param ? styles.activeFilter : ''}
							ref={buttonRef}
						/>)}
				</div>
				<p className={styles.filterTextOption}>Filter by type:</p>
				<div className={styles.byType}>
					{FILTER_BY_TYPE.sort().map((obj) =>
						<Checkbox
							key={obj}
							label={obj}
							onChange={() => updateFilterByType(obj)}
							isChecked={filter.byType.includes(obj)}
							ref={checkboxRef}
						/>)}
				</div>

			</div>
		</div >
	)
}
