import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as SIP from 'sip.js/dist/sip';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.css']
})
export class CallComponent implements OnInit {
  
  @ViewChild('remoteVideo') remoteVideo: ElementRef;
  @ViewChild('localVideo') localVideo: ElementRef;
  @ViewChild('remoteAudio') remoteAudio: ElementRef;
  user: { name: string };
  imgUrl: string;
  videoUrl: string;
  durationTime: string;

  constructor(private router: ActivatedRoute, private route: Router) { }

  ngOnInit() {
    this.user = {
      name: this.router.snapshot.params['name']
    };

    this.imgUrl = "assets/microphone.png";
    this.videoUrl = "assets/video.png";

    var userAgent = new SIP.UA({
      uri: '199@18.211.195.231',
      transportOptions: {
        wsServers: 'wss://18.211.195.231:8089/ws',
      },
      authorizationUser: '199',
      password: '199',
      register: false,
      registrarServer: 'sip:18.211.195.231',
      turnServers: {
        urls:"turn:numb.viagenie.ca",
        username:"mariouzae@gmail.com",
        password:"dasilva"
      }
    });

    var session = userAgent.invite('200@18.212.213.193', {
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
      console.log(localStream.getAudioTracks()[0]);
      var t = localStream.getAudioTracks()[0].stop();
      //console.log("Muted" + t.enabled);
      //localStream.getAudioTracks()[0].enabled = false;
    });

  }

  goBack() {
    this.route.navigate(['']);
  }

  mute()
  {
    if(this.imgUrl == "assets/microphone.png") {
      this.imgUrl = "assets/cut-microphone.png";
      //console.log(this.remoteVideo.nativeElement.getVideoTracks);
     } else {
      this.imgUrl = "assets/microphone.png";
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
