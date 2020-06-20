import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicSelectableModule } from 'ionic-selectable';

import { IonicModule } from '@ionic/angular';

import { SearchPageRoutingModule } from './search-routing.module';

import { SearchPage } from './search.page';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageRoutingModule,
    IonicSelectableModule
  ],
  declarations: [SearchPage,FilterComponent],
  entryComponents:[FilterComponent]
})
export class SearchPageModule {}
