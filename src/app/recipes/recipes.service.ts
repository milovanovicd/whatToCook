import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { BehaviorSubject } from "rxjs";
import { take, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class RecipesService {
  private _recipes = new BehaviorSubject<Recipe[]>([
    new Recipe(
      "r1",
      "user1",
      "Cabbage Salad with Peanuts",
      "A simple vegan/gluten-free cabbage salad that has crunch from toasted peanuts and an easy dressing of rice vinegar and peanut oil.",
      "https://smittenkitchendotcom.files.wordpress.com/2010/04/cabbage-and-lime-salad-with-roasted-peanuts.jpg",
      ["Cabbage ", "Salt", "Peanuts", "Oil"],
      20,
      false
    ),
    new Recipe(
      "r2",
      "user1",
      "Veggistrone",
      "This vegetable-packed minestrone soup recipe is inspired by a popular Weight Watchers vegetable soup recipe.",
      "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F3935697.jpg",
      ["Onions", "Carrots", "Cabbage", "Water"],
      45,
      false
    ),
    new Recipe(
      "r3",
      "user3",
      "Strawberry Smoothie",
      "Healthy Strawberry Smoothie Recipe with frozen strawberries, banana and without yogurt.",
      "https://cp.lbbcdn.com/wp-content/uploads/2016/08/Strawberry-Raspberry-Smoothie-no-wm.jpg",
      ["Strawberry ", "Milk", "Banana", "Yogurt"],
      15,
      true
    ),
    new Recipe(
      "r4",
      "user2",
      "Cheesecake",
      "But as delicious as cream cheese is, it needs some helpers to become a tasty cheesecake.",
      "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/k%2Farchive%2F7b084eaf9d7d564dd2667094c3dd1260a5e4d646",
      ["Butter ", "Sugar", "Eggs", "Cherry"],
      30,
      true
    ),
    new Recipe(
      "r5",
      "user1",
      "Capricciosa Pizza",
      "Authentic Italian pizza topped with prosciutto cotto, artichoke hearts, cremini mushrooms, black olives and mild salami.",
      "https://upload.wikimedia.org/wikipedia/commons/d/d3/Supreme_pizza.jpg",
      ["Cheese ", "Ham", "Tomato", "Mushrooms"],
      20,
      false
    ),
  ]);
  constructor(){}

  //SELECT
  get recipes() {
    return this._recipes.asObservable();
  }

  getRecipe(recipeId: string) {
    return this.recipes.pipe(
      take(1),
      map((recipes) => {
        return {
          ...recipes.find((r) => {
            return r.id === recipeId;
          }),
        };
      })
    );
  }

  //REMOVE
  deleteRecipe(recipeId:string) {
    return this.recipes.pipe(take(1),tap(recipes =>{
        this._recipes.next(recipes.filter(r=>{
            return r.id !== recipeId;
        }));
    }))
  }



  // CREATE
  addRecipe(
    title: string,
    description: string,
    ingredients: string[],
    cookingTime: number,
    userId: string
  ) {
    const newRecipe = new Recipe(
      Math.random().toString(),
      userId,
      title,
      description,
      "https://images.media-allrecipes.com/userphotos/720x405/2941015.jpg",
      ingredients,
      cookingTime,
      false
    );
    return this.recipes.pipe(take(1),tap(recipes=>{
      console.log(newRecipe);
      this._recipes.next(recipes.concat(newRecipe));
    }))
  }
  // addPlace(title:string, description:string,price:number,dateFrom:Date,dateTo:Date){
  //   const newPlace = new Place(Math.random().toString(),title,description,'https://media.timeout.com/images/105304047/630/472/image.jpg',price,dateFrom,dateTo,this.authService.userId);
  //   return this.places.pipe(take(1),delay(1000),tap(places =>
  //     setTimeout(() => {
  //     this._places.next(places.concat(newPlace));
  //     })))
  // }

  //UPDATE
  updateRecipe(recipeId: string,
    title: string,
    description: string,
    ingredients: string[],
    cookingTime: number,){
      return this.recipes.pipe(take(1),tap(recipes=>{
        const updatedRecipeIndex = recipes.findIndex(r => r.id === recipeId);
        console.log("index:"+updatedRecipeIndex);
        const updatedRecipes = [...recipes];
        const oldRecipe = updatedRecipes[updatedRecipeIndex];
        updatedRecipes[updatedRecipeIndex] = new Recipe(oldRecipe.id,oldRecipe.userId,title,description,oldRecipe.imageUrl,ingredients,cookingTime,oldRecipe.isFavourite);
        
        this._recipes.next(updatedRecipes);
      }))
  }

  // updatePlace(placeId:string,title:string,description:string){
  //   return this.places.pipe(take(1),tap(places=>{
  //     const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
  //     const updatedPlaces = [...places];
  //     const oldPlace = updatedPlaces[updatedPlaceIndex];
  //     updatedPlaces[updatedPlaceIndex] = new Place (oldPlace.id,title,description,oldPlace.imageUrl,oldPlace.price,oldPlace.availableFrom,oldPlace.availableTo,oldPlace.userId);

  //     this._places.next(updatedPlaces);
  //   }))
  // }
}
