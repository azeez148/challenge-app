
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Store } from '@ngrx/store';
import { CampaignActions } from '../../state/campaigns/campaigns.actions';
import { selectInProgressCampaigns } from '../../state/campaigns/campaigns.selectors';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-in-progress-campaigns',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule, MatProgressBarModule, RouterModule],
  template: `
    <div class="container py-4">
      <div class="d-flex align-items-center mb-4">
        <mat-icon class="me-2 text-primary" style="font-size: 2rem; width: 2rem; height: 2rem;">directions_run</mat-icon>
        <h2 class="mb-0">In Progress Campaigns</h2>
      </div>

      <ng-container *ngIf="campaigns$ | async as campaigns">
        <div *ngIf="campaigns.length === 0" class="text-center py-5 text-muted">
          <mat-icon style="font-size: 4rem; width: 4rem; height: 4rem;">hourglass_empty</mat-icon>
          <p class="mt-3">No campaigns currently in progress.</p>
        </div>

        <div class="row">
          <div class="col-12 mb-3" *ngFor="let c of campaigns">
            <mat-card [routerLink]="['/campaign', c.id]" style="cursor: pointer">
              <mat-card-header>
                <mat-card-title>{{ c.title }}</mat-card-title>
                <mat-card-subtitle>
                  Host: {{ c.hostName }} &bull; {{ c.participantsCount }} participants
                </mat-card-subtitle>
              </mat-card-header>
              <mat-card-content class="pt-2">
                <p class="text-muted small mb-2">{{ c.description }}</p>
                <div class="d-flex justify-content-between small text-muted mb-2">
                  <span>Started: {{ c.startDate | date:'mediumDate' }}</span>
                  <span>Ends: {{ c.endDate | date:'mediumDate' }}</span>
                </div>
                <mat-progress-bar mode="determinate" [value]="getProgress(c.startDate, c.endDate)"></mat-progress-bar>
                <div class="d-flex justify-content-between small text-muted mt-1">
                  <span>Progress: {{ getProgress(c.startDate, c.endDate) | number:'1.0-0' }}%</span>
                  <span class="badge bg-warning text-dark">{{ c.type }}</span>
                </div>
              </mat-card-content>
              <mat-card-actions>
                <button mat-button color="primary">View Details</button>
                <button mat-flat-button color="accent">Join</button>
              </mat-card-actions>
            </mat-card>
          </div>
        </div>
      </ng-container>
    </div>
  `
})
export class InProgressCampaignsComponent implements OnInit {
  private store = inject(Store);
  campaigns$ = this.store.select(selectInProgressCampaigns);

  ngOnInit() {
    this.store.dispatch(CampaignActions.loadCampaigns());
  }

  getProgress(start: Date, end: Date): number {
    const now = Date.now();
    const s = new Date(start).getTime();
    const e = new Date(end).getTime();
    const pct = ((now - s) / (e - s)) * 100;
    return Math.min(100, Math.max(0, pct));
  }
}
