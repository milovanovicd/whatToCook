import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Ingredients } from "./ingredients.model";


@Injectable()
export class IngredientsService {
    private ingredients:string[];
    private ingredientsID:string;

    constructor(@InjectModel('Ingredients') private ingredientsModel: Model<Ingredients>){}

    async fetchIngredients(){
        const ingredients =  await this.ingredientsModel.findOne().exec();
        console.log(ingredients);
        this.ingredientsID = ingredients.id;
        this.ingredients = ingredients.ingredients
        return this.ingredients;
    }

    async addIngredients(ingredients:string[]){
        const newIngredients = new this.ingredientsModel({ingredients});
        const result = await newIngredients.save();
        return result.id as string;
    }

    async addIngredient(ingredient:string){
        const ingredients =  await this.ingredientsModel.findOne().exec();
        ingredients.ingredients.push(ingredient);
        ingredients.save();
        return ingredients;
    }
}

