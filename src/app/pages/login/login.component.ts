import { Component, OnInit } from '@angular/core';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { SipService } from '../../services/sip.service';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error : boolean = false;
  userLogon: User[] = [];

  constructor(private _userService : UserService,
              private _sipService : SipService,
              private route : Router) { }

  ngOnInit() {
    // First of all, unregister any logged user in this sip provider.
    if(this._sipService.getUserAgent() != null)
    {
      this._sipService.unRegister();
    }
  }

  onSubmit(form: NgForm)
  {
    var user = form.value.name;
    this._userService.search(null)
    .subscribe(resp => {
      const u : User[] = resp;
      this.userLogon = u.filter(u => u.login === user);

      if(this.userLogon.length > 0) {
        this._sipService.register(this.userLogon[0]);
        this.route.navigate(['/phone']);
      } else {
        this.error = true;
      }
    });
  }

  isRegistered() : Boolean
  {
    return this._sipService.getSipRegistered();
  }

}
