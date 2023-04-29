import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './services/app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appService = app.get<AppService>(AppService);
  await appService.init();
  await app.listen(3100);
}
bootstrap();
