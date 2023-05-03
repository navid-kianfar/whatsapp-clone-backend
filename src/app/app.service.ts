import { ConsoleLogger, Injectable } from '@nestjs/common';
import { WhatsAppService } from '../whatsapp/whatsapp.service';
import WAWebJS from 'whatsapp-web.js';

@Injectable()
export class AppService {
  private _logger = new ConsoleLogger('AppService');
  constructor(private readonly waService: WhatsAppService) {}

  init() {
    this.waService.initClient()
    .catch((err) => {
      this._logger.error(err.message);
    })
    .then(() => {
      this._logger.log('Client released');
    });
  }

  getQR() {
    return this.waService.qr;
  }

  getAvatar(id: string): Promise<string> {
    return this.waService.client.getProfilePicUrl(id);
  }

  getChats(): Promise<WAWebJS.Chat[]> {
    return this.waService.client.getChats();
  }

  async getMessages(id, model: any): Promise<WAWebJS.Message[]> {
    const chat = await this.waService.client.getChatById(id);
    return await chat.fetchMessages(model);
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
