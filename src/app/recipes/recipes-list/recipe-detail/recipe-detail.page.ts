import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Recipe } from "../../recipe.model";
import { RecipesService } from "../../recipes.service";
import { NavController, AlertController } from "@ionic/angular";
import { Subscription } from "rxjs";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.page.html",
  styleUrls: ["./recipe-detail.page.scss"],
})
export class RecipeDetailPage implements OnInit, OnDestroy {
  recipe: Recipe;
  recipeSub: Subscription;
  isLoading=false;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipesService,
    private navigateCtrl: NavController,
    private alertCtrl:AlertController,
    private router:Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("recipeId")) {
        this.navigateCtrl.navigateBack("/recipes/tabs/recipe-list");
        return;
      }
      this.isLoading=true;
      this.recipeSub = this.recipeService
        .getRecipe(paramMap.get("recipeId"))
        .subscribe(recipe =>{
          console.log(recipe);
          this.recipe = recipe;
          this.isLoading=false;
        }, error =>{
          this.alertCtrl.create({
            header: "An error occured!",
            message: "Recipe could not be fetched. Please try again later",
            buttons: [{
              text:'Okay',
              handler: () =>{
                this.router.navigate(['/recipes/tabs/recipe-list']);
              }
            }],
          }).then(alert =>{
            alert.present();
          });
        });
    });
  }

  ngOnDestroy() {
    if (this.recipeSub) {
      this.recipeSub.unsubscribe();
    }
  }
}
