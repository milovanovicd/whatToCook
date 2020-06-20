import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  ElementRef,
} from "@angular/core";
import {FormGroup, FormControl, Validators } from "@angular/forms";
import { RecipesService } from "../../recipes.service";
import { IngredientsService } from "../../ingredients/ingredients.service";
import { AlertController, NavController, Platform } from "@ionic/angular";
import { Subscription } from "rxjs";
import { UserService } from 'src/app/auth/user/user.service';

//Funkcija za konvertovanje stringa u fajl
function base64toBlob(base64Data, contentType) {
  contentType = contentType || "";
  const sliceSize = 1024;
  const byteCharacters = atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}

@Component({
  selector: "app-new-recipe",
  templateUrl: "./new-recipe.page.html",
  styleUrls: ["./new-recipe.page.scss"],
})
export class NewRecipePage implements OnInit, OnDestroy {
  form: FormGroup;

  ingredients: string[];
  private ingSub: Subscription;
  isLoading = false;
  categories: string[];

  constructor(
    private recipesService: RecipesService,
    private userService: UserService,
    private ingredientsService: IngredientsService,
    private alertController: AlertController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required]
      }),
      ingredients: new FormControl(null, {
        validators: [Validators.required]
      }),
      category: new FormControl(null, {
        validators: [Validators.required]
      }),
      cookingTime: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required, Validators.min(1)]
      }),
      image: new FormControl(null, {validators: [Validators.required]})
    });
    this.categories = this.recipesService.categories;
    this.ingSub = this.ingredientsService.ingredients.subscribe((i) => {
      this.ingredients = i;
      console.log(this.ingredients);
    });
  }

  ngOnDestroy() {
    if (this.ingSub) {
      this.ingSub.unsubscribe();
    }
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.ingredientsService.fetchIngredients().subscribe(() => {
      this.isLoading = false;
    });
  }

  async recipeCreatedAlert() {
    const alert = await this.alertController.create({
      header: "New Recipe",
      message: "Recipe created successfully. Do you want to add more?",
      buttons: [
        {
          text: "Yes",
          handler: () => {
            this.form.reset();
          },
        },
        {
          text: "No",
          handler: () => {
            this.navCtrl.navigateBack("/recipes/tabs/favourites");
          },
        },
      ],
    });

    await alert.present();
  }
  
  onAddNewRecipe() {
    console.log(this.form);
    const title = this.form.value.title;
    const description = this.form.value.description;
    const ingredients = this.form.value.ingredients;
    const image = this.form.value.image;
    // const image = "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/chorizo-mozarella-gnocchi-bake-cropped.jpg";
    const cookingTime = this.form.value.cookingTime;
    const userId = this.userService.userId;
    const category = this.form.value.category;
    this.recipesService
      .addRecipe(title, description, image, ingredients, cookingTime, userId,category)
      .subscribe(() => {
        this.recipeCreatedAlert();
      });
  }

  onImagePicked(imageData: string | File) {
    // let imageFile;

    // if (typeof imageData === "string") {
    //   try {
    //     imageFile = base64toBlob(
    //       imageData.replace("data:image/jpeg;base64,", ""),
    //       "image/jpeg"
    //     );
    //   } catch (error) {
    //     console.log(error);
    //     return;
    //   }
    // } else {
    //   imageFile = imageData;
    // }
    this.form.value.image = imageData;

    this.form.patchValue({image:imageData});
  }
}
