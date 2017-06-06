import { Component, OnInit } from '@angular/core'
import { FileUploader } from 'ng2-file-upload/ng2-file-upload'
import { AuthService } from '../../services/auth.service'
import { FlashMessagesService } from 'angular2-flash-messages'
import { Router } from '@angular/router'
import { CosmeticService } from '../../services/cosmetic.service'

const URL = 'http://localhost:3000/upload'

@Component({
  selector: 'app-add-cosmetic',
  templateUrl: './add-cosmetic.component.html',
  styleUrls: ['./add-cosmetic.component.css']
})
export class AddCosmeticComponent implements OnInit {

  constructor(
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router,
    private cosmeticService: CosmeticService
  ) { }

  url = "http://localhost:3000/cosmetic_image/default_image.png"
  category = "Face"
  name : String
  brand : String
  quality : String
  color: string = "#127bdc"
  colors : Array<string> = []
  detail : string

  public uploader: FileUploader = new FileUploader({ url: URL })

  ngOnInit() {
    if(this.authService.isAdmin() == 0){
      this.router.navigate(['/'])
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

  add(){
    const cosmetic = {
        image: this.uploader.queue[0].file.name,
        brand: this.brand,
        category: this.category,
        quality: this.quality,
        color: this.colors,
        name: this.name,
        detail: this.detail,
    }
    this.uploader.uploadAll()
      this.uploader.onCompleteItem = (item, res, sta, header) => {
        this.cosmeticService.addCosmetic(cosmetic).subscribe(data => {
          if (data.message == "success") {
            this.flashMessage.show('Add done', { cssClass: 'alert-success', timeout: 3000 })
            this.router.navigate(['/'])
          } else {
            this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 })
            this.router.navigate(['/add'])
          }
        })
      }
  }

}
