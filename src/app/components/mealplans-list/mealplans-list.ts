import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Api } from '../../services/api';

@Component({
  selector: 'app-mealplans-list',
  imports: [CommonModule],
  templateUrl: './mealplans-list.html',
  styleUrl: './mealplans-list.css'
})
export class MealplansList implements OnInit {

  mealplans: any[] = [];
  message: string = '';

  isAdmin(): boolean {
  return localStorage.getItem('role') === 'admin';
}

  constructor(private api: Api) {}

  ngOnInit(): void {
    this.loadMealplans();
  }

  loadMealplans(): void {
    this.api.getMealplans().subscribe({
      next: (data: any) => {

  const username = localStorage.getItem('username');

  this.mealplans = data.filter((mealplan: any) => {
    return mealplan.user === username;
  });
},
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  onDelete(id: string): void {
    this.api.deleteMealplan(id).subscribe({
      next: () => {
        this.message = 'Mealplan deleted successfully';
       this.ngOnInit();
      },
      error: () => {
        this.message = 'Could not delete mealplan';
      }
    });
  }

}