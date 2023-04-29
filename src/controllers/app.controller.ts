import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('chats')
  getChats() {
    return this.appService.getChats();
  }

  @Get('qr')
  getQR() {
    return this.appService.getQR();
  }
}
