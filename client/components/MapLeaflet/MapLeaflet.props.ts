import { IPosition } from "@/interfaces/Position.interface";
import { IShip } from "@/interfaces/Ship.interface";
//===========================================================================================================

export interface MapLeafletProps {
	viewData: IPosition[];
	isFullShipPage?: boolean;
}
