import * as mongoose from 'mongoose';

export const IngredientsSchema = new mongoose.Schema({
  ingredients: [String]
});

export interface Ingredients extends mongoose.Document {
    ingredients: string[];
  }