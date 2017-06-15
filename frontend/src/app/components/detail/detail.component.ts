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
  cmessage = []
  isReview = false
  likes = []
  _id : Number
  editable = []
  limit = 2
  model = {
    rating: ""
  }
  edit = false
  idComment : any

  constructor(
    private flashMessage: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute,
    private cosmeticService: CosmeticService,
    private reviewService : ReviewService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.changeIsSearchable(true)
    this.route.params.subscribe( params => {
      this.id = params['id']  
        this.cosmeticService.getCosmeticById(this.id).subscribe( data => {
          this.cosmetic.push(data)
          var user = this.authService.getUser()
          if(user){
            this.username = user.username
          }
          this.reviewService.getReview(this.cosmetic[0].name).subscribe( rev => {
            this._id = rev._id
              if(rev.message){
                this.message = rev.message
              }else{
                for(var i = 0 ; i < rev.review.length ; i++){
                  var isLike = false
                  if(rev.review[i].reviewer == this.username){
                    this.editable.push(true)
                  }else{
                    this.editable.push(false)
                  }
                  for(var j = 0 ; j < rev.review[i].count ; j++){
                    if(this.username == rev.review[i].who[j]){
                      isLike = true
                      break;
                    }
                  }
                  if(rev.review[i].count != 0 ){
                    if(isLike){
                      if(rev.review[i].count == 1 ){
                        this.cmessage.push("You like this")
                      }else{
                        this.cmessage.push("You and " + ( rev.review[i].count-1) + " others")
                      }
                      
                    }else{
                      this.cmessage.push(rev.review[i].count + " others")
                    }
                  }else{
                    this.cmessage.push("")
                  }
                  this.reviews.push(rev.review[i])
                  this.likes.push(isLike)
                }
              }
          })
        })
    })
  }

  expand(){
    this.limit += 10
  }

  goToCosmetic(){
    this.router.navigate(['cosmetic' , this.cosmetic[0].category])
  }

  goToBrand(){
    this.router.navigate(['brand' , this.cosmetic[0].brand])
  }

  onSelectionChange($event){
    this.rating = Number($event.target.id)
  }

  review(){
     var review = {
        starPoint : this.rating,
        content : this.comment,
        cosmetic_name : this.cosmetic[0].name
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
          if(this.reviews[id].count == 0){
            this.cmessage[id] =  ""
          }else{
            this.cmessage[id] =  this.reviews[id].count + " others"
          }
        }else{
          this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 })
        }
      })
    }else{
      this.reviewService.likeReview(this._id , this.reviews[id]._id).subscribe( data => {
        if(data){
          this.reviews[id].count += 1
          this.likes[id] = !this.likes[id]
          if(this.reviews[id].count == 1){
            this.cmessage[id] =  "You like this"
          }else{
            this.cmessage[id] = "You and " + (this.reviews[id].count-1) + " others"
          }
        }else{
          this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 })
        }
      })
    }
  }

  editComment($event){
    var i = Number($event.target.id)
    this.comment = this.reviews[i].content
    switch(this.reviews[i].starPoint){
      case 0.5 : this.model.rating = "half" ;break;
      case 1 : this.model.rating = "1" ;break;
      case 1.5 : this.model.rating = "1 and a half" ;break;
      case 2 : this.model.rating = "2" ;break;
      case 2.5 : this.model.rating = "2 and a half" ;break;
      case 3 : this.model.rating = "3" ;break;
      case 3.5 : this.model.rating = "3 and a half" ;break;
      case 4 : this.model.rating = "4" ;break;
      case 4.5 : this.model.rating = "4 and a half" ;break;
      case 5 : this.model.rating = "5" ;break;
    }
    this.rating = Number(this.reviews[i].starPoint)
    this.edit = true
    this.idComment = this.reviews[i]._id
    window.scrollTo(0,400)
  }

  cancelEdit(){
    this.model.rating = ""
    this.comment = ""
    this.rating = 0
    this.edit = false
  }

  editReview(){
    var ncomment = {
      id : this._id,
      content : this.comment,
      starPoint : this.rating,
      idReview : this.idComment 
    }
    this.reviewService.editReview(ncomment).subscribe( data => {
      if(data){
        this.flashMessage.show('Edit done', { cssClass: 'alert-success', timeout: 3000 })
        window.scrollTo(0,0)
        location.reload()
      }else{
        this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 })
      }
    })
  }
}
