import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Api } from '../../services/api';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './recipes-list.html',
  styleUrl: './recipes-list.css'
})
export class RecipesList implements OnInit {

  recipes: any[] = [];
  filteredRecipes: any[] = [];
  searchText: string = '';
  message: string = '';
  isLoading: boolean = true;

  constructor(private api: Api) {}

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes(): void {
  this.isLoading = true;

  this.api.getRecipes().subscribe({
    next: (data: any) => {
      this.recipes = data;
      this.filteredRecipes = data;
      this.isLoading = false;
    },
    error: () => {
      this.message = 'Could not load recipes';
      this.isLoading = false;
    }
  });
}

  filterRecipes(): void {
    const search = this.searchText.toLowerCase();

    this.filteredRecipes = this.recipes.filter((recipe: any) =>
      recipe.name?.toLowerCase().includes(search) ||
      recipe.category?.toLowerCase().includes(search)
    );
  }

}