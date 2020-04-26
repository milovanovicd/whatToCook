import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesPage } from './recipes.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: RecipesPage,
    children:[
      {
          path: 'recipes-list',
          children:[
            {
              path:'',
              loadChildren: () => import('./recipes-list/recipes-list.module').then( m => m.RecipesListPageModule)
            },
            {
              path:':recipeId',
              loadChildren: () => import('./recipes-list/recipe-detail/recipe-detail.module').then(m => m.RecipeDetailPageModule)
            }
          ]
          
      },
      {
        path: 'favourites',
        children:[
          {
            path:'',
            loadChildren: () => import('./favourites/favourites.module').then( m => m.FavouritesPageModule)
          },
          {
            path:'new',
            loadChildren: () => import('./favourites/new-recipe/new-recipe.module').then( m => m.NewRecipePageModule)
          },
          {
            path:'edit/:recipeId',
            loadChildren: () => import('./favourites/edit-recipe/edit-recipe.module').then( m => m.EditRecipePageModule)
          }
        ]
      },
      {
        path: 'search',
        loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
      },
      {
        path: 'ingredients',
        loadChildren: () => import('./ingredients/ingredients.module').then( m => m.IngredientsPageModule)
      },
      {
        path:'',
        redirectTo: '/recipes/tabs/recipes-list',
        pathMatch: 'full'
      }
    ]
  },
  {
    path:'',
    redirectTo: '/recipes/tabs/recipes-list',
    pathMatch: 'full'
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesPageRoutingModule {}
