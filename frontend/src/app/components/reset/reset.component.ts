import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { FlashMessagesService } from 'angular2-flash-messages'
import { Router } from '@angular/router'

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  constructor(
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit() {
    this.authService.changeIsSearchable(false)
  }

  email : String

  public resetPassword(){
    this.authService.resetPassword(this.email).subscribe(data => {
      if(data.message){
          this.flashMessage.show('Check your email for get your reset password link', { cssClass: 'alert-success', timeout: 3000 })
          this.router.navigate(['/'])
      }else{
          this.flashMessage.show("Your email doesn't exist", { cssClass: 'alert-success', timeout: 3000 })
      }
    })
  }

}
