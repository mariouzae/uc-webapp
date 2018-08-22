import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
//import { map } from '../../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: Http) { }
  
  //baseUrl: string = 'https://jsonplaceholder.typicode.com/users?name=';
  baseUrl: any = "assets/data.json";
  results: any[] = [];

  search(queryString: string) {
    //let _URL = this.baseUrl + queryString;
    return this._http.get(this.baseUrl).pipe(
      map((response: Response) => {
        return response.json();
      })
    );
  }

}
