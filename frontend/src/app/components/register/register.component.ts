import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Http, Headers } from '@angular/http'
const URL = 'http://localhost:3000/user/upload'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  constructor(private http:Http) { }

  ngOnInit() {
  }

  public uploader:FileUploader = new FileUploader({url: URL})
  username: String 
  password: String
  email: String
 

  public register(e:any):void {
    // this.uploader.uploadAll()
    // this.uploader.onCompleteItem = (item , res , sta , header) => {
    //     res => this.data = res.json()
    //     console.log(this.data)
    // }
  }


}
