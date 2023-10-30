import React from 'react';
import styles from './Modal.module.scss';
import Modal from 'react-modal';
import useModalStore from '@/redux/modal/modal.hook';
import { Button } from '../Button/Button';
import { IShipMainData } from '@/interfaces/Ship.interface';
//=========================================================================================================================

export const ModalItem = () => {
	const { isOpen, isEdit, ships, setUpdateModalStatus, setUpdateModalShips } = useModalStore();
	const [id, setId] = React.useState<string>('');
	const [mmsi, setMMSI] = React.useState<string>('');
	const [name, setName] = React.useState<string>('');
	const [base, setBase] = React.useState<string>('');
	const [acronym, setAcronym] = React.useState<string>('');
	const [type, setType] = React.useState<string>('');

	const inputRef = React.useRef<HTMLInputElement>(null);

	React.useEffect(() => {
		const fetchData = async () => {
			const data = await fetch(`http://localhost:4001/api/ship`);
			const result: IShipMainData[] = await data.json();
			setUpdateModalShips(result);
		}
		fetchData()
	}, [ships]);


	const onModalClose = () => {
		setUpdateModalStatus({ isEdit: false, isOpen: false });
	}

	const setShipState = (ship: IShipMainData) => {
		setId(String(ship.id));
		setMMSI(String(ship.mmsi));
		setName(ship.name);
		setBase(ship.base);
		setAcronym(ship.acronym);
		setType(ship.type);
	}

	const onButtonForm = () => {
		inputRef && inputRef.current && inputRef.current.click();
	}

	const onSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (isNaN(Number(mmsi))) {
			alert('Неверный формат MMSI');
			return
		}

		const sendData = { mmsi: Number(mmsi), name, base, acronym, type };

		const response = isEdit
			? await fetch(`http://localhost:4001/api/ship`,
				{
					method: 'PATCH',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						"Access-Control-Allow-Origin": "*",
						'Access-Control-Allow-Methods': 'PATCH',
					},
					body: JSON.stringify({ ...sendData, id: Number(id), }),
				})
			: await fetch(`http://localhost:4001/api/ship`,
				{
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						"Access-Control-Allow-Origin": "*",
					},
					body: JSON.stringify(sendData),
				})

		if (response.status === 200 || response.status === 201) {
			alert(`${isEdit ? 'Данные успешно обновлены! Обновите страницу' : 'Новый корабль успешно сохранен в базу!'}`);
			setUpdateModalStatus({ isEdit: false, isOpen: false });
		} else {
			alert('Ошибка при обновлении данных. Возможно такой MMSI уже существует в базе данных');
		}
	}

	if (isEdit && ships.length === 0) {
		return <div>LOADINGGGGGGGGGGGG</div>
	}

	return (
		<Modal
			isOpen={isOpen}
			className={styles.modal}
			overlayClassName={styles.overlay}
			ariaHideApp={false}
		>
			<h2 className={styles.title}>{isEdit ? 'Changing ship data' : 'Adding a new ship'}</h2>
			<div className={styles.content}>
				<form onSubmit={onSubmitForm} className={styles.form} id="form">
					<label className={styles.label}>
						<span className={styles.span}>mmsi</span>
						<input
							name='mmsi'
							type='text'
							value={mmsi}
							onChange={(e) => setMMSI(e.target.value)}
							className={styles.input}
							placeholder={isEdit ? '' : 'e.g. 368926463'}
						/>
					</label>
					<label className={styles.label}>
						<span className={styles.span}>name</span>
						<input
							name='name'
							type='text'
							value={name}
							onChange={(e) => setName(e.target.value)}
							className={styles.input}
							placeholder={isEdit ? '' : 'e.g. USS Delaware'}
						/>

					</label>
					<label className={styles.label}>
						<span className={styles.span}>base</span>
						<input
							name='base'
							type='text'
							value={base}
							onChange={(e) => setBase(e.target.value)}
							className={styles.input}
							placeholder={isEdit ? '' : 'e.g. Groton, Connecticut'}
						/>
					</label>
					<label className={styles.label}>
						<span className={styles.span}>acronym</span>
						<input
							name='acronym'
							type='text'
							value={acronym}
							onChange={(e) => setAcronym(e.target.value)}
							className={styles.input}
							placeholder={isEdit ? '' : 'e.g. SSN 791'}
						/>
					</label>
					<label className={styles.label}>
						<span className={styles.span}>type</span>
						<input
							name='type'
							type='text'
							value={type}
							onChange={(e) => setType(e.target.value)}
							className={styles.input}
							placeholder={isEdit ? '' : 'e.g. Attack Submarines'}
						/>
					</label>
					<input type='submit' ref={inputRef} hidden />
				</form>
				{isEdit && <div className={styles.shipsList}>
					{ships.length > 0 && ships.map(obj =>
						<p
							onClick={() => setShipState(obj)}
							key={obj.id}
							className={`${styles.shipLabel} ${Number(id) === obj.id ? styles.active : ''}`}
						>{`(${obj.acronym}) ${obj.name}`}</p>
					)}
				</div>}
			</div>
			<div className={styles.buttons}>
				<Button text='Save' onClick={onButtonForm} />
				<Button text='Close' onClick={onModalClose} />
			</div>
		</Modal>
	)
}

/*
	id: number,
	mmsi: number,
	name: string,
	base: string,
	acronym: string,
	type: FiltersByType,
*/
