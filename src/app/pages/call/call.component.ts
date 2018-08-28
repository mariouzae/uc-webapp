import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { map, filter } from 'rxjs/operators';
import { User } from '../../models/user.model';
import * as SIP from 'sip.js/dist/sip';
import { SipService } from '../../services/sip.service';
import { ThrowStmt } from '../../../../node_modules/@angular/compiler';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.css'],
  providers: [UserService]
})
export class CallComponent implements OnInit {

  @ViewChild('remoteVideo') remoteVideo: ElementRef;
  @ViewChild('localVideo') localVideo: ElementRef;
  user: { name: string };
  userToCall: object;
  imgUrl: string = "assets/microphone.png";
  videoUrl: string = "assets/video.png";
  userPhoto: string;
  sipNumber: string
  userName: string;
  durationTime: string = "00:00:00"
  userAgent: any;
  callStatus: string;
  receivedCall: Boolean;

  constructor(private router: ActivatedRoute, private route: Router,
    private _userService: UserService, private _sipService: SipService) { }

  ngOnInit() {
    var user = {
      name: this.router.snapshot.params['name']
    };

    this.router.queryParams.subscribe(params => {
      this.receivedCall = params['received'];
    });

    // set call status
    this.callStatus = "calling " + user.name;

    // search the requested user and call
    if (user.name.length <= 0) this.goBack();
    this._userService.search(user.name)
      .subscribe((result: any) => {
        const resp: User[] = result;
        this.userToCall = resp.filter(item => item.name === user.name);
        if (this.userToCall != null) {
          this.userName = this.userToCall[0].name;
          this.userPhoto = this.userToCall[0].photo;
          this.sipNumber = this.userToCall[0].sip;

          if (this.receivedCall) {
            this.getSessionDurationTime();
            this._sipService.terminated.subscribe(term => {
              this.goBack();
            })
          } else {
            this.call(this.userToCall[0]);
          }
        }
      })

  }

  call(user: any) {
    var session = this._sipService.invite(user, this.remoteVideo);

    session.on('trackAdded', () => {
      var pc = session.sessionDescriptionHandler.peerConnection;
      this.getSessionDurationTime();
      // Gets remote tracks
      var remoteStream = new MediaStream();
      pc.getReceivers().forEach(function (receiver) {
        remoteStream.addTrack(receiver.track);
      });
      this.remoteVideo.nativeElement.srcObject = remoteStream;
      // // Gets local tracks
      // var localStream = new MediaStream();
      // pc.getSenders().forEach(function(sender) {
      //   localStream.addTrack(sender.track);
      // });
      // this.localVideo.nativeElement.srcObject = localStream;
      // Set call status
      this.callStatus = "on call";
    });

    session.on('rejected', () => {
      this.goBack();
    });

    session.on('bye', () => {
      setTimeout(() => {
        this.route.navigate(['/phone']);
      }, 2000);
    });
  }

  goBack() {
    if (!this.receivedCall) {
      this._sipService.terminate();
    } else {
      this._sipService.terminatePeer();
    }
    setTimeout(() => {
      this.route.navigate(['/phone']);
    }, 2000);

  }

  mute() {
    if (this.imgUrl == "assets/microphone.png") {
      this.imgUrl = "assets/cut-microphone.png";
      this.remoteVideo.nativeElement.muted = true;
    } else {
      this.imgUrl = "assets/microphone.png";
      this.remoteVideo.nativeElement.muted = false;
    }
  }

  video() {
    this.videoUrl == "assets/video.png" ? this.videoUrl = "assets/cut-video.png" : this.videoUrl = "assets/video.png";
  }

  getSessionDurationTime() {
    var start = new Date().getTime();
    setInterval(() => {
      // Get todays date and time
      var now = new Date().getTime();
      var duration = now - start;

      var hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((duration % (1000 * 60)) / 1000);

      var second = "";
      if (seconds < 10) {
        second = "0" + seconds;
      } else {
        second = seconds.toString();
      }

      var minute = "";
      if (minutes < 10) {
        minute = "0" + minutes;
      } else {
        minute = minutes.toString();
      }

      var hour = "";
      if (hours < 10) {
        hour = "0" + hours;
      } else {
        hour = hours.toString();
      }

      this.durationTime = hour + ":" + minute + ":" + second;
    }, 1000);
  }

}
