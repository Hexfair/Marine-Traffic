import { Module } from '@nestjs/common';
import { PositionService } from './position.service';
import { PositionController } from './position.controller';
import { ShipService } from 'src/ship/ship.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Position } from './entities/position.entity';
import { Ship } from 'src/ship/entities/ship.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Position, Ship])],
	controllers: [PositionController],
	providers: [PositionService, ShipService],
	exports: [PositionService],
})
export class PositionModule { }
