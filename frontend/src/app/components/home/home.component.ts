import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router : Router,
    private authService : AuthService
  ) { }
  icons = [
    {
      name : "Face",
      url : "http://localhost:3000/image/face.png"
    },
    {
      name : "Cheek",
      url : "http://localhost:3000/image/cheek.png"
    },
    {
      name : "Bronzer",
      url : "http://localhost:3000/image/bronzer.png"
    },
    {
      name : "Lips",
      url : "http://localhost:3000/image/lips.png"
    },
    {
      name : "Eyes",
      url : "http://localhost:3000/image/eyes.png"
    },
    {
      name : "Eyebrow",
      url : "http://localhost:3000/image/eyebrow.png"
    }
  ]
  ngOnInit() {
    this.authService.changeIsSearchable(true)
  }

  public goToCategory(event){
    this.router.navigate(['/cosmetic' , event.target.id])
  }

}
