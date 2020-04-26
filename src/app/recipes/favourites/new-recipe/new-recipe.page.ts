import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { RecipesService } from "../../recipes.service";
import { AuthService } from "src/app/auth/auth.service";
import { IngredientsService } from '../../ingredients/ingredients.service';

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
    private ingredientsService:IngredientsService
  ) {}

  ngOnInit() {
    this.ingredients = this.ingredientsService.ingredients;
    console.log(this.ingredients);
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
      this.form.reset();
    });

  }
}
