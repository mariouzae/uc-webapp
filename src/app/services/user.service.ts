import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: Http) { }
  
  //baseUrl: string = 'https://jsonplaceholder.typicode.com/users?username=';
  baseUrl: string = 'https://jsonplaceholder.typicode.com/users?name=';
  results: any[] = [];
  r: any[] = [[
    { name: 'milenetvargas', sip: '1060@18.212.213.193', photo: ''},
    { name: 'mariouzae', sip: '1061@18.212.213.193', photo: ''}
  ]
  ];

  search(queryString: string) {
    let _URL = this.baseUrl + queryString;
    //return this._http.get(_URL);
    return this.r;
  }
}
