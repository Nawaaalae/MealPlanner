import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Api } from '../../services/api';

@Component({
  selector: 'app-add-recipe',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-recipe.html',
  styleUrl: './add-recipe.css'
})
export class AddRecipe {

  name: string = '';
  category: string = '';
  prep_time: number = 0;
  image: string = '';
  steps: string = '';

  calories: number = 0;
  protein: number = 0;
  carbs: number = 0;
  servings: number = 1;

  message: string = '';

  constructor(private api: Api) {}

  onSubmit(): void {

    const stepsArray = this.steps
      .split('\n')
      .filter(step => step.trim() !== '');

    const newRecipe = {
      name: this.name,
      category: this.category,
      prep_time: this.prep_time,
      ingredients: [],
      steps: stepsArray,
      calories: this.calories,
      protein: this.protein,
      carbs: this.carbs,
      image: this.image,
      servings: this.servings
    };

    this.api.createRecipe(newRecipe).subscribe({
      next: () => {
        this.message = 'Recipe added successfully';

        this.name = '';
        this.category = '';
        this.prep_time = 0;
        this.steps = '';
        this.image = '';
        this.calories = 0;
        this.protein = 0;
        this.carbs = 0;
        this.servings = 1;
      },
      error: () => {
        this.message = 'Recipe could not be added';
      }
    });
  }
}