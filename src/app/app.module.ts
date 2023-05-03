import { Module } from '@nestjs/common';
import { SocketModule } from '../socket/socket.module';
import { WhatsappModule } from '../whatsapp/whatsapp.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [SocketModule, WhatsappModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
