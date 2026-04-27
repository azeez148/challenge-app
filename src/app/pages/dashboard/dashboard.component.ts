
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Store } from '@ngrx/store';
import { CampaignActions } from '../../state/campaigns/campaigns.actions';
import { selectMyCampaigns, selectExploreCampaigns } from '../../state/campaigns/campaigns.selectors';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatCardModule, MatButtonModule, MatIconModule, MatProgressBarModule, RouterModule],
  template: `
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
          <mat-tab label="Upcoming"></mat-tab>
          <mat-tab label="Past"></mat-tab>
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
  `
})
export class DashboardComponent implements OnInit {
  private store = inject(Store);
  myCampaigns$ = this.store.select(selectMyCampaigns);
  exploreCampaigns$ = this.store.select(selectExploreCampaigns);

  ngOnInit() {
    this.store.dispatch(CampaignActions.loadMyCampaigns());
    this.store.dispatch(CampaignActions.loadCampaigns());
  }
}
