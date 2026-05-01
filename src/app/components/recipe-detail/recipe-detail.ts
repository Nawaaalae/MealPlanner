import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { Api } from '../../services/api';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-recipe-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css'
})
export class RecipeDetail implements OnInit {
  recipe: any;
  message: string = '';

  isAdmin(): boolean {
  return localStorage.getItem('role') === 'admin';
}

  auth0 = inject(AuthService);

  constructor(
    private route: ActivatedRoute,
    private api: Api,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.api.getRecipeById(id).subscribe({
        next: (data: any) => {
          this.recipe = data;
        },
        error: () => {
          this.message = 'Could not load recipe';
        }
      });
    }
  }

  isCustomLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

 deleteRecipe(): void {
  const customLoggedIn = this.isCustomLoggedIn();

  this.auth0.isAuthenticated$.subscribe((auth0LoggedIn) => {
    if (!customLoggedIn && !auth0LoggedIn) {
      this.message = 'You must be logged in to delete recipes';
      return;
    }

    if (!confirm('Are you sure you want to delete this recipe?')) {
      return;
    }

    this.api.deleteRecipe(this.recipe._id).subscribe({
      next: () => {
        this.router.navigate(['/recipes']);
      },
      error: () => {
        this.message = 'Could not delete recipe';
      }
    });
  });
}}