import { Component, OnInit } from '@angular/core'
import { FileUploader } from 'ng2-file-upload/ng2-file-upload'
import { AuthService } from '../../services/auth.service'
import { FlashMessagesService } from 'angular2-flash-messages'
import { Router } from '@angular/router'
import { ValidateService } from '../../services/validate.service'

const URL = 'http://localhost:3000/user/upload'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  constructor(
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router,
    private validateService: ValidateService
  ) { }

  ngOnInit() {
    this.url = "http://localhost:3000/user_image/default_image.png"
  }

  public uploader: FileUploader = new FileUploader({ url: URL })
  username: String
  password: String
  repassword: String
  email: String
  filename: String
  url: String

  public readUrl(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  public register(e: any): void {
    let displayImage = ""
    if (this.uploader.queue[0]) {
      displayImage = this.uploader.queue[0].file.name
    } else {
      displayImage = "default_image.png"
    }
    const user = {
      username: this.username,
      password: this.password,
      email: this.email,
      displayImage: displayImage
    }
    if (this.validateService.validateUser(user) == "success") {
      if (this.validateService.matchPassword(user.password, this.repassword)) {
        if (this.validateService.validateUser(user.email)) {
          if (displayImage == "default_image.png") {
            this.authService.registerUser(user).subscribe(data => {
              if (data.message == "Success") {
                this.flashMessage.show('You are now registered and can log in', { cssClass: 'alert-success', timeout: 3000 })
                this.router.navigate(['/login'])
              } else {
                this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 })
                this.router.navigate(['/register'])
              }
            })
          } else {
            this.uploader.uploadAll()
            this.uploader.onCompleteItem = (item, res, sta, header) => {
              this.authService.registerUser(user).subscribe(data => {
                if (data.message == "Success") {
                  this.flashMessage.show('You are now registered and can log in', { cssClass: 'alert-success', timeout: 3000 })
                  this.router.navigate(['/login'])
                } else {
                  this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 })
                  this.router.navigate(['/register'])
                }
              })
            }
          }
        } else {
          this.flashMessage.show("Email is invalid", { cssClass: 'alert-danger', timeout: 3000 })
        }
      } else {
        this.flashMessage.show("Password don't match", { cssClass: 'alert-danger', timeout: 3000 })
      }
    } else {
      this.flashMessage.show(this.validateService.validateUser(user), { cssClass: 'alert-danger', timeout: 3000 })
    }
  }
}
