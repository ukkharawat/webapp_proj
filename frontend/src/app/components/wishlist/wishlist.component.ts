import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CosmeticService } from '../../services/cosmetic.service'
import { AuthService } from '../../services/auth.service'
import { FlashMessagesService } from 'angular2-flash-messages'

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(
    private flashMessage: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute,
    private cosmetic: CosmeticService,
    private authService: AuthService
  ) { }
  cosmetics = []
  ngOnInit() {
    var wishlists = []
    this.authService.getWishlist().subscribe(wishlist => {
      for(var i = 0 ; i < wishlist.length ; i++){
        wishlists.push(wishlist[i].id)
      }
      this.cosmetic.getCosmeticByIds(wishlists).subscribe(data => {
        this.cosmetics = data
      })
    })
  }

  removeFromWishlist(e) {
    this.cosmetic.removeFromWishlist(this.cosmetics[e.target.id].id).subscribe(data => {
      if(data.message == "success"){
        this.flashMessage.show('Remove ' + this.cosmetics[e.target.id].name  + ' done', { cssClass: 'alert-success', timeout: 3000 })
        this.cosmetics.splice(e.target.id , 1)
      }
    })
  }

}
