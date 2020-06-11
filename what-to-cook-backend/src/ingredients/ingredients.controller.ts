import { IngredientsService } from "./ingredients.service";
import { Controller, Get, Post, Body, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";


@Controller('ingredients')
export class IngredientsController {
  constructor(private ingredientsService: IngredientsService) {}
    
  @Get()
  // @UseGuards(JwtAuthGuard)
  async getAllIngredients() {
    const ingredients = await this.ingredientsService.fetchIngredients();
    return ingredients;
  }

  @Post()
  async addIngredients(
    @Body('ingredients') ingredients: string[]){
      const generatedId = await this.ingredientsService.addIngredients(ingredients);
      return {
        id:generatedId
      };
    }

    @Post('new')
    async addIngredient(
      @Body('ingredient') ingredient: string){
        const ingredients = await this.ingredientsService.addIngredient(ingredient);
        return {
          id:ingredients
        };
      }
}