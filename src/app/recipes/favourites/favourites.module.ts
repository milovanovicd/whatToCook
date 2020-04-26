import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavouritesPageRoutingModule } from './favourites-routing.module';

import { FavouritesPage } from './favourites.page';
import { FavouritesListComponent } from './favourites-list/favourites-list.component';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavouritesPageRoutingModule
  ],
  declarations: [FavouritesPage,FavouritesListComponent,MyRecipesComponent]
})
export class FavouritesPageModule {}
