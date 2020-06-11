import { Module } from '@nestjs/common';
//Neophodno za povezivanje sa bazom
import {MongooseModule} from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipesModule } from './recipes/recipes.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import config from './config/constants';


@Module({
  imports: [RecipesModule,IngredientsModule,MongooseModule.forRoot(config.mongoURI), AuthModule, UsersModule],
  //Kontroleri su zaduzeni za hendlovanje nadolazecih request-ova
  controllers: [AppController],
  //Providers su dodaci koje provajduju dodatne funkcionalnosti - Modularnost
  providers: [AppService],
})
export class AppModule {}
