import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Api } from '../../services/api';

@Component({
  selector: 'app-edit-recipe',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './edit-recipe.html',
  styleUrl: './edit-recipe.css'
})
export class EditRecipe implements OnInit {
  recipeId: string = '';

  name: string = '';
  category: string = '';
  prep_time: number = 0;
  steps: string = '';
  calories: number = 0;
  protein: number = 0;
  carbs: number = 0;
  servings: number = 1;
  image: string = '';
  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: Api
  ) {}

  ngOnInit(): void {
    this.recipeId = this.route.snapshot.paramMap.get('id') || '';

    if (this.recipeId) {
      this.api.getRecipeById(this.recipeId).subscribe({
        next: (recipe: any) => {
          this.name = recipe.name || '';
          this.category = recipe.category || '';
          this.prep_time = recipe.prep_time || 0;
          this.steps = recipe.steps ? recipe.steps.join('\n') : '';

          this.calories = recipe.calories || 0;
          this.protein = recipe.protein || 0;
          this.carbs = recipe.carbs || 0;
          this.servings = recipe.servings || 1;

          this.image = recipe.image || '';
        },
        error: () => {
          this.message = 'Could not load recipe details';
        }
      });
    }
  }

  onSubmit(): void {
    const stepsArray = this.steps
      .split('\n')
      .filter(step => step.trim() !== '');

    const updatedRecipe = {
      name: this.name,
      category: this.category,
      prep_time: this.prep_time,
      image: this.image,
      ingredients: [],
      steps: stepsArray,
      calories: this.calories,
      protein: this.protein,
      carbs: this.carbs,
      servings: this.servings
    };

    this.api.updateRecipe(this.recipeId, updatedRecipe).subscribe({
      next: () => {
        this.message = 'Recipe updated successfully';

        setTimeout(() => {
          this.router.navigate(['/recipes', this.recipeId]);
        }, 1200);
      },
      error: () => {
        this.message = 'Could not update recipe';
      }
    });
  }
}