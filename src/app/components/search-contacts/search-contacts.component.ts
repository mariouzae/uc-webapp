import { Component, ViewChild, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule, FormControl } from '@angular/forms';
import { PhoneComponent } from '../phone/phone.component';
import { map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Router } from '../../../../node_modules/@angular/router';

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
  name = '';

  constructor(private _userService: UserService, private router: Router) { }

  ngOnInit() {
    this.finaNumber.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query) => this._userService.search(query)))
      .subscribe(result => {
        if (result.status === 400) { return; } else { this.results = result; }
      });
  }

  digteNumber(value: any) {
    this.searchNumber.emit(value);
  }

  call(value: string) {
    this.router.navigate(['/call/'+ value]);
  }

}