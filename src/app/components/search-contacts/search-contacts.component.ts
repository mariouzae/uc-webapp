import { Component, ViewChild, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule, FormControl } from '@angular/forms';
import { PhoneComponent } from '../phone/phone.component';
import { map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

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
  @Output() callNumber = new EventEmitter<Boolean>();
  results: any[] = [];
  finaNumber: FormControl = new FormControl();

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.finaNumber.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query) => this._userService.search(query)))
      .subscribe(result => {
        if (result.status === 400) { return; } else { this.results = result.json(); }
      });
  }

  digteNumber(value: any) {
    this.searchNumber.emit(value);
  }

  callNumberBtn()
  {
    this.callNumber.emit(true);
    console.log("true");
  }

}