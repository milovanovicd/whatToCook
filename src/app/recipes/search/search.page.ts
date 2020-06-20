import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { Subscription } from 'rxjs';
import { IonicSelectableComponent } from 'ionic-selectable';
import { IngredientsService } from '../ingredients/ingredients.service';
import { ModalController } from '@ionic/angular';
import { FilterComponent } from './filter/filter.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit,OnDestroy {
  recipes:Recipe[];
  recipesSub:Subscription;
  searchList:Recipe[];
  isLoading= false;

  constructor(private recipesService:RecipesService,private ingredientsService:IngredientsService, private modalCtrl:ModalController ) { }

  ngOnInit() {
    this.recipesSub = this.recipesService.recipes.subscribe(recipes=> {
      this.recipes = recipes;
      this.searchList = [...this.recipes];
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.recipesService.fetchRecipes().subscribe(()=>{
      this.ingredientsService.fetchIngredients().subscribe(() => {
        this.isLoading = false;
      });
    })
  }

  ngOnDestroy(){
    if(this.recipesSub){
      this.recipesSub.unsubscribe();
    }
  }

  initSearchList(){
    this.searchList = [...this.recipes];
  }

  lookFor(event){
    this.initSearchList();
    
    var searchTerm = event.detail.value;

    if (searchTerm && searchTerm.trim() != '') {
    this.searchList = this.searchList.filter((item) => {
    return (item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
  })
}
  }

  onFilters(){
    this.modalCtrl.create({
      component: FilterComponent,
      componentProps:{searchList:this.searchList}
    }).then(modalEl=>{
      modalEl.present();
      return modalEl.onDidDismiss();
    }).then(resultData =>{
      if(resultData.role==="applied"){
        console.log(resultData.data.searchList);
        this.searchList = resultData.data.searchList;
      }
    })
  }

  onFiltersDismiss(){
    this.searchList = this.recipes;
  }
  
}
