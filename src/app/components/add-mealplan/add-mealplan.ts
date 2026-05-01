import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Api } from '../../services/api';

@Component({
  selector: 'app-add-mealplan',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-mealplan.html',
  styleUrl: './add-mealplan.css'
})
export class AddMealplan {
  user: string = '';
  week_start: string = '';
  message: string = '';

  meals = [
    { day: '', meal_type: '', recipe: '' },
    { day: '', meal_type: '', recipe: '' },
    { day: '', meal_type: '', recipe: '' }
  ];

  constructor(private api: Api) {}

  onSubmit(): void {
    const newMealplan = {
      user: localStorage.getItem('username'),
      week_start: this.week_start,
      meals: this.meals
    };

    this.api.createMealplan(newMealplan).subscribe({
      next: () => {
        this.message = 'Mealplan created successfully';

        this.user = '';
        this.week_start = '';
        this.meals = [
          { day: '', meal_type: '', recipe: '' },
          { day: '', meal_type: '', recipe: '' },
          { day: '', meal_type: '', recipe: '' }
        ];
      },
      error: () => {
        this.message = 'Could not create mealplan';
      }
    });
  }
}