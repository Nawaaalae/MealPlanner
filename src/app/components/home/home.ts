import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Api } from '../../services/api';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  suggestedRecipes: any[] = [];
   proteinPercent: number = 30;
   carbsPercent: number = 45;
   fatsPercent: number = 25;
   constructor(private api: Api) {}

  ngOnInit(): void {
    this.api.getRecipes().subscribe({
     next: (data: any) => {
  this.suggestedRecipes = data
    .filter((recipe: any) => Number(recipe.protein) >= 20)
    .slice(0, 3);

  if (this.suggestedRecipes.length === 0) {
    this.suggestedRecipes = data.slice(0, 3);
      }},
    });
    const savedTracker = localStorage.getItem('trackerData');

if (savedTracker) {
  const tracker = JSON.parse(savedTracker);

  const proteinCalories = tracker.protein * 4;
  const carbsCalories = tracker.carbs * 4;
  const fatCalories = tracker.fats * 9;

  const total = proteinCalories + carbsCalories + fatCalories;

  this.proteinPercent = Math.round((proteinCalories / total) * 100);
  this.carbsPercent = Math.round((carbsCalories / total) * 100);
  this.fatsPercent = Math.round((fatCalories / total) * 100);
}
  }
}