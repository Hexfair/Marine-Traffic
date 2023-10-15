import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ship } from './ship.entity';
import { Repository } from 'typeorm';
//===========================================================================================================


@Injectable()
export class ShipService {
	constructor(
		@InjectRepository(Ship) private readonly shipRepository: Repository<Ship>,
	) { }


	async findAll() {
		return await this.shipRepository.find();
	}

	async findOneWithPagination(mmsi: number, page: number) {
		const ship = await this.shipRepository.findOne({
			relations: { positions: true },
			where: { mmsi },
		});
		const { positions, ...shipData } = ship;
		positions.sort((a, b) => b.latestTime - a.latestTime).slice((page - 1) * 10, page * 10);
		return { ...shipData, positions };
	}

	async findOnebyMMSI(mmsi: number) {
		return await this.shipRepository.findOne({
			where: { mmsi },
		});
	}

	// update(id: number, updateShipDto: UpdateShipDto) {
	// 	return `This action updates a #${id} ship`;
	// }

	// remove(id: number) {
	// 	return `This action removes a #${id} ship`;
	// }
}
