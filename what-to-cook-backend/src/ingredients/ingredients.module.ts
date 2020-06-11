import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IngredientsSchema } from './ingredients.model';
import { IngredientsController } from './ingredients.controller';
import { IngredientsService } from './ingredients.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Ingredients', schema: IngredientsSchema }])],
  controllers: [IngredientsController],
  providers: [IngredientsService],
})
export class IngredientsModule {}