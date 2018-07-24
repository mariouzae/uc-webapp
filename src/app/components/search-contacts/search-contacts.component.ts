import { Component, ViewChild, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms'; 
import { PhoneComponent } from '../phone/phone.component';

@Component({
  selector: 'app-search-contacts',
  templateUrl: './search-contacts.component.html',
  styleUrls: ['./search-contacts.component.css'],
  providers: [UserService]
})
export class SearchContactsComponent implements OnInit {

  @Input() wholeNumber: string;
  @Input() finalNumber: string;
  @Output() searchNumber = new EventEmitter<string>();
  ngOnInit() { }
  constructor() {
    
  }

  digteNumber(value : any)
  {
    this.searchNumber.emit(value); 
    //this.wholeNumber += value;
  }

}
