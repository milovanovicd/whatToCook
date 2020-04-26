import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {
  private _ingredients: string[] = [
    "Bacon",
    "Black Olives",
    "Extra Cheese",
    "Green Peppers",
    "Mushrooms",
    "Onions",
    "Pepperoni",
    "Pineapple",
    "Sausage",
    "Spinach",
  ];

  constructor() { }

  get ingredients(){
    return [...this._ingredients];
  }
}
