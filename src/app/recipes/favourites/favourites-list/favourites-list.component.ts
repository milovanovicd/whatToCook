import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Recipe } from "../../recipe.model";
import { Subscription } from "rxjs";
import { RecipesService } from "../../recipes.service";
import { FavouritesService } from '../favourites.service';

@Component({
  selector: 'app-favourites-list',
  templateUrl: './favourites-list.component.html',
  styleUrls: ['./favourites-list.component.scss'],
})
export class FavouritesListComponent implements OnInit,OnDestroy{
  @Input() isLoading:boolean;
  favouriteRecipes:Recipe[];
  favSub:Subscription;
  constructor(private favService:FavouritesService) {}

  ngOnInit() {
    this.favSub = this.favService.favouriteRecipes.subscribe(favs =>{
      this.favouriteRecipes = favs;
    })
  }

  ngOnDestroy(){
    if(this.favSub){
      this.favSub.unsubscribe();
    }
  }

}
