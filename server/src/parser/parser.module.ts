import { Module } from '@nestjs/common';
import { ParserService } from './parser.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ship } from 'src/ship/ship.entity';
import { PositionService } from 'src/position/position.service';
import { Position } from 'src/position/position.entity';
import { ShipService } from 'src/ship/ship.service';

@Module({
	imports: [TypeOrmModule.forFeature([Ship, Position])],
	providers: [ParserService, PositionService, ShipService],
})
export class ParserModule { }
