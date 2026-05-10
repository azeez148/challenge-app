
import { Component, ViewChild, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated, selectIsAdmin } from './state/auth/auth.selectors';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, MatSidenavModule, MatListModule, MatIconModule, MatDividerModule, RouterModule],
  template: `
    <app-navbar [drawer]="drawer"></app-navbar>
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #drawer mode="over" [opened]="false">
        <div class="sidenav-header p-3 d-flex align-items-center">
          <mat-icon class="me-2" style="color: #1976d2;">emoji_events</mat-icon>
          <strong>ChallengeApp</strong>
        </div>
        <mat-divider></mat-divider>

        <mat-nav-list (click)="drawer.close()">
          <!-- Main Navigation -->
          <div class="nav-section-label px-3 pt-3 pb-1 text-muted small text-uppercase">Main</div>

          <a mat-list-item routerLink="/dashboard" routerLinkActive="active-link">
            <mat-icon matListItemIcon>home</mat-icon>
            <span matListItemTitle>Home</span>
          </a>

          <mat-divider class="my-1"></mat-divider>
          <div class="nav-section-label px-3 pt-2 pb-1 text-muted small text-uppercase">Campaigns</div>

          <a mat-list-item routerLink="/campaigns/in-progress" routerLinkActive="active-link">
            <mat-icon matListItemIcon>directions_run</mat-icon>
            <span matListItemTitle>In Progress</span>
          </a>
          <a mat-list-item routerLink="/campaigns/future" routerLinkActive="active-link">
            <mat-icon matListItemIcon>event_upcoming</mat-icon>
            <span matListItemTitle>Future Campaigns</span>
          </a>
          <a mat-list-item routerLink="/campaigns/past" routerLinkActive="active-link">
            <mat-icon matListItemIcon>history</mat-icon>
            <span matListItemTitle>Past Campaigns</span>
          </a>
          <a mat-list-item routerLink="/explore" routerLinkActive="active-link">
            <mat-icon matListItemIcon>explore</mat-icon>
            <span matListItemTitle>Explore All</span>
          </a>

          <mat-divider class="my-1"></mat-divider>
          <div class="nav-section-label px-3 pt-2 pb-1 text-muted small text-uppercase">Account</div>

          <a mat-list-item routerLink="/profile" routerLinkActive="active-link">
            <mat-icon matListItemIcon>person</mat-icon>
            <span matListItemTitle>Profile</span>
          </a>
          <a mat-list-item routerLink="/about" routerLinkActive="active-link">
            <mat-icon matListItemIcon>info</mat-icon>
            <span matListItemTitle>About</span>
          </a>

          <!-- Admin-only section -->
          <ng-container *ngIf="isAdmin$ | async">
            <mat-divider class="my-1"></mat-divider>
            <div class="nav-section-label px-3 pt-2 pb-1 text-muted small text-uppercase">Admin</div>

            <a mat-list-item routerLink="/users" routerLinkActive="active-link">
              <mat-icon matListItemIcon>manage_accounts</mat-icon>
              <span matListItemTitle>Users</span>
            </a>
            <a mat-list-item routerLink="/admin" routerLinkActive="active-link">
              <mat-icon matListItemIcon>admin_panel_settings</mat-icon>
              <span matListItemTitle>Admin Panel</span>
            </a>
          </ng-container>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container {
      height: calc(100vh - 64px);
    }
    mat-sidenav {
      width: 260px;
    }
    .sidenav-header {
      background: #f5f5f5;
    }
    .nav-section-label {
      font-size: 0.7rem;
      letter-spacing: 0.08em;
      font-weight: 600;
    }
    .active-link {
      background: rgba(25, 118, 210, 0.1);
      color: #1976d2;
    }
    .active-link mat-icon {
      color: #1976d2;
    }
  `]
})
export class AppComponent {
  private store = inject(Store);
  isAuthenticated$ = this.store.select(selectIsAuthenticated);
  isAdmin$ = this.store.select(selectIsAdmin);
  @ViewChild('drawer') drawer!: MatSidenav;
}
