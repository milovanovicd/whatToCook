import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { BehaviorSubject, of } from "rxjs";
import { take, tap, switchMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { UserService } from "../auth/user/user.service";
import { FavouritesService } from "./favourites/favourites.service";

@Injectable({
  providedIn: "root",
})
export class RecipesService {
  private _recipes = new BehaviorSubject<Recipe[]>([]);
  private _myRecipes = new BehaviorSubject<Recipe[]>([]);
  private _categories: string[] = [
    "Breakfast",
    "Lunch",
    "Beverages",
    "Soups",
    "Salads",
    "Main dishes",
    "Desserts",
    "Freezing",
    "Breads",
  ];
  // private _favouriteRecipes = new BehaviorSubject<Recipe[]>([]);

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private favService: FavouritesService
  ) {}

  get recipes() {
    return this._recipes.asObservable();
  }
  get categories(){
    return this._categories;
  }
  get myRecipes() {
    return this._myRecipes.asObservable();
  }

  //SELECT
  fetchRecipes() {
    return this.http.get<Recipe[]>("http://localhost:3000/recipes").pipe(
      take(1),
      tap((recipes) => {
        this.favService.fetchFavouriteRecipes().subscribe(() => {
          this.favService.favouriteRecipes.subscribe((fav) => {
            for (let i = 0; i < fav.length; i++) {
              for (let j = 0; j < recipes.length; j++) {
                if (fav[i].id === recipes[j].id) {
                  recipes[j].isFavourite = true;
                }
              }
            }
            this._recipes.next(recipes);
          });
        });
      })
    );
  }

  fetchMyRecipes() {
    return this.http.get<Recipe[]>("http://localhost:3000/recipes").pipe(
      take(1),
      tap((recipes) => {
        const myRecipes = recipes.filter((r) => {
          return r.userId === this.userService.userId;
        });
        this._myRecipes.next(myRecipes);
      })
    );
  }

  getRecipe(recipeId: string) {
    return this.http.get<Recipe>(`http://localhost:3000/recipes/${recipeId}`);
  }

  //REMOVE
  deleteRecipe(recipeId: string) {
    return this.http.delete(`http://localhost:3000/recipes/${recipeId}`).pipe(
      switchMap(() => {
        return this.recipes;
      }),
      take(1),
      tap((recipes) => {
        this.favService
          .removeFromFavouritesByRecipeId(recipeId)
          .subscribe(() => {
            this._recipes.next(
              recipes.filter((r) => {
                r.id != recipeId;
              })
            );
          });
      })
    );
  }

  // CREATE
  addRecipe(
    title: string,
    description: string,
    image: string,
    ingredients: string[],
    cookingTime: number,
    userId: string,
    category: string
  ) {
    console.log(image);
    let generatedId: string; // Bitno je zbog scope-inga da devinišemo ovde kao promenljivu
    const newRecipe = new Recipe(
      Math.random().toString(),
      userId,
      title,
      description,
      image,
      ingredients,
      cookingTime,
      false,
      category
    );
    return this.http
      .post<{ id: string }>("http://localhost:3000/recipes", {
        ...newRecipe,
        id: null,
      })
      .pipe(
        switchMap((resData) => {
          generatedId = resData.id;
          return this.recipes;
        }),
        take(1),
        tap((recipes) => {
          newRecipe.id = generatedId;
          this._recipes.next(recipes.concat(newRecipe));
        })
      );
  }

  //UPDATE
  updateRecipe(
    recipeId: string,
    title: string,
    description: string,
    ingredients: string[],
    cookingTime: number,
    category:string
  ) {
    let updatedRecipes: Recipe[];
    return this.recipes.pipe(
      take(1),
      switchMap((recipes) => {
        if (!recipes || recipes.length <= 0) {
          return this.fetchRecipes();
        } else {
          return of(recipes);
        }
      }),
      switchMap((recipes) => {
        const updatedRecipeIndex = recipes.findIndex((r) => r.id === recipeId);
        const updatedRecipes = [...recipes];
        const oldRecipe = updatedRecipes[updatedRecipeIndex];
        updatedRecipes[updatedRecipeIndex] = new Recipe(
          oldRecipe.id,
          oldRecipe.userId,
          title,
          description,
          oldRecipe.imageUrl,
          ingredients,
          cookingTime,
          oldRecipe.isFavourite,
          category
        );

        return this.http.patch(`http://localhost:3000/recipes/${recipeId}`, {
          ...updatedRecipes[updatedRecipeIndex],
          id: null,
        });
      }),
      tap(() => {
        this._recipes.next(updatedRecipes);
      })
    );
  }
}
