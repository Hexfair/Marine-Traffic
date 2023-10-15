import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShipService } from './ship.service';
//===========================================================================================================

@Controller('ship')
export class ShipController {
	constructor(private readonly shipService: ShipService) { }

	// @Post()
	// create(@Body() createShipDto: CreateShipDto) {
	// 	return this.shipService.create(createShipDto);
	// }

	@Get()
	findAll() {
		return this.shipService.findAll();
	}

	@Post(':mmsi')
	findOneWithPagination(@Param('mmsi') mmsi: string, @Body() page: number) {
		return this.shipService.findOneWithPagination(Number(mmsi), page);
	}

	// @Get(':mmsi')
	// findOneWithPagination(@Param('mmsi') mmsi: string) {
	// 	return this.shipService.findOneWithPagination(Number(mmsi));
	// }

	// @Patch(':id')
	// update(@Param('id') id: string, @Body() updateShipDto: UpdateShipDto) {
	// 	return this.shipService.update(+id, updateShipDto);
	// }

	// @Delete(':id')
	// remove(@Param('id') id: string) {
	// 	return this.shipService.remove(+id);
	// }
}
