import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Recipe } from "../../recipe.model";
import { ActivatedRoute, Router } from "@angular/router";
import { RecipesService } from "../../recipes.service";
import { Subscription } from "rxjs";
import { NavController, AlertController } from "@ionic/angular";
import { IngredientsService } from '../../ingredients/ingredients.service';
import {NgForm } from '@angular/forms';

@Component({
  selector: "app-edit-recipe",
  templateUrl: "./edit-recipe.page.html",
  styleUrls: ["./edit-recipe.page.scss"],
})
export class EditRecipePage implements OnInit, OnDestroy {
  @ViewChild("f", { static: true }) form: NgForm;
  recipe: Recipe;
  private recipeSub: Subscription;
  ingredients:string[];

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private recipeService: RecipesService,
    private ingredientsService:IngredientsService,
    private alertController:AlertController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("recipeId")) {
        this.navCtrl.navigateBack("/recipes/tabs/favourites");
        return;
      }
      this.ingredients = this.ingredientsService.ingredients;
      this.recipeSub = this.recipeService
        .getRecipe(paramMap.get("recipeId"))
        .subscribe((recipe) => {
          this.recipe = recipe;
        });
    });
  }

  ngOnDestroy() {
    if (this.recipeSub) {
      this.recipeSub.unsubscribe();
    }
  }

  async recipeUpdatedAlert() {
    const alert = await this.alertController.create({
      header: 'Edit Recipe',
      message: 'Recipe updated successfully!',
      buttons: [
      {
        text: 'Okay',
        handler: () => {
          this.navCtrl.navigateBack("/recipes/tabs/favourites");
        }
      }]
    });

    await alert.present();
  }


  isSelected(ingredient:string):boolean{
    if(this.recipe.ingredients.includes(ingredient)){
      return true;
    }
    return false;
  }

  onUpdateRecipe(){
    if(!this.form.valid){
      return;
    }
    this.recipeService.updateRecipe(this.recipe.id,this.form.value.title,this.form.value.description,this.form.value.ingredients,this.form.value.cookingTime)
    .subscribe(()=>{
      this.recipeUpdatedAlert();
    });
    console.log();
  }
}
