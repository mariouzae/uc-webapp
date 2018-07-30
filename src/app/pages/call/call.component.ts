import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as SIP from 'sip.js';

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
      uri: '1060@18.212.213.193',
      wsServers: 'wss://18.212.213.193:8089/ws',
      authorizationUser: '1060',
      password: 'password',
      register: false,
      registrarServer: '18.212.213.193:8089'
    });

    // var session = userAgent.invite('1061@18.212.213.193', {
    //   sessionDescriptionHandlerOptions: {
    //     constraints: {
    //       audio: true,
    //       video: false
    //     }
    //   }
    // });

  }

  goBack() {
    this.route.navigate(['']);
  }

}
