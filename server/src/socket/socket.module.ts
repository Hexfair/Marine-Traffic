import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { PositionService } from 'src/position/position.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Position } from 'src/position/position.entity';
import { ShipService } from 'src/ship/ship.service';
import { Ship } from 'src/ship/ship.entity';
//===========================================================================================================

@Module({
	imports: [TypeOrmModule.forFeature([Position, Ship])],
	providers: [SocketGateway, PositionService, ShipService],
})
export class SocketModule { }
