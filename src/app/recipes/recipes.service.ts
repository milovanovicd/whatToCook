import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { BehaviorSubject, of } from "rxjs";
import { take, map, tap, switchMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { UserService } from '../auth/user/user.service';

@Injectable({
  providedIn: "root",
})
export class RecipesService {
  private _recipes = new BehaviorSubject<Recipe[]>([]);
  private _myRecipes = new BehaviorSubject<Recipe[]>([]);
  private _favouriteRecipes = new BehaviorSubject<Recipe[]>([]);

  constructor(private http: HttpClient, private userService:UserService) {}

  //SELECT
  get recipes() {
    return this._recipes.asObservable();
  }

  get myRecipes() {
    return this._myRecipes.asObservable();
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>("http://localhost:3000/recipes").pipe(
      take(1),
      tap((recipes) => {
        this._recipes.next(recipes);
      })
    );
  }

  fetchMyRecipes() {
    return this.http.get<Recipe[]>("http://localhost:3000/recipes").pipe(
      take(1),
      tap((recipes) => {
        const myRecipes = recipes.filter(r =>{
          return r.userId === this.userService.userId;
        })
        this._myRecipes.next(myRecipes);
      })
    );
  }

  getRecipe(recipeId: string) {
    return this.http.get<Recipe>(`http://localhost:3000/recipes/${recipeId}`);
    // return this.recipes.pipe(
    //   take(1),
    //   map((recipes) => {
    //     return {
    //       ...recipes.find((r) => {
    //         return r.id === recipeId;
    //       }),
    //     };
    //   })
    // );
  }

  //REMOVE
  deleteRecipe(recipeId: string) {
    return this.http.delete(`http://localhost:3000/recipes/${recipeId}`).pipe(
      switchMap(()=>{
        return this.recipes;
      }),
      take(1),
      tap((recipes)=>{
        this._recipes.next(recipes.filter(r =>{
          r.id != recipeId;
        }))
      })
    )
  }

  // CREATE
  addRecipe(
    title: string,
    description: string,
    image:string,
    ingredients: string[],
    cookingTime: number,
    userId: string
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
      false
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
    // return this.recipes.pipe(take(1),tap(recipes=>{
    //   console.log(newRecipe);
    //   this._recipes.next(recipes.concat(newRecipe));
    // }))
  }

  //UPDATE
  updateRecipe(
    recipeId: string,
    title: string,
    description: string,
    ingredients: string[],
    cookingTime: number
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
          oldRecipe.isFavourite
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

  //ADD TO FAVOURITES
  addToFavourites(recipeId: string) {
    return this.recipes.pipe(
      take(1),
      tap((recipes) => {
        const favouriteRecipeIndex = recipes.findIndex(
          (r) => r.id === recipeId
        );
        const updatedRecipes = [...recipes];
        console.log(updatedRecipes[favouriteRecipeIndex]);
        updatedRecipes[favouriteRecipeIndex].isFavourite = true;
        console.log(updatedRecipes[favouriteRecipeIndex]);
        this._recipes.next(updatedRecipes);
      })
    );
  }

  removeFromFavourites(recipeId: string) {
    return this.recipes.pipe(
      take(1),
      tap((recipes) => {
        const favouriteRecipeIndex = recipes.findIndex(
          (r) => r.id === recipeId
        );
        const updatedRecipes = [...recipes];
        console.log(updatedRecipes[favouriteRecipeIndex]);
        updatedRecipes[favouriteRecipeIndex].isFavourite = false;
        console.log(updatedRecipes[favouriteRecipeIndex]);
        this._recipes.next(updatedRecipes);
      })
    );
  }
}
