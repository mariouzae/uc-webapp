import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { SipService } from '../../services/sip.service';

@Component({
  selector: 'app-incoming-call',
  templateUrl: './incoming-call.component.html',
  styleUrls: ['./incoming-call.component.css']
})
export class IncomingCallComponent implements OnInit {

  @ViewChild('openModal') openModal:ElementRef;
  @ViewChild('closeModal') closeModal:ElementRef;
  @ViewChild('remoteVideo') remoteVideo: ElementRef;
  @Input() user: User;

  constructor(private _sipService: SipService, private route: Router) { }

  ngOnInit() {
    this.openModal.nativeElement.click();
  }

  acceptCall()
  {
    this._sipService.acceptSession(this.remoteVideo, null);
    this.route.navigate(['/call/'+this.user.name], { queryParams: { received: true } });
  }

  declineCall()
  {
    this._sipService.rejectSession();
  }

}
