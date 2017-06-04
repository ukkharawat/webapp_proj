import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-cosmetic',
  templateUrl: './cosmetic.component.html',
  styleUrls: ['./cosmetic.component.css']
})
export class CosmeticComponent implements OnInit {
  hello : string
  constructor(
    private router:Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.hello = params['category']
    })
  }

}
