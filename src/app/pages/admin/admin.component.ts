
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTabsModule, MatListModule, MatButtonModule, MatIconModule],
  template: `
    <div class="container py-4">
      <h3>🧑‍💼 Admin Panel</h3>
      <div class="row mt-4">
        <div class="col-md-6 mb-3">
          <mat-card class="bg-primary text-white">
            <mat-card-content class="p-4 text-center">
              <h2>1200</h2>
              <p class="mb-0">Total Users</p>
            </mat-card-content>
          </mat-card>
        </div>
        <div class="col-md-6 mb-3">
          <mat-card class="bg-accent text-white">
            <mat-card-content class="p-4 text-center">
              <h2>85</h2>
              <p class="mb-0">Active Campaigns</p>
            </mat-card-content>
          </mat-card>
        </div>
      </div>

      <mat-tab-group class="mt-4">
        <mat-tab label="Manage Users">
          <mat-list>
            <mat-list-item *ngFor="let i of [1,2,3,4,5]">
              <span matListItemTitle>User {{ i }}</span>
              <span matListItemLine>user{{ i }}&#64;example.com</span>
              <div matListItemMeta>
                <button mat-icon-button color="primary"><mat-icon>visibility</mat-icon></button>
                <button mat-icon-button color="warn"><mat-icon>block</mat-icon></button>
              </div>
            </mat-list-item>
          </mat-list>
        </mat-tab>
        <mat-tab label="Manage Campaigns">
          <mat-list>
            <mat-list-item *ngFor="let i of [1,2,3]">
              <span matListItemTitle>Campaign {{ i }}</span>
              <span matListItemLine>Status: In Progress</span>
              <div matListItemMeta>
                <button mat-icon-button color="warn"><mat-icon>delete</mat-icon></button>
              </div>
            </mat-list-item>
          </mat-list>
        </mat-tab>
      </mat-tab-group>
    </div>
  `
})
export class AdminComponent {}
