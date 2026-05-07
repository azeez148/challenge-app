
import { Component, ViewChild, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from './state/auth/auth.selectors';
import { RouterModule } from '@angular/router';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, MatSidenavModule, MatListModule, MatIconModule, RouterModule],
  template: `
    <app-navbar [drawer]="drawer"></app-navbar>
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #drawer mode="over" [opened]="false">
        <mat-nav-list (click)="drawer.close()">
          <a mat-list-item routerLink="/dashboard">
            <mat-icon matListItemIcon>dashboard</mat-icon>
            <span matListItemTitle>Dashboard</span>
          </a>
          <a mat-list-item routerLink="/explore">
            <mat-icon matListItemIcon>explore</mat-icon>
            <span matListItemTitle>Explore</span>
          </a>
          <a mat-list-item routerLink="/host-dashboard">
            <mat-icon matListItemIcon>campaign</mat-icon>
            <span matListItemTitle>Host Dashboard</span>
          </a>
          <a mat-list-item routerLink="/profile">
            <mat-icon matListItemIcon>person</mat-icon>
            <span matListItemTitle>Profile</span>
          </a>
          <a mat-list-item routerLink="/admin">
            <mat-icon matListItemIcon>admin_panel_settings</mat-icon>
            <span matListItemTitle>Admin</span>
          </a>
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
      width: 250px;
    }
  `]
})
export class AppComponent {
  private store = inject(Store);
  isAuthenticated$ = this.store.select(selectIsAuthenticated);
  @ViewChild('drawer') drawer!: MatSidenav;
}
