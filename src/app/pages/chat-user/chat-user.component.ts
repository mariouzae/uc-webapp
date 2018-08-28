import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { SipService } from '../../services/sip.service';

@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrls: ['./chat-user.component.css']
})
export class ChatUserComponent implements OnInit {
  login: String;
  user: User;
  @ViewChild('messageInput') messageInput:  ElementRef;
  @ViewChild('message') message: ElementRef;

  constructor(private router: ActivatedRoute, 
    private route: Router, 
    private _userService: UserService,
    private _sipService: SipService,
    private renderer: Renderer2,
    private el: ElementRef) { }

  ngOnInit() {
      this.login = this.router.snapshot.params['login'];
      if (this.login == null || this.login == "") {
        this.route.navigate(['/phone']);
      }

      this._userService.search(null).subscribe((results) => {
        const u : User[] = results.filter((us) => {
          return this.login === us.login;
        });
        this.user = u[0];
      });

      // Subscribe to recieve messages
      this._sipService.receivedMessage.subscribe((message) => {
        this.createMessage(message, 'msg-text');
      })
      
  }

  createMessage(message, cssClass)
  {
    const p = this.renderer.createElement('p');
    const span = this.renderer.createElement('span');
    const text = this.renderer.createText(message);

    this.renderer.appendChild(p, span);
    this.renderer.appendChild(span, text);
    this.renderer.appendChild(this.message.nativeElement, p);
    this.renderer.addClass(p, cssClass)
  }

  goBack()
  {
    this.route.navigate(['/phone']);
  }

  sendMessage()
  {
    //this._sipService.sendMessage(this.user.sip, this.messageInput.nativeElement.value);
    var message = this.messageInput.nativeElement.value;
    if (message != null && message != "")
    {
      this.createMessage(message, 'msg-self');
      message = "";
    }
    
  }

  onEnter(event)
  {
    if(event.keyCode == 13) {
      this.sendMessage();
    }
  }

}
