import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Recipe } from "../../recipe.model";
import { RecipesService } from "../../recipes.service";
import { NavController } from "@ionic/angular";
import { Subscription } from "rxjs";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.page.html",
  styleUrls: ["./recipe-detail.page.scss"],
})
export class RecipeDetailPage implements OnInit, OnDestroy {
  recipe: Recipe;
  recipeSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipesService,
    private navigateCtrl: NavController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("recipeId")) {
        this.navigateCtrl.navigateBack("/recipes/tabs/recipe-list");
        return;
      }
      this.recipeSub = this.recipeService
        .getRecipe(paramMap.get("recipeId"))
        .subscribe(recipe =>{
          this.recipe = recipe;
        });
    });
  }

  ngOnDestroy() {
    if (this.recipeSub) {
      this.recipeSub.unsubscribe();
    }
  }
}
