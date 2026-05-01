import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nutrition-tracker',
  imports: [FormsModule, CommonModule],
  templateUrl: './nutrition-tracker.html',
  styleUrl: './nutrition-tracker.css'
})
export class NutritionTracker {
  age: number = 0;
  weight: number = 0;
  height: number = 0;
  gender: string = 'female';
  activity: number = 1.2;

  calories: number = 0;
  protein: number = 0;
  carbs: number = 0;
  fats: number = 0;

  calculated: boolean = false;

  calculate(): void {
    let bmr = 0;

    if (this.gender === 'male') {
      bmr = 10 * this.weight + 6.25 * this.height - 5 * this.age + 5;
    } else {
      bmr = 10 * this.weight + 6.25 * this.height - 5 * this.age - 161;
    }

    this.calories = Math.round(bmr * this.activity);
    this.protein = Math.round(this.weight * 1.6);
    this.carbs = Math.round((this.calories * 0.45) / 4);
    this.fats = Math.round((this.calories * 0.25) / 9);

    this.calculated = true;
const trackerData = {
  calories: this.calories,
  protein: this.protein,
  carbs: this.carbs,
  fats: this.fats
};

localStorage.setItem('trackerData', JSON.stringify(trackerData));

  }
}