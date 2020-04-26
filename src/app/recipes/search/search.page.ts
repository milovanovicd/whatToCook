import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { Subscription } from 'rxjs';
import { IonicSelectableComponent } from 'ionic-selectable';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit,OnDestroy {
  recipes:Recipe[];
  recipesSub:Subscription;
  selectedRecipe = null;
  selected = [];
  toggle = true;
  @ViewChild('selectComponent',{ static: true }) selectComponent:IonicSelectableComponent;

  constructor(private recipesService:RecipesService) { }

  ngOnInit() {
    this.recipesSub = this.recipesService.recipes.subscribe(recipes=> {
      this.recipes = recipes;
    });
  }

  ngOnDestroy(){
    if(this.recipesSub){
      this.recipesSub.unsubscribe();
    }
  }

  onClear(){
    this.selectComponent.clear();
    this.selectComponent.close();
  }
  
  onToggleItems(){
    this.selectComponent.toggleItems(this.toggle);
    this.toggle=!this.toggle;
  }
  
  onConfirm(){
    this.selectComponent.confirm();
    console.log(this.selectComponent.itemsToConfirm);
    this.selectComponent.close();
    
  }
}
