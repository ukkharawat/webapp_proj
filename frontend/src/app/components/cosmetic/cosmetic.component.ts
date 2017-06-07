import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CosmeticService } from '../../services/cosmetic.service'
import { AuthService } from '../../services/auth.service'
import { FlashMessagesService } from 'angular2-flash-messages'

@Component({
  selector: 'app-cosmetic',
  templateUrl: './cosmetic.component.html',
  styleUrls: ['./cosmetic.component.css']
})
export class CosmeticComponent implements OnInit {
  category: string
  cosmetics = []
  isAdmin : boolean
  constructor(
    private flashMessage: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute,
    private cosmetic: CosmeticService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.category = params['category']
      this.cosmetic.getCosmeticByCategory(this.category).subscribe(data => {
        if (this.authService.getUser()) {
          this.isAdmin = this.authService.isAdmin() == 1 ? true : false
          this.authService.getWishlist().subscribe(wishlist => {
            for (var i = 0; i < data.length; i++) {
              var like = false
              for (var j = 0; j < wishlist.length; j++) {
                if (data[i].id == wishlist[j].id) {
                  like = true
                  break
                }
              }
              this.cosmetics.push({
                name: data[i].name,
                brand: data[i].brand,
                like: like,
                image: data[i].image,
                id: data[i].id
              })
            }
          })
        } else {
          this.cosmetics = data
        }
      })
    })
  }

  addToWishlist(e) {
    if(this.cosmetics[e.target.id].like == true){
      this.cosmetic.removeFromWishlist(this.cosmetics[e.target.id].id).subscribe(data => {
        if (data.message) {
          this.flashMessage.show('Remove ' + this.cosmetics[e.target.id].name  + ' done', { cssClass: 'alert-success', timeout: 3000 })
          this.cosmetics[e.target.id].like = !this.cosmetics[e.target.id].like
        }
      })      
    }else{
      this.cosmetic.addToWishlist(this.cosmetics[e.target.id].id).subscribe(data => {
        if (data.message) {
          this.flashMessage.show('Add ' + this.cosmetics[e.target.id].name  + ' To wishlist', { cssClass: 'alert-success', timeout: 3000 })
          this.cosmetics[e.target.id].like = !this.cosmetics[e.target.id].like
        }
      })
    }
  }

  edit(e) {
    this.router.navigate(['/edit' , this.cosmetics[e.target.id].id])
  }

}
