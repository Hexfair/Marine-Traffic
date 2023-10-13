import { Module } from '@nestjs/common';
import { ParserService } from './parser.service';
import { ParserController } from './parser.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ship } from 'src/ship/entities/ship.entity';
import { PositionService } from 'src/position/position.service';
import { Position } from 'src/position/entities/position.entity';
import { ShipService } from 'src/ship/ship.service';

@Module({
	imports: [TypeOrmModule.forFeature([Ship, Position])],
	controllers: [ParserController],
	providers: [ParserService, PositionService, ShipService],
})
export class ParserModule { }
