import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.css']
})
export class CallComponent implements OnInit {

  user: { name: string };
  constructor(private router : ActivatedRoute, private route: Router) {}

  ngOnInit() {
    this.user = {
      name: this.router.snapshot.params['name']
    };
    console.log(this.user.name);
  }

  goBack()
  {
    this.route.navigate(['']);
  }

}
