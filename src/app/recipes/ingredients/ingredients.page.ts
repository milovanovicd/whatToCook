import { Component, OnInit } from '@angular/core';
import { IngredientsService } from './ingredients.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.page.html',
  styleUrls: ['./ingredients.page.scss'],
})
export class IngredientsPage implements OnInit {
  ingredients:string[];

  constructor(private ingredientsService:IngredientsService) { }

  ngOnInit() {
    this.ingredients = this.ingredientsService.ingredients;
  }

}
