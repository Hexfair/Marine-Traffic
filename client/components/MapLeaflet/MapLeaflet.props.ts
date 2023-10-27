import { IPosition } from "@/interfaces/Position.interface";
import { IShip } from "@/interfaces/Ship.interface";
//===========================================================================================================

export interface MapLeafletProps {
	viewDataShips?: IPosition[];
	viewDataPositions?: Omit<IPosition, "ship">[];
}
