import { Injectable } from '@nestjs/common';
import { CreateShipDto } from './dto/create-ship.dto';
import { UpdateShipDto } from './dto/update-ship.dto';
import { Timeout } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Ship } from './entities/ship.entity';
import { Repository } from 'typeorm';



@Injectable()
export class ShipService {
	constructor(
		@InjectRepository(Ship) private readonly shipRepository: Repository<Ship>,
	) { }


	create(createShipDto: CreateShipDto) {
		return 'This action adds a new ship';
	}

	findAll() {
		return `This action returns all ship`;
	}

	async findOnebyMMSI(mmsi: number) {
		return await this.shipRepository.findOne({
			where: { mmsi },
		});
	}

	update(id: number, updateShipDto: UpdateShipDto) {
		return `This action updates a #${id} ship`;
	}

	remove(id: number) {
		return `This action removes a #${id} ship`;
	}
}
