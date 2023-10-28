import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { PositionService } from 'src/position/position.service';
import { Server } from 'socket.io';
//===========================================================================================================

@WebSocketGateway({
	cors: { origin: '*' },
	namespace: 'usn-traffic',
})
export class SocketGateway {
	constructor(private readonly positionService: PositionService) { }

	@WebSocketServer() server: Server;

	/* Изменение статуса всех позиций выбранного корабля на "прочитано" */
	@SubscribeMessage('CLIENT:readed-position')
	async handleReadedPosition(@MessageBody() payload: { id: number }): Promise<void> {
		const isUpdate = await this.positionService.update(payload.id);
		if (isUpdate.affected > 0) {
			this.server.emit('SERVER:readed-position', payload.id);
		}
	}

	/* Изменение статуса  позиций всех кораблей на "прочитано" */
	@SubscribeMessage('CLIENT:readed-all-positions')
	async handleReadedAllPositions(): Promise<void> {
		const isUpdate = await this.positionService.updateAll();
		if (isUpdate.affected > 0) {
			this.server.emit('SERVER:readed-all-positions');
		}
	}

	/* Получение позиций корабля в пределах выбранных дат */
	@SubscribeMessage('CLIENT:get-positions-date')
	async findOneWithDates(@MessageBody() payload: { mmsi: number, dates: Date[] }) {
		const shipPositions = await this.positionService.findPositions(payload.mmsi);
		console.log('shipPositions', shipPositions);

		const response = shipPositions.filter(obj => {
			const checkStartDate = new Date(obj.latestTime) > new Date(payload.dates[0]);
			const checkEndDate = new Date(obj.latestTime) < new Date(payload.dates[1]);
			if (checkStartDate && checkEndDate) {
				return obj
			}
		});

		response.length > 0
			? this.server.emit('SERVER:get-positions-date', response)
			: this.server.emit('SERVER:get-positions-date', null);
	}
}
