import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngredientsPageRoutingModule } from './ingredients-routing.module';

import { IngredientsPage } from './ingredients.page';
import { NewIngredientComponent } from './new-ingredient/new-ingredient.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngredientsPageRoutingModule
  ],
  declarations: [IngredientsPage,NewIngredientComponent],
  entryComponents:[NewIngredientComponent]
})
export class IngredientsPageModule {}
