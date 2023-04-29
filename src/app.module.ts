import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { WAService } from './services/wa.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, WAService],
})
export class AppModule {}
