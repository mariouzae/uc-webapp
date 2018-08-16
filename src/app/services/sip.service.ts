import { Injectable, ElementRef, EventEmitter } from '@angular/core';
import * as SIP from 'sip.js/dist/sip';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SipService {

  private userAgent;
  private session;
  private user: User;
  registered = new EventEmitter<Boolean>();

  constructor() { }

  register(user: User) {
    this.user = user;

    this.userAgent = new SIP.UA({
      uri: user.sip,
      transportOptions: {
        wsServers: 'wss://18.211.195.231:8089/ws'
      },
      hackIpInContact: true,
      authorizationUser: user.pass,
      password: user.pass,
      register: true,
      registrarServer: 'sip:18.211.195.231'
    });

    this.userAgent.on('registered', () => {
      this.registered.emit(true);
    });

    this.userAgent.on('unregistered', () => {
      this.registered.emit(false);
    });
  }

  invite(user: User) : any {
    this.session = this.userAgent.invite(user.sip, {
      sessionDescriptionHandlerOptions: {
        constraints: {
          audio: true,
          video: false
        }
      }
    });
    return this.session;
  }

  getSipRegistered() : Boolean 
  {
    return this.userAgent.isRegistered();
  }

  getCurrentUser() : User
  {
    return this.user;
  }

  getUserAgent()
  {
    return this.userAgent;
  }

}
