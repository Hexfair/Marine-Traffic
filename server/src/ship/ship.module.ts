import { Module } from '@nestjs/common';
import { ShipService } from './ship.service';
import { ShipController } from './ship.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ship } from './ship.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Ship])],
	controllers: [ShipController],
	providers: [ShipService],
	exports: [ShipService],
})
export class ShipModule { }
