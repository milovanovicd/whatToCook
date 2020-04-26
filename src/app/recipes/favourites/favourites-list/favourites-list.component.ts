import { Component, OnInit, OnDestroy } from "@angular/core";
import { Recipe } from "../../recipe.model";
import { Subscription } from "rxjs";
import { RecipesService } from "../../recipes.service";

@Component({
  selector: 'app-favourites-list',
  templateUrl: './favourites-list.component.html',
  styleUrls: ['./favourites-list.component.scss'],
})
export class FavouritesListComponent implements OnInit, OnDestroy {
  favouriteRecipes: Recipe[];
  favouriteSub: Subscription;

  constructor(private recipesService: RecipesService) {}

  ngOnInit() {
    this.favouriteSub = this.recipesService.recipes.subscribe((favourites) => {
      this.favouriteRecipes = favourites.filter((recipe) => {
        return recipe.isFavourite;
      });
      console.log(this.favouriteRecipes);
    });
  }

  ngOnDestroy() {
    if (this.favouriteSub) {
      this.favouriteSub.unsubscribe();
    }
  }
}
