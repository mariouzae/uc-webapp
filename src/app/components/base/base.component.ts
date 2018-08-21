import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as SIP from 'sip.js/dist/sip';
import { SipService } from '../../services/sip.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css'],
})
export class BaseComponent implements OnInit {
  registered : string;
  sip: String;
  userAgent: any;
  @ViewChild('remote') remoteVideo: ElementRef;
  @ViewChild('local') localVideo: ElementRef;
  ringing: String;
  calling: Boolean = true;

  constructor(private _sipService: SipService, private route : Router) {}
  
  ngOnInit()
  {
    if(this._sipService.getSipRegistered())
    {
      this.registered = "green";
      this.sip = this._sipService.getCurrentUser().sip;
    } else {
      this.registered = "red";
      this.sip = "not registered, sign in again";
    }
    this._sipService.registered.subscribe((status: Boolean) => {
      this.registered = "green";
      this.sip = this._sipService.getCurrentUser().sip;
      this.userAgent = this._sipService.getUserAgent();
      this.calling = true;
    });

    // On incoming call
    this._sipService.ringing.subscribe((ringing: String) => {
      // accept the call
      this._sipService.acceptSession(this.remoteVideo, this.localVideo);
      console.log("call incoming accepted...");
      this.ringing = ringing;
    });
  }

  public state = 'active';
  wholeNumber = '';
  searchNumber = '';
  finalNumber = '';
  callNumber : Boolean;

  toggleState() {
    this.state = this.state === 'active' ? 'inactive' : 'active';
  }

  // Event emited by phone-component
  phoneCall(value: string)
  {
    this.searchNumber += value;
    this.finalNumber = this.searchNumber;
  }

  searchCall(value: string)
  {
    this.searchNumber = value;
    this.finalNumber = this.searchNumber;
  }

  callNumberBtn(value: Boolean)
  {
    this.callNumber = value;
  }

}