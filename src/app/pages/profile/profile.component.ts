
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { selectUser } from '../../state/auth/auth.selectors';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="container py-4">
      <mat-card class="mx-auto" style="max-width: 500px;">
        <div class="text-center py-4">
          <mat-icon style="font-size: 80px; width: 80px; height: 80px; color: #ccc;">account_circle</mat-icon>
        </div>
        <mat-card-content *ngIf="user$ | async as user">
          <h3 class="text-center">{{ user.name }}</h3>
          <p class="text-center text-muted">{{ user.email }}</p>
          <hr>
          <div class="mb-3">
            <strong>Phone:</strong> {{ user.phone || 'Not provided' }}
          </div>
          <div class="d-grid gap-2">
            <button mat-raised-button color="primary">Edit Profile</button>
            <button mat-stroked-button>Change Password</button>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class ProfileComponent {
  private store = inject(Store);
  user$ = this.store.select(selectUser);
}
