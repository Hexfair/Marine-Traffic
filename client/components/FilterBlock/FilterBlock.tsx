import React from 'react';
import styles from './FilterBlock.module.scss';
import PlusIcon from '@/public/Icons/plus.svg';
import MinusIcon from '@/public/Icons/minus.svg';
import { FilterItem } from '../FilterItem/FilterItem';
import { FILTER, SORT } from './FilterBlock.constants';
import useOptionsStore from '@/redux/options/options.hook';
import { FilterType, SortType } from './FilterBlock.interfaces';

//=========================================================================================================================


export const FilterBlock = () => {
	const [isOpenFilter, setIsOpenFilter] = React.useState<boolean>(false);
	const { filter, sort, setFilter, setSort } = useOptionsStore();

	const buttonRef = React.useRef<HTMLButtonElement>(null);

	const updateFilter = (value: FilterType) => {
		setFilter(value);
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
				<div className={styles.byTime}>
					{FILTER.map((obj) =>
						<FilterItem
							key={obj.text}
							icon={obj.icon}
							text={obj.text}
							onClick={() => updateFilter(obj.param)}
							className={filter === obj.param ? styles.activeFilter : ''}
							ref={buttonRef}
						/>
					)}
				</div>
				<hr className={styles.divider} />
				<div className={styles.byOther}>
					{SORT.map((obj) =>
						<FilterItem
							key={obj.text}
							icon={obj.icon}
							text={obj.text}
							onClick={() => updateSort(obj.param)}
							className={setClassNameFunc(obj.param)}
							ref={buttonRef}
							isWide />
					)}
				</div>
			</div>
		</div >
	)
}
