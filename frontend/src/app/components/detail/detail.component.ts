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
  message : String = ""
  isReview = false
  likes = []
  _id : Number

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
          this.reviewService.getReview().subscribe( rev => {
            this._id = rev._id
              if(rev.message){
                this.message = rev.message
              }else{
                for(var i = 0 ; i < rev.review.length ; i++){
                  var isLike = false
                  for(var j = 0 ; j < rev.review[i].count ; j++){
                    if(this.username == rev.review[i].who[j]){
                      isLike = true
                      break;
                    }
                  }
                  this.reviews.push(rev.review[i])
                  this.likes.push(isLike)
                }
              }
          })
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

  likeReview($event){
    var id = Number($event.target.id)
    if(this.likes[id]){
      this.reviewService.unlikeReview(this._id , this.reviews[id]._id).subscribe( data => {
        if(data){
          this.reviews[id].count -= 1
          this.likes[id] = !this.likes[id]
        }else{
          this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 })
        }
      })
    }else{
      this.reviewService.likeReview(this._id , this.reviews[id]._id).subscribe( data => {
        if(data){
          this.reviews[id].count += 1
          this.likes[id] = !this.likes[id]
        }else{
          this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 })
        }
      })
    }
  }

}
