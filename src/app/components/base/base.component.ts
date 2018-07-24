import {
  Component,
  Input
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

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
export class BaseComponent {
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

  toggleState() {
    console.log(this.state);
    this.state = this.state === 'active' ? 'inactive' : 'active';
  }

  // Event emited by phone-component
  phoneCall(value: string)
  {
    this.searchNumber += value;
    this.finalNumber = this.searchNumber;
    console.log("Event received from phone box...");
    console.log("P:" + value);
  }

  searchCall(value: string)
  {
    this.searchNumber = value;
    this.finalNumber = this.searchNumber;
    console.log("Event received from search box...");
    console.log("S: " + value);
  }

}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/