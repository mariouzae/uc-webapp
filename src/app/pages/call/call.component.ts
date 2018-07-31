import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as SIP from 'sip.js/dist/sip';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.css']
})
export class CallComponent implements OnInit {

  user: { name: string };
  constructor(private router: ActivatedRoute, private route: Router) { }

  ngOnInit() {
    this.user = {
      name: this.router.snapshot.params['name']
    };

    var userAgent = new SIP.UA({
      uri: '199@18.211.195.231',
      transportOptions: {
        wsServers: 'wss://18.211.195.231:8089/ws',
      },
      authorizationUser: '199',
      password: '199',
      register: true,
      registrarServer: '18.211.195.231:8089'
    });

    var session = userAgent.invite('200@18.212.213.193', {
      sessionDescriptionHandlerOptions: {
        constraints: {
          audio: true,
          video: false
        }
      }
    });

  }

  goBack() {
    this.route.navigate(['']);
  }

}
