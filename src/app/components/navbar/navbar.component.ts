
import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { selectUser, selectIsAuthenticated } from '../../state/auth/auth.selectors';
import { AuthActions } from '../../state/auth/auth.actions';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
    <mat-toolbar color="primary" class="d-flex justify-content-between">
      <div class="d-flex align-items-center">
        <button mat-icon-button (click)="drawer?.toggle()" *ngIf="isAuthenticated$ | async">
          <mat-icon>menu</mat-icon>
        </button>
        <span routerLink="/" style="cursor: pointer" class="ms-2">ChallengeApp</span>
      </div>
      <div class="d-flex align-items-center">
        <ng-container *ngIf="isAuthenticated$ | async; else loginBtn">
          <button mat-icon-button routerLink="/notifications" class="me-2">
            <mat-icon>notifications</mat-icon>
          </button>
          <button mat-icon-button routerLink="/profile" class="me-2">
            <mat-icon>account_circle</mat-icon>
          </button>
          <button mat-button (click)="logout()">Logout</button>
        </ng-container>
        <ng-template #loginBtn>
          <button mat-button routerLink="/login">Login</button>
        </ng-template>
      </div>
    </mat-toolbar>
  `
})
export class NavbarComponent {
  @Input() drawer?: MatSidenav;
  private store = inject(Store);
  user$ = this.store.select(selectUser);
  isAuthenticated$ = this.store.select(selectIsAuthenticated);

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
