import { Module } from '@nestjs/common';
import { SocketModule } from 'src/socket/socket.module';
import { WhatsappModule } from 'src/whatsapp/whatsapp.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [SocketModule, WhatsappModule],
    controllers: [AppController],
    providers: [AppService],
    exports: [AppController, AppService],
})
export class AppModule {}
