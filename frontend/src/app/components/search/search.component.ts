import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { CosmeticService } from '../../services/cosmetic.service'


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  cosmetics = []
  open = false
  current = 0
  word = ""
  matches = []
  currentCosmetic : any

  constructor(
    private router: Router,
    private cosmeticService: CosmeticService
  ) { }

  ngOnInit() {
    this.cosmeticService.getAllCosmetic().subscribe(data => {
      this.cosmetics = data
    })
  }

  valuechange(e){
    var list = []
    if(e != ""){
      for(var i in this.cosmetics){
        if(this.cosmetics[i].name.toLowerCase().indexOf(e.toLowerCase()) >= 0){
          list.push(this.cosmetics[i])
        }
      }
    }
    this.matches = list
    if(this.matches.length > 0){
      this.open = true
    }else{
      this.open = false
    }
  }

  isActive(index) {
      return index === this.current;
  }

  enter( e){
    switch(e.code){
      case "Enter" : {
        this.currentCosmetic = this.matches[this.current]
        this.word = this.currentCosmetic.name
        this.open = false
        this.goTo()
        break
      }
      case "ArrowDown" : {
        this.down()
        break
      }
      case "ArrowUp" : {
        this.up()
        break
      }
      case "Backspace" : {
        this.current = 0
      }
    }
  }

  down(){
    if(this.current < this.matches.length - 1)
      this.current++
  }

  up(){
    if(this.current > 0)
      this.current--
  }

  click(index){
    this.currentCosmetic = this.matches[index]
    this.word = this.currentCosmetic.name
    this.open = false
    this.goTo()
  }

  goTo(){
    this.router.navigate(['/']).then( () => {
      this.router.navigate(['/detail',  this.currentCosmetic.id])
    })
  }

}
