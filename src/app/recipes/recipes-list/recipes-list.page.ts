import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.page.html',
  styleUrls: ['./recipes-list.page.scss'],
})
export class RecipesListPage implements OnInit,OnDestroy{
  loadedRecipes: Recipe[];
  recipesSub: Subscription;
  isLoading = false;
  
  constructor(private recipesService: RecipesService) {}

  ngOnInit() {
    this.recipesSub = this.recipesService.recipes.subscribe((recipes) => {
      this.loadedRecipes = recipes;
    });
  }

  ionViewWillEnter(){
    this.isLoading = true;
    this.recipesService.fetchRecipes().subscribe(()=>{
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    if (this.recipesSub) {
      this.recipesSub.unsubscribe();
    }
  }

}
