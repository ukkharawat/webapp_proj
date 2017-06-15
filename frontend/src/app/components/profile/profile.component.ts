import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { FlashMessagesService } from 'angular2-flash-messages'
import { Router } from '@angular/router'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.authService.changeIsSearchable(true)
    const user = this.authService.getUser()
    this.url = "http://localhost:3000/user_image/" + user.displayImage
    this.username = user.username
    this.email = user.email
    this.role = user.authen == 1 ? "admin" : "user"
  }

  url : String
  username : String
  email : String
  role : String

}
