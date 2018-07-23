import { Component, ViewChild, OnInit, Input } from '@angular/core';
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
  ngOnInit() { }
  constructor() {
    
  }

  newNumber(number: string)
  {
    this.wholeNumber += number;
  }

}
