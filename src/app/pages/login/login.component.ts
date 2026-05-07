
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../state/auth/auth.actions';
import { selectAuthError, selectAuthLoading } from '../../state/auth/auth.selectors';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterModule],
  template: `
    <div class="container d-flex justify-content-center align-items-center" style="min-height: 80vh;">
      <mat-card style="width: 100%; max-width: 400px; padding: 20px;">
        <mat-card-header class="justify-content-center">
          <mat-card-title>Logo / Login</mat-card-title>
        </mat-card-header>
        <mat-card-content class="mt-4">
          <form (ngSubmit)="onLogin()">
            <mat-form-field appearance="outline" class="w-100">
              <mat-label>Email</mat-label>
              <input matInput type="email" [(ngModel)]="email" name="email" required placeholder="john@example.com">
            </mat-form-field>
            <mat-form-field appearance="outline" class="w-100">
              <mat-label>Password</mat-label>
              <input matInput type="password" [(ngModel)]="password" name="password" required placeholder="password">
            </mat-form-field>
            <div *ngIf="error$ | async" class="text-danger mb-3">{{ error$ | async }}</div>
            <button mat-flat-button color="primary" class="w-100" type="submit" [disabled]="loading$ | async" id="login-submit">
              Login
            </button>
          </form>
          <div class="text-center mt-3">
            <a routerLink="/forgot-password">Forgot Password?</a>
          </div>
          <div class="text-center my-3">--- OR ---</div>
          <button mat-stroked-button class="w-100" routerLink="/register">Register</button>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class LoginComponent {
  email = 'john@example.com';
  password = 'password';
  private store = inject(Store);
  loading$ = this.store.select(selectAuthLoading);
  error$ = this.store.select(selectAuthError);

  onLogin() {
    this.store.dispatch(AuthActions.login({ email: this.email, password: this.password }));
  }
}
