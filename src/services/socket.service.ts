import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class SocketService {
  private _logger = new ConsoleLogger('SocketService');
  constructor() {}

  send(command: string, payload: any = {}) {
    this._logger.warn(command, payload);
  }
}
