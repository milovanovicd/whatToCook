import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';

import { RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {
  constructor(private recipesService: RecipesService) {}

  @Post()
  async addRecipe(
    @Body('userId') userId: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('imageUrl') imageUrl: string,
    @Body('ingredients') ingredients: string[],
    @Body('cookingTime') cookingTime: number,
    @Body('isFavourite') isFavourite: boolean,
  ){
    const genereatedId = await this.recipesService.addRecipe(
      userId,
      title,
      description,
      imageUrl,
      ingredients,
      cookingTime,
      isFavourite,
    );
    return {
      id: genereatedId,
    };
  }

  @Get()
  async getAllRecipes() {
    const recipes = await this.recipesService.fetchRecipes();
    return recipes;
  }

  @Get(':id')
  getRecipe(@Param('id') recipeId) {
    return this.recipesService.getRecipe(recipeId);
  }

  @Patch(':id')
  async updateRecipe(
    @Param('id') recipeId,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('ingredients') ingredients: string[],
    @Body('cookingTime') cookingTime: number,
  ) {
    await this.recipesService.updateRecipe(recipeId,title,description,ingredients,cookingTime);
    return null;
  }

  @Delete(':id')
  async removeRecipe(@Param('id') recipeId){
    await this.recipesService.removeRecipe(recipeId);
    return null;
  }
}
