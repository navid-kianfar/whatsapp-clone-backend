import { ConsoleLogger, Injectable } from '@nestjs/common';
import { Client, LocalAuth } from 'whatsapp-web.js';
import { toDataURL } from 'qrcode';
import { SocketService } from '../socket/socket.service';

@Injectable()
export class WhatsAppService {
  client: Client;
  private _logger = new ConsoleLogger('WAService');
  private _qrCode = '';

  constructor(private readonly socketService: SocketService) {}

  get qr(): string {
    return this._qrCode;
  }

  initClient(): Promise<void> {
    this._logger.log('Client init start');
    this.client = new Client({
      authStrategy: new LocalAuth({
        dataPath: './data/auth',
      }),
    });

    this.client.on('qr', this.onQR);
    this.client.on('ready', this.onReady);
    this.client.on('message', this.onMessage);
    this.client.on('loading_screen', this.onLoadingScreen);
    this.client.on('authenticated', this.onAuthenticated);
    this.client.on('auth_failure', this.onAuthFailure);
    this.client.on('message_create', this.onMessageCreate);
    this.client.on('message_revoke_everyone', this.onMessageRevokeEveryone);
    this.client.on('message_revoke_me', this.onMessageRevokeMe);
    this.client.on('message_ack', this.onMessageAck);
    this.client.on('group_join', this.onGroupJoin);
    this.client.on('group_leave', this.onGroupLeave);
    this.client.on('group_update', this.onGroupUpdate);
    this.client.on('group_admin_changed', this.onGroupAdminChanged);
    this.client.on('change_state', this.onStateChanged);
    this.client.on('disconnected', this.onDisconnected);
    this.client.on('contact_changed', this.onContactChanged);
    const promise = this.client.initialize();
    this._logger.log('Client init done');
    return promise;
  }
  private onQR = async (qr: string) => {
    this._qrCode = await toDataURL(qr);
    this.socketService.send('qr', { qr: this._qrCode });
    this._logger.log('QR code sent to client');
  };
  private onReady = () => {
    this._qrCode = '';
    this.socketService.send('ready');
    this._logger.log('Client is ready');
  };
  private onAuthenticated = () => {
    this.socketService.send('authenticated');
    this._logger.log('Client is authenticated');
  };
  private onAuthFailure = (msg) => {
    this.socketService.send('authentication_failed');
    this._logger.log('Client is authentication failed', msg);
  };
  private onLoadingScreen = (percent, msg) => {
    this.socketService.send('loading', { percent, msg });
    this._logger.log('Client is loading');
  };
  private onMessage = (msg) => {
    this.socketService.send('message', { msg });
    this._logger.log('Message has been recived', msg);
  };
  private onMessageCreate = (msg) => {
    this._logger.log('onMessageCreate', msg);
  };
  private onMessageRevokeEveryone = (after, before) => {
    this._logger.log('onMessageRevokeEveryone', after, before);
  };
  private onMessageRevokeMe = (msg) => {
    this._logger.log('onMessageRevokeEveryone', msg);
  };
  private onMessageAck = (msg, ack) => {
    this._logger.log('onMessageAck', msg, ack);
  };
  private onGroupJoin = (notification) => {
    this._logger.log('onGroupJoin', notification);
  };
  private onGroupLeave = (notification) => {
    this._logger.log('onGroupLeave', notification);
  };
  private onGroupUpdate = (notification) => {
    this._logger.log('onGroupUpdate', notification);
  };
  private onGroupAdminChanged = (notification) => {
    this._logger.log('onGroupAdminChanged', notification);
  };
  private onStateChanged = (state) => {
    this._logger.log('onStateChanged', state);
  };
  private onDisconnected = (reason) => {
    this._logger.log('onDisconnected', reason);
  };
  private onContactChanged = (message, oldId, newId, isContact) => {
    this._logger.log('onContactChanged', message, oldId, newId, isContact);
  };
}
