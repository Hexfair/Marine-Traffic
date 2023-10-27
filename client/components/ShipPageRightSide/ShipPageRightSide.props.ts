import { IPosition } from "@/interfaces/Position.interface";
import { IShip } from "@/interfaces/Ship.interface";
//===========================================================================================================

export interface ShipPageRightSideProps {
	shipData: Omit<IShip, 'positions'> | null,
	positionsData: Omit<IPosition, 'ship'>[] | null,

}
