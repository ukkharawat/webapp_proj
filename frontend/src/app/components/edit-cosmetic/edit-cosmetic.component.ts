import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload'
import { AuthService } from '../../services/auth.service'
import { FlashMessagesService } from 'angular2-flash-messages'
import { Router , ActivatedRoute } from '@angular/router'
import { CosmeticService } from '../../services/cosmetic.service'

const URL = 'http://localhost:3000/upload'

@Component({
  selector: 'app-edit-cosmetic',
  templateUrl: './edit-cosmetic.component.html',
  styleUrls: ['./edit-cosmetic.component.css']
})
export class EditCosmeticComponent implements OnInit {

  constructor(
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router,
    private route : ActivatedRoute ,
    private cosmeticService: CosmeticService
  ) { }

  url = "http://localhost:3000/cosmetic_image/default_image.png"
  category = "Face"
  name : string
  brand : string
  quality : string
  color: string = "#127bdc"
  colors : Array<string> = []
  detail : string
  id : number
  old_image : string

  public uploader: FileUploader = new FileUploader({ url: URL })

  ngOnInit() {
    if(this.authService.isAdmin() == 0){
      this.router.navigate(['/'])
    }else{
      this.route.params.subscribe(params => {
       this.cosmeticService.getCosmeticById(params['id']).subscribe(data => {
         this.url = "http://localhost:3000/cosmetic_image/" + data.image
         this.brand = data.brand
         this.colors = data.color
         this.detail = data.detail
         this.name = data.name
         this.quality = data.quality
         this.category = data.category
         this.id = data.id
         this.old_image = data.image
       })
      })
    }
  }

  addColors(){
      var check = false
      for(var i = 0 ; i < this.colors.length ; i++){
        if(this.colors[i] == this.color){
          check = true
        }
      }
      if(!check){
        this.colors.push(this.color)
      }else{
        this.flashMessage.show("Currently color is in Palette" , { cssClass: 'alert-danger', timeout: 1000 })
      }
  }

  remove(i){
    this.colors.splice( i , 1)
  }

  public readUrl(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  edit(){
    const cosmetic = {
      id : this.id ,
      image: this.old_image,
      brand: this.brand,
      category: this.category,
      quality: this.quality,
      color: this.colors,
      name: this.name,
      detail: this.detail
    }
    if(this.url != "http://localhost:3000/cosmetic_image/" + this.old_image){
      cosmetic.image = this.uploader.queue[0].file.name
      this.uploader.uploadAll()
      this.uploader.onCompleteItem = (item, res, sta, header) =>  {
        this.cosmeticService.editCosmetic(cosmetic).subscribe(data => {
          if (data.message) {
            this.flashMessage.show('Edit done', { cssClass: 'alert-success', timeout: 3000 })
            this.router.navigate(['/'])
          } else {
            this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 })
          }
        })
      }
    }else{
      this.cosmeticService.editCosmetic(cosmetic).subscribe(data => {
          if (data.message) {
            this.flashMessage.show('Edit done', { cssClass: 'alert-success', timeout: 3000 })
            this.router.navigate(['/'])
          } else {
            this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 })
          }
      })
    }
  }


}
