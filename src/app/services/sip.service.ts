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

    this.userAgent.on('invite', function(session) {
      console.log("Receive a call, ringing...");
      this.callSession = session;
      //this.ringing.emit("ringing");
      this.callSession.accept();
      this.callSession.on('accepted', function() {
        var pc = this.callSession.sessionDescriptionHandler.peerConnection;
        // Gets remote tracks
        var remoteStream = new MediaStream();
        pc.getReceivers().forEach(function(receiver) {
          remoteStream.addTrack(receiver.track);
        });
        element.nativeElement.srcObject = remoteStream;
        console.log(this.callSession);
    });
    });
  }

  invite(user: User, element: ElementRef) : any {
    console.log("User logged: ", this.getCurrentUser().name);
    console.log("Calling user: ", user.name);
    return this.userAgent.invite(user.sip, element);
  }

  //   {
  //     sessionDescriptionHandlerOptions: {
  //       constraints: {
  //         audio: true,
  //         video: false
  //       }
  //     }
  //   }
  // }

  terminate() {
    this.callSession.terminate();
  }

  unRegister()
  {
    this.userAgent.unregister();
  }

  acceptSession(element: ElementRef)
  {
    this.callSession.accept();
    this.callSession.on('accepted', function() {
        // var pc = this.callSession.sessionDescriptionHandler.peerConnection;
        // // Gets remote tracks
        // var remoteStream = new MediaStream();
        // pc.getReceivers().forEach(function(receiver) {
        //   remoteStream.addTrack(receiver.track);
        // });
        // element.nativeElement.srcObject = remoteStream;
        console.log(this.callSession);
    });
    this.callSession.on('trackAdded', function(){
      console.log("Session: ", this.callSession);
    })
  }

  getSipRegistered() : Boolean 
  {
    if(this.getUserAgent() != null) {
      return this.userAgent.isRegistered();
    } 
    return false;
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
