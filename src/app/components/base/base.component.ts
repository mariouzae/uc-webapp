import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import * as SIP from 'sip.js/dist/sip';

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

  ngOnInit()
  {
    var userAgent = new SIP.UA({
      uri: '199@18.211.195.231',
      transportOptions: {
        wsServers: 'wss://18.211.195.231:8089/ws',
      },
      authorizationUser: '199',
      password: '199',
      register: false,
      registrarServer: 'sip:18.211.195.231'
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
    console.log(this.state);
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