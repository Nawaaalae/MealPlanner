import { Component, DoCheck, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from './services/auth';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements DoCheck {
  username: string = '';
  protected readonly window = window;

  auth0 = inject(AuthService);

  constructor(private auth: Auth, private router: Router) {}

  ngDoCheck(): void {
    this.username = localStorage.getItem('username') || '';
  }

  isCustomLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logoutCustom(): void {
    this.auth.logout();
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    this.router.navigate(['/']);
  }
}