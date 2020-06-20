import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipesService } from '../../recipes.service';
import { Subscription } from 'rxjs';
import { FavouritesService } from '../../favourites/favourites.service';
import { UserService } from 'src/app/auth/user/user.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
})
export class RecipeItemComponent implements OnInit,OnDestroy {
  @Input() recipe:Recipe;
  favSub:Subscription;
  unfavSub:Subscription;
  constructor(private recipeService:RecipesService, private favService:FavouritesService,private userService:UserService) {}

  ngOnInit() {}

  ngOnDestroy(){
    if(this.favSub){
      this.favSub.unsubscribe();
    }
    if(this.unfavSub){
      this.unfavSub.unsubscribe();
    }
  }

  removeFromFavourites(recipeId:string){
    // this.unfavSub = this.recipeService.removeFromFavourites(recipeId).subscribe();
    const userId = this.userService.userId;
    this.favService.removeFromFavourites(userId,recipeId).subscribe(()=>{
      this.recipeService.fetchRecipes().subscribe();
    });
  }

  addToFavourites(recipeId:string){
    // this.favSub = this.recipeService.addToFavourites(recipeId).subscribe();
    const userId = this.userService.userId;
    this.favService.addToFavourites(userId,recipeId).subscribe(()=>{
      this.recipeService.fetchRecipes().subscribe();
    });
  }
}
