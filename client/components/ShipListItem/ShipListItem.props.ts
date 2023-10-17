import { IPosition } from "@/interfaces/Position.interface";
import { DetailedHTMLProps, HTMLAttributes } from "react";
//===========================================================================================================

export interface ShipListItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement> {
	shipItem: IPosition
}
