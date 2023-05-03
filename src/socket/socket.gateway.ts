import {
  OnGatewayConnection,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { SocketService } from './socket.service';
import { ConsoleLogger } from '@nestjs/common';

@WebSocketGateway({ cors: true })
export class SocketGateway implements OnGatewayInit, OnGatewayConnection {
  @WebSocketServer() server;

  private _logger = new ConsoleLogger('SocketGateway');
  constructor(private readonly socketService: SocketService) {}

  afterInit(server: any): any {}

  handleConnection(socket: any): any {
    this._logger.log(`Socket connection: ${socket.id}`);
    socket.on('disconnect', () => this.disconnect(socket));
    this.socketService.sessions.push(socket);
    // TODO: send to redis that user is online
  }

  disconnect(socket: any) {
    this._logger.log(`Socket disconnection: ${socket.id}`);
    this.socketService.sessions = this.socketService.sessions.filter(s => s !== socket);
  }

  // @SubscribeMessage('START-CONVERSATION')
  // startConversation(client: any, data: any) {
  //
  // }
}
