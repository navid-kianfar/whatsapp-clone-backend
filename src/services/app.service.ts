import { Injectable } from '@nestjs/common';
import { WAService } from './wa.service';
import WAWebJS from 'whatsapp-web.js';

@Injectable()
export class AppService {
  constructor(private readonly waService: WAService) {}

  async init() {
    await this.waService.init();
  }

  getQR() {
    return this.waService.qr;
  }

  getChats(): Promise<WAWebJS.Chat[]> {
    return this.waService.client.getChats();
  }

  getMessages(model: any): Promise<WAWebJS.Message[]> {
    return this.waService.client.searchMessages('', {
      chatId: model.chatId,
      page: model.page,
      limit: model.limit,
    });
  }

  searchMessages(model: any): Promise<WAWebJS.Message[]> {
    return this.waService.client.searchMessages(model.query, {
      chatId: model.chatId,
      page: model.page,
      limit: model.limit,
    });
  }

  async sendMessage(id: string, model: any): Promise<WAWebJS.Message> {
    if (model.message) {
      return this.waService.client.sendMessage(id, {
        body: model.message,
        contentType: 'text',
      } as any);
    }
    throw new Error('Method not implemented.');
  }
}
