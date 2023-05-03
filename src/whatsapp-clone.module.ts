import { Module } from '@nestjs/common';
import { SocketModule } from './socket/socket.module';
import { AppModule } from './app/app.module';
import { WhatsappModule } from './whatsapp/whatsapp.module';

@Module({
  imports: [SocketModule, AppModule, WhatsappModule],
  controllers: [],
  providers: [],
})
export class WhatsappCloneModule {}
