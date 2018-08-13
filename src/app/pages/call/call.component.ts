import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { map, filter } from 'rxjs/operators';
import { User } from '../../models/user.model';
import * as SIP from 'sip.js/dist/sip';
import { SipService } from '../../services/sip.service';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.css'],
  providers: [UserService]
})
export class CallComponent implements OnInit {
  
  @ViewChild('remoteVideo') remoteVideo: ElementRef;
  @ViewChild('localVideo') localVideo: ElementRef;
  @ViewChild('remoteAudio') remoteAudio: ElementRef;
  user: { name: string };
  userToCall: object;
  imgUrl: string;
  userPhoto: string;
  sipNumber: string
  userName: string;
  videoUrl: string;
  durationTime: string;
  userAgent;

  constructor(private router: ActivatedRoute, private route: Router,
    private _userService: UserService, private _sipService: SipService) { }

  ngOnInit() {
    this.user = {
      name: this.router.snapshot.params['name']
    };

    var member;

    if (this.user.name.length <= 0) this.goBack();

    this._userService.search(this.user.name)
    .subscribe((result: any) => {
      const resp : User[] =  result;
      this.userToCall = resp.filter(item => item.name === this.user.name);
      if(this.userToCall != null)
      {
        this.userName = this.userToCall[0].name;
        this.userPhoto = this.userToCall[0].photo;
        this.sipNumber = this.userToCall[0].sip;
        this.userAgent = this._sipService.register(this.userToCall[0]);
        this.call(this.userToCall[0]);
      }
    })

  }

  call(user: any) {
    this.imgUrl = "assets/microphone.png";
    this.videoUrl = "assets/video.png";
    //var session;

    // var userAgent = new SIP.UA({
    //   uri: '199@18.211.195.231',
    //   transportOptions: {
    //     wsServers: 'wss://18.211.195.231:8089/ws',
    //   },
    //   authorizationUser: '199',
    //   password: '199',
    //   register: false,
    //   registrarServer: 'sip:18.211.195.231'
    //   // turnServers: {
    //   //   urls:"turn:numb.viagenie.ca",
    //   //   username:"mariouzae@gmail.com",
    //   //   password:"dasilva"
    //   // }
    // });

    var session = this.userAgent.invite('200@18.212.213.193', {
      sessionDescriptionHandlerOptions: {
        constraints: {
          audio: true,
          video: false
        }
      }
    });
    
    session.on('trackAdded', () => {
      var pc = session.sessionDescriptionHandler.peerConnection;
      this.getSessionDurationTime();
      // Gets remote tracks
      var remoteStream = new MediaStream();
      pc.getReceivers().forEach(function(receiver) {
        remoteStream.addTrack(receiver.track);
      });
      this.remoteVideo.nativeElement.srcObject = remoteStream;
      
      // Gets local tracks
      var localStream = new MediaStream();
      pc.getSenders().forEach(function(sender) {
        localStream.addTrack(sender.track);
      });
      this.localVideo.nativeElement.srcObject = localStream;
    });

    session.on('bye', () => {
      setTimeout(() => {
        this.route.navigate(['/phone']);
      }, 2000);
    });
  }

  goBack() {
    this.route.navigate(['']);
  }

  mute()
  {
    if(this.imgUrl == "assets/microphone.png") {
      this.imgUrl = "assets/cut-microphone.png";
      this.remoteVideo.nativeElement.muted = true;
     } else {
      this.imgUrl = "assets/microphone.png";
      this.remoteVideo.nativeElement.muted = false;
     } 
  }

  video()
  {
    this.videoUrl == "assets/video.png" ? this.videoUrl = "assets/cut-video.png" : this.videoUrl = "assets/video.png";
  }

  getSessionDurationTime()
  {
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
