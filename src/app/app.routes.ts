import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { RecipesList } from './components/recipes-list/recipes-list';
import { MealplansList } from './components/mealplans-list/mealplans-list';
import { AddRecipe } from './components/add-recipe/add-recipe';
import { EditRecipe } from './components/edit-recipe/edit-recipe';
import { AddMealplan } from './components/add-mealplan/add-mealplan';
import { RecipeDetail } from './components/recipe-detail/recipe-detail';
import { authGuard } from './guards/auth-guard';
import { NutritionTracker } from './components/nutrition-tracker/nutrition-tracker';

export const routes: Routes = [
  { path: '', component: Home, canActivate: [authGuard] },
  { path: 'login', component: Login },
  { path: 'recipes', component: RecipesList, canActivate: [authGuard] },
  { path: 'add-recipe', component: AddRecipe, canActivate: [authGuard]},
  { path: 'edit-recipe/:id', component: EditRecipe, canActivate: [authGuard] },
  { path: 'mealplans', component: MealplansList, canActivate: [authGuard]},
  { path: 'add-mealplan', component: AddMealplan, canActivate: [authGuard] },
  { path: 'recipes/:id', component: RecipeDetail, canActivate: [authGuard] },
  { path: 'nutrition-tracker', component: NutritionTracker, canActivate: [authGuard] },
];