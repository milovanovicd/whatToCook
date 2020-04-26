import { Component, OnInit } from '@angular/core';
import {SegmentChangeEventDetail} from '@ionic/core';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {
  segment:'favourites'|'my-recipes' = 'favourites';
  constructor() { }

  ngOnInit() {
  }

  segmentChanged(event:CustomEvent<SegmentChangeEventDetail>){
    if(event.detail.value === 'favourites'){
      this.segment='favourites';
      console.log(this.segment);
    }else{
      this.segment='my-recipes';
      console.log(this.segment);
    }
  }
}
