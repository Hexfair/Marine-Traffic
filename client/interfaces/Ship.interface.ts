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

// export interface IRecenter extends ICoordinate {
// 	coords: ICoordinate[];
// 	setMapCenter: React.Dispatch<React.SetStateAction<ICoordinate>>
// }

// export type SideTypes = 'N' | 'S' | 'W' | 'E';
/*
{
		"id": 2,
		"latitude": "13.37238",
		"longitude": "144.5198",
		"course": 222,
		"isReaded": false,
		"latestTime": 1684661100,
		"createdAt": "2023-10-14T19:38:01.848Z",
		"ship": {
			"id": 1,
			"mmsi": 338808000,
			"name": "USS Emory S. Land",
			"base": "Apra Harbor, Guam",
			"acronym": "AS 39",
			"type": "Submarine Tenders",
			"createdAt": "2023-10-14T19:31:26.706Z"
		}
	},
*/