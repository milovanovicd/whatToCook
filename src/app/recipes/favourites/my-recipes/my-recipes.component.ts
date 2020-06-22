import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Recipe } from "../../recipe.model";
import { RecipesService } from "../../recipes.service";

import {
  AlertController,
  IonItemSliding,
  LoadingController,
} from "@ionic/angular";

@Component({
  selector: "app-my-recipes",
  templateUrl: "./my-recipes.component.html",
  styleUrls: ["./my-recipes.component.scss"],
})
export class MyRecipesComponent implements OnInit {
  @Input() myRecipes: Recipe[];
  isLoading:boolean;

  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private alertController: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  async onDelete(recipeId: string, slidingItem: IonItemSliding) {
    const alert = await this.alertController.create({
      header: "Are you sure?",
      message: "Do you really want to delete this recipe?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            slidingItem.close();
          },
        },
        {
          text: "Confirm",
          handler: () => {
            slidingItem.close();
            this.isLoading = true;
            this.loadingCtrl
              .create({
                message: "Deleting recipe...",
              })
              .then((loadingEl) => {
                loadingEl.present();
                this.recipesService.deleteRecipe(recipeId).subscribe(() => {
                  this.recipesService.fetchMyRecipes().subscribe(()=>{
                    this.recipesService.myRecipes.subscribe(myrecipes=>{
                      this.myRecipes = myrecipes;
                      loadingEl.dismiss();
                      this.isLoading = false;
                    })
                  });
                });
              });
          },
        },
      ],
    });

    await alert.present();
  }

  onEdit(recipeId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate([
      "/",
      "recipes",
      "tabs",
      "favourites",
      "edit",
      recipeId,
    ]);
  }
}
