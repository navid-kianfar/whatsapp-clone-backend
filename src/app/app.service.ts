import { ConsoleLogger, Injectable } from '@nestjs/common';
import { WhatsAppService } from '../whatsapp/whatsapp.service';
import WAWebJS from 'whatsapp-web.js';

@Injectable()
export class AppService {
  private _logger = new ConsoleLogger('AppService');
  constructor(private readonly waService: WhatsAppService) {}

  init() {
    this.waService
      .initClient()
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

  async getAvatar(id: string): Promise<string> {
    try {
      return await this.waService.client.getProfilePicUrl(id);
    } catch (err) {
      return '';
    }    
  }

  async getChats(): Promise<WAWebJS.Chat[]> {
    try {
      return await this.waService.client.getChats();
    } catch (err) {
      return [];
    }
  }

  async getMessages(id, model: any): Promise<WAWebJS.Message[]> {
    try {
      const chat = await this.waService.client.getChatById(id);
      return await chat.fetchMessages(model);
    } catch (err) {
      return [];
    }
  }

  async searchMessages(model: any): Promise<WAWebJS.Message[]> {
    try {
      return await this.waService.client.searchMessages(model.query, {
        chatId: model.chatId,
        page: model.page,
        limit: model.limit,
      });
    } catch (err) {
      return [];
    }
  }

  async sendMessage(id: string, model: any): Promise<WAWebJS.Message> {
    try {
      if (model.message) {
        return await this.waService.client.sendMessage(id, {
          body: model.message,
          contentType: 'text',
        } as any);
      }
      throw new Error('Method not implemented.');
    } catch (err) {
      return undefined;
    }
  }
}
