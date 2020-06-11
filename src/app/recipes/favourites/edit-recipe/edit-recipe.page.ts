import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Recipe } from "../../recipe.model";
import { ActivatedRoute, Router } from "@angular/router";
import { RecipesService } from "../../recipes.service";
import { Subscription } from "rxjs";
import { NavController, AlertController, LoadingController } from "@ionic/angular";
import { IngredientsService } from '../../ingredients/ingredients.service';
import {NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: "app-edit-recipe",
  templateUrl: "./edit-recipe.page.html",
  styleUrls: ["./edit-recipe.page.scss"],
})
export class EditRecipePage implements OnInit, OnDestroy {
  form: FormGroup;
  recipe: Recipe;
  private recipeSub: Subscription;
  private ingSub: Subscription;
  ingredients:string[];
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private recipeService: RecipesService,
    private ingredientsService:IngredientsService,
    private alertController:AlertController,
    private loadingCtrl:LoadingController,
    private router:Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("recipeId")) {
        this.navCtrl.navigateBack("/recipes/tabs/favourites");
        return;
      }
      this.isLoading = true;
      this.ingSub = this.ingredientsService.ingredients.subscribe(i =>{
        this.ingredients = i;
        this.recipeSub = this.recipeService
        .getRecipe(paramMap.get("recipeId"))
        .subscribe((recipe) => {
          this.isLoading = false;
          this.recipe = recipe;

          //Setting up the form
          this.form = new FormGroup({
            title: new FormControl(this.recipe.title, {
              updateOn: "blur",
              validators: [Validators.required],
            }),
            description: new FormControl(this.recipe.description, {
              updateOn: "blur",
              validators: [Validators.required],
            }),
            ingredients: new FormControl(this.recipe.ingredients, {
              validators: [Validators.required],
            }),
            cookingTime: new FormControl(this.recipe.cookingTime, {
              updateOn: "blur",
              validators: [Validators.required, Validators.min(1)],
            }),
          });
        
        });
    });
      });

  }

  ngOnDestroy() {
    if (this.recipeSub) {
      this.recipeSub.unsubscribe();
    }
    if (this.ingSub) {
      this.ingSub.unsubscribe();
    }
  }

  ionViewWillEnter(){
    this.isLoading = true;
    this.recipeService.fetchRecipes().subscribe(()=>{
    this.isLoading = false;
    });
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
  
  onUpdateRecipe(){
    this.loadingCtrl.create({
      message:'Updating recipe...'
    }).then(loadingEl =>{
      loadingEl.present();
      this.recipeService.updateRecipe(this.recipe.id,this.form.value.title,this.form.value.description,this.form.value.ingredients,this.form.value.cookingTime)
    .subscribe(()=>{
      this.loadingCtrl.dismiss();
      this.router.navigate(["/", "recipes", "tabs", "favourites"]);
    });
    })
  }
}
