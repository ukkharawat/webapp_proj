import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { CosmeticService } from '../../services/cosmetic.service'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-cosmetic',
  templateUrl: './cosmetic.component.html',
  styleUrls: ['./cosmetic.component.css']
})
export class CosmeticComponent implements OnInit {
  category : string
  cosmetics = []
  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private cosmetic : CosmeticService,
    private authService : AuthService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.category = params['category']
       this.cosmetic.getCosmeticByCategory(this.category).subscribe(data => {
         if(this.authService.getUser()){
          for(var i = 0 ; i < data.length ; i++){
              var like = false
              for(var j = 0 ; j < data[i].like.count ; j++){
                  if(this.authService.getUser().username == data[i].like.who[j]){
                    like = true
                    break;
                  }
              }
              this.cosmetics.push({
                name : data[i].name,
                brand : data[i].brand,
                like : like,
                image : data[i].image
              })
          }
         }else{
          this.cosmetics = data
         }
       })
    })
  }

  hover(e){
    for(var i = 0 ; i < this.cosmetics.length ; i++){
      if(this.cosmetics[i].name = e.target.id){
        this.cosmetics[i].like = !this.cosmetics[i].like
      }
    }
  }

  addToWishlist(e){
    for(var i = 0 ; i < this.cosmetics.length ; i++){
        if(this.cosmetics[i].name = e.target.id){
          this.cosmetics[i].like = !this.cosmetics[i].like
        }
      }
    this.cosmetic.addToWishlist(e.target.id).subscribe(data => {
      
    })
  }

}
