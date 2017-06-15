import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'
import { FlashMessagesService } from 'angular2-flash-messages'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  logo = "http://localhost:3000/image/logo.png"

  ngOnInit() {
  }

  public isCollapsed: boolean = false;

  public collapsed(event: any): void {
  }

  public expanded(event: any): void {
  }

  public logout(event: any): void {
    this.authService.logout()
    this.flashMessage.show('You are now logged out now', { cssClass: 'alert-success', timeout: 1000})
    this.router.navigate(['/'])
  }
}
