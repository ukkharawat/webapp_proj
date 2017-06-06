import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service'

@Injectable()
export class CosmeticService {

  constructor(private http: Http , private authService : AuthService) {
  }

  getCosmeticByCategory(category){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    let ep = 'http://localhost:3000/getCosmeticsByCategory/' + category
    return this.http.get(ep, { headers: headers })
      .map(res => res.json());
  }

  addToWishlist(id){
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type', 'application/json')
    let ep = 'http://localhost:3000/addToWishlist?id='+ id 
    return this.http.get(ep, { headers: headers })
      .map(res => res.json());
  }

  addCosmetic(cosmetic){
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type', 'application/json')
    let ep = 'http://localhost:3000/addCosmetic'
    return this.http.post(ep, cosmetic , { headers: headers })
      .map(res => res.json());
  }

  getCosmeticByIds(ids){
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type', 'application/json')
    let ep = 'http://localhost:3000/getCosmeticByIds'
    return this.http.post(ep, ids , { headers: headers })
      .map(res => res.json());
  }

}
