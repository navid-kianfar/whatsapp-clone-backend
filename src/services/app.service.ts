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
}
