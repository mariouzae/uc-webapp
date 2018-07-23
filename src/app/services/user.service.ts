import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map, debounceTime } from 'rxjs/operators';

@Injectable()
export class UserService {

    url: string
    constructor(private http: Http) {
        this.url = 'https://api.datamuse.com/words?ml='
    }

    search_word(term) {
        return this.http.get(this.url + term)
            .pipe(map(res => { return res.json() }));
    }
}