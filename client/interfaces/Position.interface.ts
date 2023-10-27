import { IShip } from "./Ship.interface";
//===========================================================================================================

export interface IPosition {
	id: number,
	latitude: number,
	longitude: number,
	course: number,
	isReaded: boolean,
	latestTime: number,
	createdAt: Date,
	ship: IShip,
}
