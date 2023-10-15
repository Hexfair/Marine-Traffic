import { IsNumber, IsString } from "class-validator";

export class CreatePositionDto {
	@IsNumber()
	mmsi: number;

	@IsString()
	latitude: string;

	@IsString()
	longitude: string;

	@IsNumber()
	course: number;

	@IsNumber()
	latestTime: number;
}
