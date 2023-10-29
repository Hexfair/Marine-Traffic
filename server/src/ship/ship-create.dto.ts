import { IsNumber, IsString } from "class-validator";

export class CreateShipDto {
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
