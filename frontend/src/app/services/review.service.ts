import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service'

@Injectable()
export class ReviewService {

  constructor(private http: Http , private authService : AuthService) 
  { }

  review(rev){
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type', 'application/json')
    let ep = 'http://localhost:3000/review/review'
    return this.http.post(ep, rev , { headers: headers })
      .map(res => res.json());
  }

  getReview(cosmetic_name){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    let ep = 'http://localhost:3000/review/getAllReview?cosmetic_name=' + cosmetic_name
    return this.http.get(ep, { headers: headers })
      .map(res => res.json());
  }

  likeReview(_id , idReview){
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type', 'application/json')
    let ep = 'http://localhost:3000/review/likeReview?id=' + _id + '&idReview=' + idReview
    return this.http.get(ep, { headers: headers })
      .map(res => res.json());
  }

  unlikeReview(_id , idReview){
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type', 'application/json')
    let ep = 'http://localhost:3000/review/unlikeReview?id=' + _id + '&idReview=' + idReview
    return this.http.get(ep, { headers: headers })
      .map(res => res.json());
  }

  editReview(ncontent){
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type', 'application/json')
    let ep = 'http://localhost:3000/review/editReview'
    return this.http.post(ep, ncontent , { headers: headers })
      .map(res => res.json());
  }

}
