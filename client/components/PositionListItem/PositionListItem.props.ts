import { IPosition } from "@/interfaces/Position.interface";
import { DetailedHTMLProps, HTMLAttributes } from "react";
//===========================================================================================================

export interface PositionListItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement> {
	shipPosition: IPosition
}
