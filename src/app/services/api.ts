import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Api {
  private baseUrl = 'http://127.0.0.1:5001';

  constructor(private http: HttpClient) {}

  getRecipeById(id: string) {
  return this.http.get(`${this.baseUrl}/recipes/${id}`);
}

  getRecipes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/recipes`);
  }

  getMealplans(): Observable<any> {
    return this.http.get(`${this.baseUrl}/mealplans`);
  }

  createRecipe(recipe: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/recipes`, recipe);
  }
  deleteRecipe(id: string): Observable<any> {
  return this.http.delete(`${this.baseUrl}/recipes/${id}`);
}
createMealplan(mealplan: any): Observable<any> {
  return this.http.post(`${this.baseUrl}/mealplans`, mealplan);
}
updateRecipe(id: string, recipe: any): Observable<any> {
  return this.http.put(`${this.baseUrl}/recipes/${id}`, recipe);
}
deleteMealplan(id: string) {
  return this.http.delete(`${this.baseUrl}/mealplans/${id}`);
}
}