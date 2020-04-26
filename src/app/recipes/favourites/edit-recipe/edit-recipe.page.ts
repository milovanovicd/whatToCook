import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Recipe } from "../../recipe.model";
import { ActivatedRoute } from "@angular/router";
import { RecipesService } from "../../recipes.service";
import { Subscription } from "rxjs";
import { NavController } from "@ionic/angular";
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
    private ingredientsService:IngredientsService
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

  isSelected(ingredient:string):boolean{
    if(this.recipe.ingredients.includes(ingredient)){
      return true;
    }
    return false;
  }

  onUpdateRecipe(){
    console.log(this.form.value);
  }
}
