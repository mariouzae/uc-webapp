import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import * as SIP from 'sip.js/dist/sip';
import { SipService } from '../../services/sip.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-base',
  /* The click event calls hero.toggleState(), which
   * causes the state of that hero to switch from
   * active to inactive or vice versa.
   */
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css'],
  /**
   * Define two states, "inactive" and "active", and the end
   * styles that apply whenever the element is in those states.
   * Then define animations for transitioning between the states,
   * one in each direction
   */
  animations: [
    trigger('heroState', [
      transition('inactive <=> active', [
        style({
          backgroundColor: '#cfd8dc',
          transform: 'scale(1.3)'
        }),
        animate('120ms ease-in', style({
          backgroundColor: '#eee',
          transform: 'scale(1.2)'
        }))
      ])
    ])
  ]
})
export class BaseComponent implements OnInit {
  registered : string;
  sip: String;
  userAgent: any;
  @ViewChild('remote') remote: ElementRef;
  ringing: String;

  constructor(private _sipService: SipService,
  private route : Router) {}
  
  ngOnInit()
  {
    if(this._sipService.getSipRegistered())
    {
      //console.log("User: ", this._sipService.getCurrentUser().name);
      this.registered = "green";
      this.sip = this._sipService.getCurrentUser().sip;
    } else {
      this.registered = "red";
      this.sip = "not registered, sign in again";
      //this.route.navigate(['/']);
    }
    this._sipService.registered.subscribe((status: Boolean) => {
      this.registered = "green";
      this.sip = this._sipService.getCurrentUser().sip;
      this.userAgent = this._sipService.getUserAgent();
    });

    // On receive call
    this._sipService.ringing.subscribe((ringing: String) => {
      // accept the call
      this._sipService.acceptSession(this.remote);
      console.log("ringing on client");
      this.ringing = ringing;
    });
  }

  heroes = [
    { name: 'Windstorm', state: 'active' },
    { name: 'Windstorm', state: 'inactive' },
    { name: 'Windstorm', state: 'active' },
    { name: 'Windstorm', state: 'inactive' },
    { name: 'Windstorm', state: 'active' }
  ]
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
    console.log("callNumber on base");
  }

}