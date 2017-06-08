import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CosmeticService } from '../../services/cosmetic.service'
import { AuthService } from '../../services/auth.service'
import { FlashMessagesService } from 'angular2-flash-messages'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  
  cosmetic = []
  reviews = []

  constructor(
    private flashMessage: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute,
    private cosmeticService: CosmeticService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
        this.cosmeticService.getCosmeticById(params['id']).subscribe( data => {
          this.cosmetic.push(data)
        })
    })
  }

  goToCosmetic(){
    this.router.navigate(['cosmetic' , this.cosmetic[0].category])
  }

}
