import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SipService } from '../../services/sip.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public usersList: User[];

  constructor(private _userService: UserService, private _sipService: SipService) { }

  ngOnInit() {
    // fill the user contact list initially.
    var currentUser = this._sipService.getCurrentUser();
    this._userService.search(null).subscribe((results) => {
      const u : User[] = results.filter((us) => {
        return us.login != currentUser.login;
      });
      this.usersList = u;
    })
  }

}
