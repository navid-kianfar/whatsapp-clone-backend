import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class SocketService {
  sessions: any[] = [];
  private _logger = new ConsoleLogger('SocketService');
  constructor() {}

  send(command: string, payload: any = {}) {
    this.sessions.forEach(s => s.emit(command, payload));
    this._logger.log(`Command "${command}" has been sent`);
  }
  
}
