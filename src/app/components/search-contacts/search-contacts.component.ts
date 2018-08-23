import { Component, ViewChild, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule, FormControl } from '@angular/forms';
import { PhoneComponent } from '../phone/phone.component';
import { map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { User } from '../../models/user.model';
import { SipService } from '../../services/sip.service';

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
  results: any = [];
  finaNumber: FormControl = new FormControl();
  name = '';
  userLogged = '200';
  currentUser: string;

  constructor(private _userService: UserService, private router: Router,
  private _sipService: SipService) { }

  ngOnInit() {
    this.currentUser = this._sipService.getCurrentUser().login; 
  }

  digteNumber(value: any) {
    this.searchNumber.emit(value);

    this.finaNumber.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query) => this._userService.search(query)))
      .subscribe((result) => {
        const users : User[] = result.filter((u) => {
          return u.login != this.currentUser;
        });
        this.results = users
      });
  }

  call(value: string) {
    this.router.navigate(['/call/'+ value]);
  }

}