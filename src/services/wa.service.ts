import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { Client, RemoteAuth, LocalAuth } from 'whatsapp-web.js';
import { MongoStore } from 'wwebjs-mongo';
import { toDataURL } from 'qrcode';
import WAWebJS from 'whatsapp-web.js';

@Injectable()
export class WAService {
  client: Client;
  private _qrCode = '';

  get qr(): string {
    return this._qrCode;
  }

  private async configure() {
    try {
      const mongoURI =
        'mongodb://wwebjs_user:wwebjs_passwd@localhost:27017/wwebjs';

      await mongoose.connect(mongoURI);
      this.client = new Client({
        authStrategy: new RemoteAuth({
          store: new MongoStore({ mongoose }),
          backupSyncIntervalMs: 300000,
        }),
        // authStrategy: new LocalAuth(),
      });
    } catch (err) {
      console.error(err);
    }
  }

  async init() {
    await this.configure();
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
    this.client.initialize();
  }
  private onQR = async (qr: string) => {
    this._qrCode = await toDataURL(qr);
    console.log('onQR', qr);
  };
  private onReady = () => {
    this._qrCode = '';
    console.log('onReady');
  };
  private onMessage = (msg) => {
    console.log('onMessage', msg);
  };
  private onMessageCreate = (msg) => {
    console.log('onMessageCreate', msg);
  };
  private onMessageRevokeEveryone = (after, before) => {
    console.log('onMessageRevokeEveryone', after, before);
  };
  private onMessageRevokeMe = (msg) => {
    console.log('onMessageRevokeEveryone', msg);
  };
  private onLoadingScreen = (percent, msg) => {
    console.log('onLoadingScreen', percent, msg);
  };
  private onMessageAck = (msg, ack) => {
    console.log('onMessageAck', msg, ack);
  };
  private onAuthenticated = () => {
    console.log('onAuthenticated');
  };
  private onAuthFailure = (msg) => {
    console.log('onAuthFailure', msg);
  };
  private onGroupJoin = (notification) => {
    console.log('onGroupJoin', notification);
  };
  private onGroupLeave = (notification) => {
    console.log('onGroupLeave', notification);
  };
  private onGroupUpdate = (notification) => {
    console.log('onGroupUpdate', notification);
  };
  private onGroupAdminChanged = (notification) => {
    console.log('onGroupAdminChanged', notification);
  };
  private onStateChanged = (state) => {
    console.log('onStateChanged', state);
  };
  private onDisconnected = (reason) => {
    console.log('onDisconnected', reason);
  };
  private onContactChanged = (message, oldId, newId, isContact) => {
    console.log('onContactChanged', message, oldId, newId, isContact);
  };
}
