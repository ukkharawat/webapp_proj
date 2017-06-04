import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CosmeticService {

  constructor(private http: Http) {
  }

  getCosmeticByCategory(category){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    let ep = 'http://localhost:3000/getCosmeticsByCategory/' + category
    return this.http.get(ep, { headers: headers })
      .map(res => res.json());
  }

}
