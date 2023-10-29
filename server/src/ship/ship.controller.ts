import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShipService } from './ship.service';
import { CreateShipDto } from './ship-create.dto';
import { UpdateShipDto } from './ship-update.dto';
//===========================================================================================================

@Controller('ship')
export class ShipController {
	constructor(private readonly shipService: ShipService) { }

	@Post()
	create(@Body() createShipDto: CreateShipDto) {
		return this.shipService.create(createShipDto);
	}

	@Post(':mmsi')
	findOneWithPagination(@Param('mmsi') mmsi: string, @Body() page: number) {
		return this.shipService.findOneWithPagination(Number(mmsi), page);
	}

	@Patch()
	update(@Body() updateShipDto: UpdateShipDto) {
		return this.shipService.update(updateShipDto);
	}

	// @Delete(':id')
	// remove(@Param('id') id: string) {
	// 	return this.shipService.remove(+id);
	// }
}
