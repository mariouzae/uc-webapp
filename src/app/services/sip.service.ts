import { Injectable, ElementRef } from '@angular/core';
import * as SIP from 'sip.js/dist/sip';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SipService {

  private userAgent;
  private session;
  private user: User;

  constructor() { }

  register(user: any) {
    console.log("PASS" + user.pass);
    return this.userAgent = new SIP.UA({
      uri: '200@18.211.195.231',
      transportOptions: {
        wsServers: 'wss://18.211.195.231:8089/ws',
      },
      authorizationUser: '200',
      password: '200',
      register: true,
      registrarServer: 'sip:18.211.195.231'
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

}
