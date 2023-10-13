import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ship } from './ship/entities/ship.entity';
import { Repository } from 'typeorm';
import { Timeout } from '@nestjs/schedule';

const data = [
	{ mmsi: 368962000, shipName: 'USS Dwight D. Eisenhower', navalBase: 'Norfolk, Virginia', abbr: 'CVN 69' },
	{ mmsi: 368913000, shipName: 'USS George Washington', navalBase: 'Norfolk, Virginia', abbr: 'CVN 73' },
	{ mmsi: 368912000, shipName: 'USS John C. Stennis', navalBase: 'Norfolk, Virginia', abbr: 'CVN 74' },
	{ mmsi: 368800000, shipName: 'USS Harry S. Truman', navalBase: 'Norfolk, Virginia', abbr: 'CVN 75' },
	{ mmsi: 369970663, shipName: 'USS George H.W. Bush', navalBase: 'Norfolk, Virginia', abbr: 'CVN 77' },
	{ mmsi: 338803000, shipName: 'USS Gerald R. Ford', navalBase: 'Norfolk, Virginia', abbr: 'CVN 78' },
	{ mmsi: 369970409, shipName: 'USS Carl Vinson', navalBase: 'San Diego, California', abbr: 'CVN 70' },
	{ mmsi: 366984000, shipName: 'USS Theodore Roosevelt', navalBase: 'San Diego, California', abbr: 'CVN 71' },
	{ mmsi: 369970406, shipName: 'USS Abraham Lincoln', navalBase: 'San Diego, California', abbr: 'CVN 72' },
	{ mmsi: 303981000, shipName: 'USS Nimitz', navalBase: 'Bremerton, Washington', abbr: 'CVN 68' },
	{ mmsi: 369970410, shipName: 'USS Ronald Reagan', navalBase: 'Yokosuka, Japan', abbr: 'CVN 76' }
]

@Injectable()
export class AppService {

	constructor(
		@InjectRepository(Ship) private readonly shipRepository: Repository<Ship>,
	) { }

	getHello(): string {
		return 'Hello World!';
	}


	@Timeout(3000)
	async handleTimeout() {

		for (let item of data) {
			await this.shipRepository.save(item);
		}

	}
}
