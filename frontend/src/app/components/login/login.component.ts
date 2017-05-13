import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { FlashMessagesService } from 'angular2-flash-messages'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router:Router
  ) { }

  username : String
  password : String
  
  ngOnInit() {
  }

  public login(event:any) :void {
    const user = {
      username : this.username,
      password : this.password
    }

    this.authService.loginUser(user).subscribe(data => {
      if(data.success){
        this.authService.storeUserData(data.token, data.user)
        this.flashMessage.show('You are now logged in', {
          cssClass: 'alert-success',
          timeout: 5000})
        this.router.navigate(['/'])
      }else{
        this.flashMessage.show(data.message, {
          cssClass: 'alert-danger',
          timeout: 5000})
        this.router.navigate(['login'])
      }
    })


  }
}
