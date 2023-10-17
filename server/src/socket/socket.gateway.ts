import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { CreateSocketDto } from './dto/create-socket.dto';
import { UpdateSocketDto } from './dto/update-socket.dto';
import { PositionService } from 'src/position/position.service';
import { Server, Socket } from 'socket.io';
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
		if (isUpdate.affected > 1) {
			console.log(isUpdate)
			this.server.emit('SERVER:readed-position', payload.id);
		}
	}
}
