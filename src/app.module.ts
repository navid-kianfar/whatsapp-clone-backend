import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { WAService } from './services/wa.service';
import { SocketService } from './services/socket.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, WAService, SocketService],
})
export class AppModule {}
