import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-add-cosmetic',
  templateUrl: './add-cosmetic.component.html',
  styleUrls: ['./add-cosmetic.component.css']
})
export class AddCosmeticComponent implements OnInit {

  constructor(
    private autheService : AuthService,
    private router : Router
  ) { }

  ngOnInit() {
    if(this.autheService.isAdmin() == 0){
      this.router.navigate(['/'])
    }
  }

}
