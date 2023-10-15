import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParserModule } from './parser/parser.module';
import { PositionModule } from './position/position.module';
import { ShipModule } from './ship/ship.module';
import { Ship } from './ship/ship.entity';
import { Position } from './position/position.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { SocketModule } from './socket/socket.module';
//===========================================================================================================

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		ScheduleModule.forRoot(),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				type: 'postgres',
				host: configService.get('DB_HOST'),
				port: configService.get('DB_PORT'),
				username: configService.get('DB_USERNAME'),
				password: configService.get('DB_PASSWORD'),
				database: configService.get('DB_NAME'),
				entities: [Ship, Position],
				synchronize: true,
			}),
			inject: [ConfigService],
		}),
		TypeOrmModule.forFeature([Ship]),
		ParserModule,
		PositionModule,
		ShipModule,
		SocketModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
