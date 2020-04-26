import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { RecipesService } from "../../recipes.service";
import { AuthService } from "src/app/auth/auth.service";
import { IngredientsService } from '../../ingredients/ingredients.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: "app-new-recipe",
  templateUrl: "./new-recipe.page.html",
  styleUrls: ["./new-recipe.page.scss"],
})
export class NewRecipePage implements OnInit {
  @ViewChild("f", { static: true }) form: NgForm;
  ingredients:string[];

  constructor(
    private recipesService: RecipesService,
    private authService: AuthService,
    private ingredientsService:IngredientsService,
    private alertController:AlertController,
    private navCtrl:NavController
  ) {}

  ngOnInit() {
    this.ingredients = this.ingredientsService.ingredients;
    console.log(this.ingredients);
  }

  async recipeCreatedAlert() {
    const alert = await this.alertController.create({
      header: 'New Recipe',
      message: 'Recipe created successfully. Do you want to add more?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.form.reset();
          }
        },
        {
          text: 'No',
          handler: () => {
            this.navCtrl.navigateBack("/recipes/tabs/favourites");
          }
        }]
    });

    await alert.present();
  }

  onAddNewRecipe() {
    if (!this.form.valid) {
      return;
    }
    const title = this.form.value.title;
    const description = this.form.value.description;
    const ingredients = this.form.value.ingredients;
    const cookingTime = this.form.value.cookingTime;
    const userId = this.authService.userId;
    this.recipesService.addRecipe(
      title,
      description,
      ingredients,
      cookingTime,
      userId
    ).subscribe(() =>{
      this.recipeCreatedAlert();
    });

  }
}
