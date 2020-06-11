import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SelectImageComponent } from './select-image/select-image.component';

@NgModule({
  declarations: [SelectImageComponent],
  imports: [
    CommonModule,IonicModule
  ],
  exports:[SelectImageComponent]
})
export class SharedModule { }
