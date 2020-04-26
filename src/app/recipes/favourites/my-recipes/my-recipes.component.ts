import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../../recipe.model';
import { RecipesService } from '../../recipes.service';
import { AuthService } from 'src/app/auth/auth.service';

import { AlertController, IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.scss'],
})
export class MyRecipesComponent implements OnInit,OnDestroy {
  myRecipes: Recipe[];
  recipesSub: Subscription;
  
  constructor(
    private recipeService: RecipesService,
    private authService: AuthService,
    private router:Router,
    private alertController:AlertController
  ) { }

  ngOnInit() {
    this.recipesSub = this.recipeService.recipes.subscribe(recipes =>{
      this.myRecipes = recipes.filter(r =>{
        return r.userId === this.authService.userId;
      })
      console.log(this.myRecipes);
    })
  }

  ngOnDestroy() {
    if (this.recipesSub) {
      this.recipesSub.unsubscribe();
    }
  }

  async onDelete(recipeId:string,slidingItem:IonItemSliding){
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      message: 'Do you really want to delete this recipe?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            slidingItem.close();
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.recipeService.deleteRecipe(recipeId).subscribe(()=>{
              slidingItem.close();
            });
          }
        }
      ]
    });

    await alert.present();

  }

  onEdit(recipeId:string,slidingItem:IonItemSliding){
    slidingItem.close();
    this.router.navigate(['/','recipes','tabs','favourites','edit',recipeId]);
  }


}
