import { Module } from '@nestjs/common';
import { SocketModule } from './socket/socket.module';
import { WhatsappModule } from './whatsapp/whatsapp.module';
import { AppModule } from './app/app.module';

@Module({
  imports: [SocketModule, AppModule, WhatsappModule],
})
export class WhatsappCloneModule {}
