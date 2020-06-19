import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
import { NewIngredientService } from './new-ingredient.service';


@Component({
  selector: 'app-new-ingredient',
  templateUrl: './new-ingredient.component.html',
  styleUrls: ['./new-ingredient.component.scss'],
})
export class NewIngredientComponent implements OnInit {

  constructor(private modalCtrl:ModalController, private newIngService:NewIngredientService,private alertCtrl:AlertController) { }

  ngOnInit() {}

  onSubmit(form:NgForm){
    if(!form.valid){
      return;
    }
    const ingredient = form.value.ingredient; 
    this.newIngService.addIngredient(ingredient)
    .subscribe(res =>{
      console.log(res);
      console.log(res.id);
      this.ingredientAdded(res.id);
    });;
  }

  onDismiss(){
    this.modalCtrl.dismiss();
  }

  async ingredientAdded(message:string) {
    const alert = await this.alertCtrl.create({
      header: "New Ingredient",
      message: message,
      buttons: ['OK']});

    await alert.present();
  }
}
