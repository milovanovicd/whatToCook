import * as mongoose from 'mongoose';

export const RecipeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  ingredients: { type: [String], required: true },
  cookingTime: { type: Number, required: true },
  isFavourite: { type: Boolean, required: true },
});

export interface Recipe extends mongoose.Document {
  id: string;
  userId: string;
  title: string;
  description: string;
  imageUrl: string;
  ingredients: string[];
  cookingTime: number;
  isFavourite: boolean;
}
