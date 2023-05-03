import { NestFactory } from '@nestjs/core';
import { WhatsappCloneModule } from './whatsapp-clone.module';
import { AppService } from './app/app.service';

async function bootstrap() {
  const app = await NestFactory.create(WhatsappCloneModule);
  const appService = app.get<AppService>(AppService);
  app.enableCors();
  await app.listen(3100);
  appService.init();
}
bootstrap();
