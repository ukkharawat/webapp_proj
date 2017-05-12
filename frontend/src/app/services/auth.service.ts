import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()

export class AuthService {
  authToken: any
  admin: boolean
  user: any
  isDev: boolean

  constructor(private http: Http) {
    this.isDev = true; // Change to false before deployment
  }

  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    let ep = 'http://localhost:3000/user/register'
    return this.http.post(ep, user, { headers: headers })
      .map(res => res.json());
  }

  loginUser(user) {
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/user/login', user, { headers: headers })
      .map(res => res.json())
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token)
    localStorage.setItem('user', JSON.stringify(user))
    this.authToken = token
    this.user = user
    this.admin = user.authen == 1 ? true : false
  }

  logout() {
    this.authToken = null
    this.user = null
    this.admin = false
    localStorage.clear()
  }

  loadToken() {
    const token = localStorage.getItem('id_token')
    this.authToken = token
  }

  loggedIn() {
    return tokenNotExpired('id_token')
  }

  isAdmin() {
    return this.admin
  }

  getUser() {
    return this.user
  }
}
