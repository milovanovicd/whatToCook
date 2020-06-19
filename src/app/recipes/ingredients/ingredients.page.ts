import { Component, OnInit, OnDestroy } from "@angular/core";
import { IngredientsService } from "./ingredients.service";
import { Subscription } from "rxjs";
import { ModalController } from "@ionic/angular";
import { NewIngredientComponent } from "./new-ingredient/new-ingredient.component";

@Component({
  selector: "app-ingredients",
  templateUrl: "./ingredients.page.html",
  styleUrls: ["./ingredients.page.scss"],
})
export class IngredientsPage implements OnInit, OnDestroy {
  ingredients: string[];
  private ingSub: Subscription;
  isLoading = false;

  constructor(
    private ingredientsService: IngredientsService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.ingSub = this.ingredientsService.ingredients.subscribe((i) => {
      this.ingredients = i;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.ingredientsService.fetchIngredients().subscribe(() => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    if (this.ingSub) {
      this.ingSub.unsubscribe();
    }
  }
  onAddNewIngredient() {
    this.modalCtrl
      .create({
        component: NewIngredientComponent,
      })
      .then((modalEl) => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then((resultData) => {
        this.isLoading = true;
        this.ingredientsService.fetchIngredients().subscribe(() => {
          this.isLoading = false;
        });
      });
  }
}
