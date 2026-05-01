import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  isSignup: boolean = false;

  username: string = '';
  email: string = '';
  password: string = '';
  message: string = '';

  auth0 = inject(AuthService);

  constructor(private auth: Auth, private router: Router) {}

  switchMode(): void {
    this.isSignup = !this.isSignup;
    this.message = '';
  }

  onSubmit(): void {
    if (this.isSignup) {
      const registerData = {
        username: this.username,
        email: this.email,
        password: this.password
      };

      this.auth.register(registerData).subscribe({
        next: () => {
          this.message = 'Sign up successful. You can now log in.';
          this.isSignup = false;
        },
        error: () => {
          this.message = 'Sign up failed';
        }
      });

    } else {
      const loginData = {
        username: this.username,
        password: this.password
      };

      this.auth.login(loginData).subscribe({
        next: () => {
    localStorage.setItem('username', this.username);

   const adminUsers = ['admin', 'admin2'];

if (adminUsers.includes(this.username.toLowerCase())) {
  localStorage.setItem('role', 'admin');
} else {
  localStorage.setItem('role', 'user');
}
    this.router.navigate(['/']);
  },
  error: () => {
    this.message = 'Login failed';
  }
      });
    }
  }

  loginAuth0(): void {
    this.auth0.loginWithRedirect();
  }

 
}