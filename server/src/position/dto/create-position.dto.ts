import { IsNumber } from "class-validator";

export class CreatePositionDto {
	@IsNumber()
	mmsi: number;

	@IsNumber()
	latitude: string;

	@IsNumber()
	longitude: string;

	@IsNumber()
	course: number;

	@IsNumber()
	latestTime: number;
}
