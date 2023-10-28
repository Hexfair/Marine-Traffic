import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ShipService } from 'src/ship/ship.service';
import { Position } from './position.entity';
import { Repository } from 'typeorm';
//===========================================================================================================

@Injectable()
export class PositionService {
	constructor(
		@InjectRepository(Position) private readonly positionRepository: Repository<Position>,
		private readonly shipService: ShipService
	) { }

	/* Сохранение позиции корабля в базе */
	async create(createPositionDto: CreatePositionDto) {
		const shipData = await this.shipService.findOnebyMMSI(createPositionDto.mmsi)
		if (!shipData) {
			throw new BadRequestException('Ошибка при получении данных. Возможно, вы указали неправильный номер MMSI');
		}

		const positionData = {
			ship: shipData,
			latitude: createPositionDto.latitude,
			longitude: createPositionDto.longitude,
			course: createPositionDto.course,
			latestTime: createPositionDto.latestTime,
		};

		return await this.positionRepository.save(positionData);
	}

	/* Получение последней позиции корабля */
	async findLastPosition(mmsi: number) {
		const shipData = await this.positionRepository.find({
			relations: { ship: true },
			where: [{ ship: { mmsi: mmsi } }],
			order: { latestTime: 'ASC' }
		})

		return shipData.at(-1);
	}

	/* Получение всех кораблей с их последними позициями */
	async findLastAll() {
		const allShipsData = await this.shipService.findAll();
		const allShipsWithLastPosition = await Promise.all(
			allShipsData.map(async (obj) => await this.findLastPosition(obj.mmsi)));

		return allShipsWithLastPosition.filter(obj => obj);
	}

	async update(id: number) {
		const positions = await this.positionRepository
			.createQueryBuilder()
			.update(Position)
			.set({ isReaded: true })
			.where("ship.id = :id", { id })
			.execute()
		return positions
	}

	async updateAll() {
		const positions = await this.positionRepository
			.createQueryBuilder()
			.update(Position)
			.set({ isReaded: true })
			.execute()
		return positions
	}

	remove(id: number) {
		return `This action removes a #${id} position`;
	}
}
