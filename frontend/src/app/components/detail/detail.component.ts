import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CosmeticService } from '../../services/cosmetic.service'
import { ReviewService } from '../../services/review.service'
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
  username : String
  rating : Number = 0
  comment : String
  id : Number

  constructor(
    private flashMessage: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute,
    private cosmeticService: CosmeticService,
    private reviewService : ReviewService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    
    this.route.params.subscribe( params => {
      this.id = params['id']  
        this.cosmeticService.getCosmeticById(this.id).subscribe( data => {
          this.cosmetic.push(data)
          var user = this.authService.getUser()
          if(user){
            this.username = user.username
          }
        })
    })
  }

  goToCosmetic(){
    this.router.navigate(['cosmetic' , this.cosmetic[0].category])
  }

  onSelectionChange($event){
    this.rating = Number($event.target.id)
  }

  review(){
    var review = {
      starPoint : this.rating,
      content : this.comment
    }
    this.reviewService.review(review).subscribe( data => {
        if(data.message){
          this.flashMessage.show('Review done', { cssClass: 'alert-success', timeout: 3000 })
          window.scrollTo(0,0)
          location.reload()
        }else{
          this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 })
        }
    })
  }

}
