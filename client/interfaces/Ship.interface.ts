import { FiltersByType } from "@/components/FilterBlock/FilterBlock.interfaces";
import { IPosition } from "./Position.interface";

export interface IShip {
	id: number,
	mmsi: number,
	name: string,
	base: string,
	acronym: string,
	type: FiltersByType,
	createdAt: Date,
	positions: IPosition[]
}

export interface IShipMainData {
	id: number,
	mmsi: number,
	name: string,
	base: string,
	acronym: string,
	type: FiltersByType,
}