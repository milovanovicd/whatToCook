import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Recipe } from "../../recipe.model";
import { Subscription } from "rxjs";
import { RecipesService } from "../../recipes.service";

@Component({
  selector: 'app-favourites-list',
  templateUrl: './favourites-list.component.html',
  styleUrls: ['./favourites-list.component.scss'],
})
export class FavouritesListComponent implements OnInit{
  @Input() favouriteRecipes: Recipe[];

  constructor() {}

  ngOnInit() {
  }

}
