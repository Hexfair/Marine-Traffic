import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ship } from './ship/ship.entity';
import { Repository } from 'typeorm';
import { Timeout } from '@nestjs/schedule';
import { data } from './app.ship-data';
//===========================================================================================================

@Injectable()
export class AppService {

	constructor(
		@InjectRepository(Ship) private readonly shipRepository: Repository<Ship>,
	) { }

	//@Timeout(2000)
	async handleTimeout() {

		for (let item of data) {

			const shipData = {
				shipId: item.shipId,
				mmsi: item.mmsi,
				name: item.name,
				base: item.base,
				acronym: item.abbr,
				type: item.type
			}
			await this.shipRepository.save(shipData);
		}

	}
}
