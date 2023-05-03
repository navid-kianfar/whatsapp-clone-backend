import { Module } from '@nestjs/common';
import { WhatsAppService } from './whatsapp.service';
import { SocketModule } from '../socket/socket.module';

@Module({
  imports: [SocketModule],
  providers: [WhatsAppService],
  exports: [WhatsAppService],
})
export class WhatsappModule {}
