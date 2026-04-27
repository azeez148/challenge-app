
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterModule],
  template: `
    <div class="container d-flex justify-content-center align-items-center" style="min-height: 80vh;">
      <mat-card style="width: 100%; max-width: 400px; padding: 20px;">
        <mat-card-header class="justify-content-center">
          <mat-card-title>Forgot Password</mat-card-title>
        </mat-card-header>
        <mat-card-content class="mt-4">
          <p>Enter your email address and we'll send you a link to reset your password.</p>
          <mat-form-field appearance="outline" class="w-100">
            <mat-label>Email</mat-label>
            <input matInput type="email" required>
          </mat-form-field>
          <button mat-raised-button color="primary" class="w-100">
            Send Reset Link
          </button>
          <div class="text-center mt-3">
            Back to <a routerLink="/login">Login</a>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class ForgotPasswordComponent {}
