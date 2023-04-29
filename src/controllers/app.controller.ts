import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
    return {
      qr: this.appService.getQR(),
    };
  }

  @Post('chat/:id/messages')
  getMessages(@Param('id') id: string, @Body() model: any) {
    return this.appService.getMessages(id, model);
  }

  @Post('chat/:id/search')
  searchMessages(@Param('id') id: string, @Body() model: any) {
    model.chatId = id;
    return this.appService.searchMessages(model);
  }

  @Post('chat/:id/send-message')
  sendMessage(@Param('id') id: string, @Body() model: any) {
    return this.appService.sendMessage(id, model);
  }
}
