import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
//import { trigger, state, style, animate, transition, query } from '@angular/animations';
@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css'],
  // animations: [
  //   trigger('heroState1', [
  //     state("open", style({backgroundColor: 'white'})),
  //     state("closed", style({backgroundColor: '#f2f2f2'})),
  //     transition("open <=> closed", animate( "3000ms" ))
  //   ]),
  //   trigger('heroState2', [
  //     transition('* => *', [
  //       animate('200ms', style({
  //         backgroundColor: '#f2f2f2'
  //       }))
  //     ])
  //   ])
  // ]
})
export class PhoneComponent implements OnInit {

  @Output() numberCall = new EventEmitter<string>();
  @Input() searchNumber : string;
  constructor() { }

  number: string
  ngOnInit() {
  }

  // public state = 'open';
  toggleState(value: string) {
    this.numberCall.emit(value.substr(0,1));
  }

}
