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

    // var session = userAgent.invite('200@18.212.213.193', {
    //   sessionDescriptionHandlerOptions: {
    //     constraints: {
    //       audio: true,
    //       video: false
    //     }
    //   }
    // });

    // session.on('trackAdded', () => {
    //   var pc = session.sessionDescriptionHandler.peerConnection;
      
    //   // Gets remote tracks
    //   var remoteStream = new MediaStream();
    //   pc.getReceivers().forEach(function(receiver) {
    //     remoteStream.addTrack(receiver.track);
    //   });
    //   this.remoteVideo.nativeElement.srcObject = remoteStream;

    //   // Gets local tracks
    //   var localStream = new MediaStream();
    //   pc.getSenders().forEach(function(sender) {
    //     localStream.addTrack(sender.track);
    //   });
    //   this.localVideo.nativeElement.srcObject = localStream;
    // });

   

  }

  goBack() {
    this.route.navigate(['']);
  }

  mute()
  {
    this.imgUrl == "assets/microphone.png" ? this.imgUrl = "assets/cut-microphone.png" : this.imgUrl = "assets/microphone.png";
  }

  video()
  {
    this.videoUrl == "assets/video.png" ? this.videoUrl = "assets/cut-video.png" : this.videoUrl = "assets/video.png";
  }

}
