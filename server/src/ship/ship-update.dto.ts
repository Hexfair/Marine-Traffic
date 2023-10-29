import { IsNumber, IsString } from "class-validator";

export class UpdateShipDto {
	@IsNumber()
	id: number;

	@IsNumber()
	mmsi: number;

	@IsString()
	name: string;

	@IsString()
	base: string;

	@IsString()
	acronym: string;

	@IsString()
	type: string;
}
