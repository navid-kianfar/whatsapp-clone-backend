import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';

@Module({
  providers: [SocketService, SocketGateway],
  exports: [SocketService],
})
export class SocketModule {}
