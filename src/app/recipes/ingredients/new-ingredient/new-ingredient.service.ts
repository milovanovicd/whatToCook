import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { take, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class NewIngredientService {

  constructor(private http: HttpClient, private alertController:AlertController) { }


  addIngredient(ingredient: string) {
    ingredient = ingredient.trim();
    return this.http.post<{id: string}>('http://localhost:3000/ingredients/new', {ingredient}).pipe(
      // take(1),
      tap( response => {
        return response;
      })
    );
  }

}
