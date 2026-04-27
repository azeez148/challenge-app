
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { Store } from '@ngrx/store';
import { CampaignActions } from '../../state/campaigns/campaigns.actions';
import { selectSelectedCampaign, selectCampaignLoading } from '../../state/campaigns/campaigns.selectors';

@Component({
  selector: 'app-campaign-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatDividerModule, MatListModule, RouterModule],
  template: `
    <div class="container py-4" *ngIf="campaign$ | async as c">
      <mat-card class="mb-4">
        <mat-card-header>
          <mat-card-title>{{ c.title }}</mat-card-title>
          <mat-card-subtitle>Host: {{ c.hostName }} | Status: {{ c.status }}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content class="mt-3">
          <h5>📄 Description</h5>
          <p>{{ c.description }}</p>
          <div class="row mt-3">
            <div class="col-6">
              <p class="mb-0"><strong>🎯 Goal:</strong> {{ c.targetGoal }} {{ c.metricType }}</p>
            </div>
            <div class="col-6">
              <p class="mb-0"><strong>⏱ Duration:</strong> 30 days</p>
            </div>
          </div>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary">Join</button>
          <button mat-button color="warn">Leave</button>
        </mat-card-actions>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title>🏆 Leaderboard</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-list>
            <mat-list-item *ngFor="let p of c.leaderboard">
              <span matListItemTitle>#{{ p.rank }} {{ p.userName }}</span>
              <span matListItemLine>{{ p.currentValue }} {{ c.metricType }} ({{ p.progressPercentage }}%)</span>
            </mat-list-item>
          </mat-list>
        </mat-card-content>
      </mat-card>

      <div class="mt-4">
        <button mat-fab extended color="accent">
          <mat-icon>add</mat-icon>
          Add Progress
        </button>
      </div>
    </div>
  `
})
export class CampaignDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private store = inject(Store);
  campaign$ = this.store.select(selectSelectedCampaign);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.store.dispatch(CampaignActions.loadCampaignDetail({ id }));
    }
  }
}
