import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: Http) { }
  
  baseUrl: string = 'https://jsonplaceholder.typicode.com/users?username=';
  results: any[] = [];

  search(queryString: string) {
    let _URL = this.baseUrl + queryString;
    return this._http.get(_URL);
  }
}
