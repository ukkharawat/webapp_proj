import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { ValidateService } from '../../services/validate.service'
import { FlashMessagesService } from 'angular2-flash-messages'
import { Router , ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-reset-confirm',
  templateUrl: './reset-confirm.component.html',
  styleUrls: ['./reset-confirm.component.css']
})
export class ResetConfirmComponent implements OnInit {

  constructor(
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router:Router,
    private route: ActivatedRoute,
    private validateService : ValidateService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.username = params['username']
    })
  }

  username : String
  password : String

  public reset(){
    let user = {
      username : this.username,
      password : this.password
    }
    if(this.validateService.validateUser(user) == "success"){
      this.authService.resetConfirm(user).subscribe( data => {
        if(data.message){
          this.flashMessage.show("Now you can login with your new password" , { cssClass: 'alert-success', timeout: 3000 })
          this.router.navigate(['login'])
        }else{
          this.flashMessage.show("You can't reset your password" , { cssClass: 'alert-danger', timeout: 3000 })
          this.router.navigate(['/'])
        }
      })
    }else{
      this.flashMessage.show(this.validateService.validateUser(user) , { cssClass: 'alert-danger', timeout: 3000 })
      this.router.navigate(['/'])
    }
  }
}
