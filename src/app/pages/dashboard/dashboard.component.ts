
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Store } from '@ngrx/store';
import { CampaignActions } from '../../state/campaigns/campaigns.actions';
import {
  selectMyCampaigns,
  selectExploreCampaigns,
  selectInProgressCampaigns,
  selectUpcomingCampaigns,
  selectPastCampaigns
} from '../../state/campaigns/campaigns.selectors';
import { selectUser, selectIsAdmin } from '../../state/auth/auth.selectors';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatCardModule, MatButtonModule, MatIconModule, MatProgressBarModule, RouterModule],
  template: `
    <ng-container *ngIf="isAdmin$ | async; else userDashboard">
      <!-- Admin Dashboard -->
      <div class="container py-4">
        <div class="d-flex align-items-center mb-4">
          <mat-icon class="me-2" style="font-size: 2rem; width: 2rem; height: 2rem; color: #f57c00;">admin_panel_settings</mat-icon>
          <h2 class="mb-0">Admin Dashboard</h2>
        </div>

        <div class="row mb-4">
          <div class="col-md-3 col-6 mb-3">
            <mat-card class="text-center p-3">
              <mat-icon style="font-size: 2.5rem; width: 2.5rem; height: 2.5rem; color: #1976d2;">group</mat-icon>
              <h3 class="mt-2 mb-0">{{ (exploreCampaigns$ | async)?.length || 0 }}</h3>
              <p class="text-muted mb-0 small">Total Campaigns</p>
            </mat-card>
          </div>
          <div class="col-md-3 col-6 mb-3">
            <mat-card class="text-center p-3">
              <mat-icon style="font-size: 2.5rem; width: 2.5rem; height: 2.5rem; color: #388e3c;">directions_run</mat-icon>
              <h3 class="mt-2 mb-0">{{ (inProgressCampaigns$ | async)?.length || 0 }}</h3>
              <p class="text-muted mb-0 small">In Progress</p>
            </mat-card>
          </div>
          <div class="col-md-3 col-6 mb-3">
            <mat-card class="text-center p-3">
              <mat-icon style="font-size: 2.5rem; width: 2.5rem; height: 2.5rem; color: #f57c00;">event_upcoming</mat-icon>
              <h3 class="mt-2 mb-0">{{ (upcomingCampaigns$ | async)?.length || 0 }}</h3>
              <p class="text-muted mb-0 small">Upcoming</p>
            </mat-card>
          </div>
          <div class="col-md-3 col-6 mb-3">
            <mat-card class="text-center p-3">
              <mat-icon style="font-size: 2.5rem; width: 2.5rem; height: 2.5rem; color: #757575;">history</mat-icon>
              <h3 class="mt-2 mb-0">{{ (pastCampaigns$ | async)?.length || 0 }}</h3>
              <p class="text-muted mb-0 small">Past</p>
            </mat-card>
          </div>
        </div>

        <div class="row mb-4">
          <div class="col-md-6 mb-3">
            <mat-card class="p-3 h-100">
              <h5 class="mb-3"><mat-icon class="me-1">link</mat-icon> Quick Actions</h5>
              <div class="d-grid gap-2">
                <button mat-stroked-button routerLink="/users">
                  <mat-icon>manage_accounts</mat-icon> Manage Users
                </button>
                <button mat-stroked-button routerLink="/campaigns/in-progress">
                  <mat-icon>directions_run</mat-icon> View In Progress Campaigns
                </button>
                <button mat-stroked-button routerLink="/campaigns/future">
                  <mat-icon>event_upcoming</mat-icon> View Upcoming Campaigns
                </button>
                <button mat-stroked-button routerLink="/campaigns/past">
                  <mat-icon>history</mat-icon> View Past Campaigns
                </button>
              </div>
            </mat-card>
          </div>
          <div class="col-md-6 mb-3">
            <mat-card class="p-3 h-100">
              <h5 class="mb-3"><mat-icon class="me-1">campaign</mat-icon> All Campaigns</h5>
              <div *ngFor="let c of exploreCampaigns$ | async" class="mb-2 p-2 border rounded d-flex justify-content-between align-items-center">
                <div>
                  <strong class="d-block">{{ c.title }}</strong>
                  <small class="text-muted">{{ c.participantsCount }} participants</small>
                </div>
                <span class="badge" [class]="statusBadge(c.status)">{{ c.status }}</span>
              </div>
            </mat-card>
          </div>
        </div>
      </div>
    </ng-container>

    <!-- User Dashboard -->
    <ng-template #userDashboard>
      <div class="container py-4">
        <div class="mb-4">
          <input type="text" class="form-control" placeholder="🔍 Search campaigns...">
        </div>

        <section class="mb-4">
          <h3>⭐ My Campaigns</h3>
          <mat-tab-group>
            <mat-tab label="In Progress">
              <div class="row mt-3">
                <div class="col-12 mb-3" *ngFor="let c of myCampaigns$ | async">
                  <mat-card [routerLink]="['/campaign', c.id]" style="cursor: pointer">
                    <mat-card-content>
                      <div class="d-flex justify-content-between">
                        <h5 class="mb-1">{{ c.title }}</h5>
                        <span class="badge bg-primary">{{ c.status }}</span>
                      </div>
                      <p class="text-muted small mb-2">Rank: #3 | Progress: 65%</p>
                      <mat-progress-bar mode="determinate" value="65"></mat-progress-bar>
                    </mat-card-content>
                  </mat-card>
                </div>
              </div>
            </mat-tab>
            <mat-tab label="Upcoming">
              <div class="row mt-3">
                <div class="col-12 mb-3" *ngFor="let c of upcomingCampaigns$ | async">
                  <mat-card [routerLink]="['/campaign', c.id]" style="cursor: pointer">
                    <mat-card-content>
                      <div class="d-flex justify-content-between">
                        <h5 class="mb-1">{{ c.title }}</h5>
                        <span class="badge bg-success">{{ c.status }}</span>
                      </div>
                      <p class="text-muted small mb-2">Starts: {{ c.startDate | date:'mediumDate' }}</p>
                    </mat-card-content>
                  </mat-card>
                </div>
              </div>
            </mat-tab>
            <mat-tab label="Past">
              <div class="row mt-3">
                <div class="col-12 mb-3" *ngFor="let c of pastCampaigns$ | async">
                  <mat-card [routerLink]="['/campaign', c.id]" style="cursor: pointer">
                    <mat-card-content>
                      <div class="d-flex justify-content-between">
                        <h5 class="mb-1">{{ c.title }}</h5>
                        <span class="badge bg-secondary">{{ c.status }}</span>
                      </div>
                      <p class="text-muted small mb-2">Ended: {{ c.endDate | date:'mediumDate' }}</p>
                    </mat-card-content>
                  </mat-card>
                </div>
              </div>
            </mat-tab>
          </mat-tab-group>
        </section>

        <section>
          <h3>🌍 Explore Public Campaigns</h3>
          <div class="row">
            <div class="col-12 mb-3" *ngFor="let c of exploreCampaigns$ | async">
              <mat-card>
                <mat-card-content class="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 class="mb-0">{{ c.title }}</h5>
                    <small class="text-muted">{{ c.participantsCount }} participants</small>
                  </div>
                  <button mat-flat-button color="accent">Join</button>
                </mat-card-content>
              </mat-card>
            </div>
          </div>
        </section>

        <div class="fixed-bottom p-3 d-flex justify-content-end">
          <button mat-fab color="primary" routerLink="/create-campaign">
            <mat-icon>add</mat-icon>
          </button>
        </div>
      </div>
    </ng-template>
  `
})
export class DashboardComponent implements OnInit {
  private store = inject(Store);
  user$ = this.store.select(selectUser);
  isAdmin$ = this.store.select(selectIsAdmin);
  myCampaigns$ = this.store.select(selectMyCampaigns);
  exploreCampaigns$ = this.store.select(selectExploreCampaigns);
  inProgressCampaigns$ = this.store.select(selectInProgressCampaigns);
  upcomingCampaigns$ = this.store.select(selectUpcomingCampaigns);
  pastCampaigns$ = this.store.select(selectPastCampaigns);

  ngOnInit() {
    this.store.dispatch(CampaignActions.loadMyCampaigns());
    this.store.dispatch(CampaignActions.loadCampaigns());
  }

  statusBadge(status: string): string {
    const map: Record<string, string> = {
      'in-progress': 'bg-primary',
      'upcoming': 'bg-success',
      'past': 'bg-secondary',
      'cancelled': 'bg-danger'
    };
    return map[status] ?? 'bg-secondary';
  }
}

