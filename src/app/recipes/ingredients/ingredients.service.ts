import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { take, tap } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root",
})
export class IngredientsService {
  private _ingredients = new BehaviorSubject<string[]>([]);

  constructor(private http: HttpClient) {}

  get ingredients() {
    return this._ingredients.asObservable();
  }

  fetchIngredients() {
    return this.http.get<string[]>(`${environment.API_URL}/ingredients/`).pipe(
      take(1),
      tap((ingredients) => {
        this._ingredients.next(ingredients);
      })
    );
  }
}
