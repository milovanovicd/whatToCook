import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { take, tap } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class IngredientsService {
  private _ingredients = new BehaviorSubject<string[]>([]);
  // private _ingredients: string[] = [
  //   "Bacon",
  //   "Black Olives",
  //   "Extra Cheese",
  //   "Green Peppers",
  //   "Mushrooms",
  //   "Onions",
  //   "Pepperoni",
  //   "Pineapple",
  //   "Sausage",
  //   "Spinach",
  // ];

  constructor(private http: HttpClient) {}

  get ingredients() {
    return this._ingredients.asObservable();
  }

  fetchIngredients() {
    return this.http.get<string[]>("http://localhost:3000/ingredients/").pipe(
      take(1),
      tap((ingredients) => {
        this._ingredients.next(ingredients);
      })
    );
  }
}
