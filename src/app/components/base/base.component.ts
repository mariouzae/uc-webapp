import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as SIP from 'sip.js/dist/sip';
import { SipService } from '../../services/sip.service';
import { Route, Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

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
  @ViewChild('openModal') openModal:ElementRef;
  @ViewChild('closeModal') closeModal:ElementRef;
  ringing: String;
  calling: Boolean = true;
  user = { 'name' :  '', 'photo': ''}
  modal: Boolean = false;

  constructor(private _sipService: SipService, 
              private route : Router,
              private _userService: UserService) {}
  
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
      console.log("incoming call: " + ringing);

      this._userService.search(null).subscribe((result) => {
        const u : User = result.filter(us => {
          return us.pass == ringing;
        });
        this.user = u[0];
        this.openModal.nativeElement.click();
      });
    });

    this._sipService.failedCall.subscribe((status: Boolean) => {
      this.closeModal.nativeElement.click();
    })
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

  acceptCall()
  {
    //this._sipService.acceptSession(this.remoteVideo, this.localVideo);
    this.route.navigate(['/call/'+this.user.name], { queryParams: { received: true } });
  }

  declineCall()
  {
    this._sipService.rejectSession();
  }

}