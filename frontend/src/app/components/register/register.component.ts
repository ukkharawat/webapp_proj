import { Component, OnInit } from '@angular/core'
import { FileUploader } from 'ng2-file-upload/ng2-file-upload'
import { AuthService } from '../../services/auth.service'
import { FlashMessagesService } from 'angular2-flash-messages'
import { Router } from '@angular/router'

const URL = 'http://localhost:3000/user/upload'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  constructor(
    private flashMessage:FlashMessagesService,
    private authService:AuthService
  ) { }

  ngOnInit() {
  }

  public uploader:FileUploader = new FileUploader({url: URL})
  username: String 
  password: String
  email: String
  filename: String
  url : String

  public readUrl(event) {
    
  }

  public register(e:any):void {
    const user = {
      username : this.username,
      password : this.password,
      email : this.email,
      displayImage : this.uploader.queue[0].file.name
    }
    this.authService.registerUser(user).subscribe(data => {
      if(data.message == "Success"){
        this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000})
        this.uploader.uploadAll()
      }else{
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000})
      }
      /*if(data.success){
        this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
        //this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }*/
    })
    // this.uploader.uploadAll()
    // this.uploader.onCompleteItem = (item , res , sta , header) => {
    //     res => this.data = res.json()
    //     console.log(this.data)
    // }
  }


}
