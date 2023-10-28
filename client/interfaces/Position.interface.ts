import { IShip } from "./Ship.interface";
//===========================================================================================================

export interface IPosition {
	id: number,
	latitude: number,
	longitude: number,
	course: number,
	isReaded: boolean,
	latestTime: Date,
	createdAt: Date,
	ship: IShip,
}
