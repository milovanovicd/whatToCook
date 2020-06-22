import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Recipe } from "../recipe.model";
import { HttpClient } from "@angular/common/http";
import { UserService } from "src/app/auth/user/user.service";
import { take, tap } from "rxjs/operators";
import { environment } from 'src/environments/environment';

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
        `${environment.API_URL}/favourites/${this.userService.userId}`
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
    .post(`${environment.API_URL}/favourites/`,{userId,recipeId});
  }

  removeFromFavourites(userId: string, recipeId: string) {
    return this.http
    .post(`${environment.API_URL}/favourites/remove`,{userId,recipeId});
  }

  removeFromFavouritesByRecipeId(recipeId: string) {
    return this.http
    .post(`${environment.API_URL}/favourites/remove-by-recipe/`,{recipeId});
  }
}
