import { Component, OnInit, OnDestroy } from '@angular/core';
import {SegmentChangeEventDetail} from '@ionic/core';
import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/auth/user/user.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit,OnDestroy {
  segment:'favourites'|'my-recipes' = 'favourites';
  isLoading = false;
  favouriteRecipes:Recipe[];
  myRecipes:Recipe[];
  recipeSub:Subscription;

  constructor(private recipesService:RecipesService, private userService:UserService) { }

  ngOnInit() {
    this.recipeSub = this.recipesService.recipes.subscribe(recipes =>{
      this.favouriteRecipes = recipes.filter(r =>{
        return r.isFavourite ===true;
      });
      this.myRecipes = recipes.filter(r=>{
        return r.userId === this.userService.userId;
        // return r.userId === this.authService.userId.subscribe();
      })
    })
  }
  
  ngOnDestroy(){
    if(this.recipeSub){
      this.recipeSub.unsubscribe();
    }
  }

  ionViewWillEnter(){
    this.isLoading = true;
    this.recipesService.fetchRecipes().subscribe(()=>{
    this.isLoading = false;
    });
  }

  segmentChanged(event:CustomEvent<SegmentChangeEventDetail>){
    if(event.detail.value === 'favourites'){
      this.segment='favourites';
      console.log(this.segment);
    }else{
      this.segment='my-recipes';
      console.log(this.segment);
    }
  }


}
