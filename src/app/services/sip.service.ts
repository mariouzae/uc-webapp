import { Injectable, ElementRef, EventEmitter } from '@angular/core';
import * as SIP from 'sip.js/dist/sip';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SipService {

  private userAgent;
  private session;
  private callSession;
  private user: User;
  registered = new EventEmitter<Boolean>();
  ringing = new EventEmitter<String>();
  failedCall = new EventEmitter<Boolean>();
  terminated = new EventEmitter<Boolean>();
  receivedMessage = new EventEmitter<String>();

  constructor() { }

  register(user: User) {
    this.user = user;

    this.userAgent = new SIP.UA({
      uri: user.sip,
      transportOptions: {
        wsServers: 'wss://18.211.195.231:8089/ws'
      },
      hackIpInContact: true,
      hackWssInTransport: true,
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

    this.userAgent.on('invite', (session) => {
      this.callSession = session;
      this.ringing.emit(session.remoteIdentity.uri.user);
    });

    this.userAgent.on('message', (message) => {
      this.receivedMessage.emit(message.body);
    })
  }

  invite(user: User, element: ElementRef): any {
    this.session = this.userAgent.invite(user.sip, {
      sessionDescriptionHandlerOptions: {
          constraints: { width: 320, height: 240, facingMode: "user", echoCancellation: true }
      }});
      return this.session;
  }

  terminate() {
    console.log("terminate caller");
    this.session.terminate();
  }

  terminatePeer()
  {
    console.log("terminate peer");
    this.callSession.terminate();
  }

  unRegister() {
    this.userAgent.unregister();
  }

  acceptSession(remoteVideo, localVideo: ElementRef) {
    this.callSession.accept();
    this.callSession.on('trackAdded', () => {
      var pc = this.callSession.sessionDescriptionHandler.peerConnection;
      // Gets remote tracks
      var remoteStream = new MediaStream();
      pc.getReceivers().forEach(function (receiver) {
        remoteStream.addTrack(receiver.track);
      });
      remoteVideo.nativeElement.srcObject = remoteStream;
    });

    this.callSession.on('failed', () => {
      this.failedCall.emit(true);
    })

    this.callSession.on('terminated', () => {
      this.terminated.emit(true);
    })
  }

  rejectSession()
  {
    this.callSession.reject();
  }

  getSipRegistered(): Boolean {
    if (this.getUserAgent() != null) {
      return this.userAgent.isRegistered();
    }
    return false;
  }

  getCurrentUser(): User {
    return this.user;
  }

  getUserAgent() {
    return this.userAgent;
  }

  sendMessage(target, message)
  {
    this.userAgent.message(target, message);
  }

}
