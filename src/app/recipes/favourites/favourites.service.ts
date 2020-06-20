import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Recipe } from "../recipe.model";
import { HttpClient } from "@angular/common/http";
import { UserService } from "src/app/auth/user/user.service";
import { take, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class FavouritesService {

  private _favouriteRecipes = new BehaviorSubject<Recipe[]>([]);
  constructor(private http: HttpClient, private userService: UserService) {}

  get favouriteRecipes() {
    return this._favouriteRecipes.asObservable();
  }

  fetchFavouriteRecipes() {
    return this.http
      .get<Recipe[]>(
        "http://localhost:3000/favourites/" + this.userService.userId
      )
      .pipe(
        take(1),
        tap((recipes) => {
          this._favouriteRecipes.next(recipes);
        })
      );
  }


  addToFavourites(userId: string, recipeId: string) {
    return this.http
    .post("http://localhost:3000/favourites/",{userId,recipeId});
  }

  removeFromFavourites(userId: string, recipeId: string) {
    return this.http
    .post("http://localhost:3000/favourites/remove",{userId,recipeId});
  }

  removeFromFavouritesByRecipeId(recipeId: string) {
    return this.http
    .post("http://localhost:3000/favourites/remove-by-recipe/",{recipeId});
  }
}
