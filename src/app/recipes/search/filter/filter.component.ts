import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Subscription } from "rxjs";
import { Recipe } from "../../recipe.model";
import { IngredientsService } from "../../ingredients/ingredients.service";
import { ModalController } from "@ionic/angular";
import { NgForm } from "@angular/forms";
import { RecipesService } from "../../recipes.service";

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.scss"],
})
export class FilterComponent implements OnInit, OnDestroy {
  @Input() searchList: Recipe[];
  ingSub: Subscription;
  ingredients: string[];
  categories: string[];

  constructor(
    private ingredientsService: IngredientsService,
    private modalCtrl: ModalController,
    private recipeService: RecipesService
  ) {}

  ngOnInit() {
    this.categories = this.recipeService.categories;
    this.ingSub = this.ingredientsService.ingredients.subscribe((ings) => {
      this.ingredients = ings;
    });
  }

  ngOnDestroy() {
    if (this.ingSub) {
      this.ingSub.unsubscribe();
    }
  }

  onDismiss() {
    this.modalCtrl.dismiss();
  }

  onApplyFilters(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const selectedIngredients: string[] = form.value.ingredients;
    const selectedCategories: string[] = form.value.categories;

    if (selectedIngredients.length != 0) {
      this.searchList = this.searchList.filter((item) => {
        let numberOfIngredients = 0;
        for (let i = 0; i < selectedIngredients.length; i++) {
          if (item.ingredients.indexOf(selectedIngredients[i]) != -1)
            numberOfIngredients++;
        }
        if (numberOfIngredients > 0) {
          return item;
        }
      });
    }
    if(selectedCategories.length!=0){
      this.searchList = this.searchList.filter((item) => {
        let mathedCategory = 0;
        for (let i = 0; i < selectedCategories.length; i++) {
          if (item.category === selectedCategories[i]) mathedCategory++;
        }
        if (mathedCategory > 0) {
          return item;
        }
      });
    }

    this.modalCtrl.dismiss({ searchList: this.searchList }, "applied");
  }
}
