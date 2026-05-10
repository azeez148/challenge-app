
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Store } from '@ngrx/store';
import { CampaignActions } from '../../state/campaigns/campaigns.actions';
import { selectUpcomingCampaigns } from '../../state/campaigns/campaigns.selectors';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-future-campaigns',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule, RouterModule],
  template: `
    <div class="container py-4">
      <div class="d-flex align-items-center mb-4">
        <mat-icon class="me-2 text-success" style="font-size: 2rem; width: 2rem; height: 2rem;">event_upcoming</mat-icon>
        <h2 class="mb-0">Future Campaigns</h2>
      </div>

      <ng-container *ngIf="campaigns$ | async as campaigns">
        <div *ngIf="campaigns.length === 0" class="text-center py-5 text-muted">
          <mat-icon style="font-size: 4rem; width: 4rem; height: 4rem;">event_busy</mat-icon>
          <p class="mt-3">No upcoming campaigns found.</p>
        </div>

        <div class="row">
          <div class="col-md-6 mb-3" *ngFor="let c of campaigns">
            <mat-card [routerLink]="['/campaign', c.id]" style="cursor: pointer; height: 100%;">
              <mat-card-header>
                <mat-card-title>{{ c.title }}</mat-card-title>
                <mat-card-subtitle>
                  Host: {{ c.hostName }}
                </mat-card-subtitle>
              </mat-card-header>
              <mat-card-content class="pt-2">
                <p class="text-muted small mb-3">{{ c.description }}</p>
                <div class="d-flex flex-column gap-1 small">
                  <div class="d-flex align-items-center">
                    <mat-icon class="me-2 small-icon text-muted">calendar_today</mat-icon>
                    <span>Starts: <strong>{{ c.startDate | date:'mediumDate' }}</strong></span>
                  </div>
                  <div class="d-flex align-items-center">
                    <mat-icon class="me-2 small-icon text-muted">event</mat-icon>
                    <span>Ends: <strong>{{ c.endDate | date:'mediumDate' }}</strong></span>
                  </div>
                  <div class="d-flex align-items-center">
                    <mat-icon class="me-2 small-icon text-muted">group</mat-icon>
                    <span>{{ c.participantsCount }} registered</span>
                  </div>
                </div>
              </mat-card-content>
              <mat-card-actions>
                <button mat-flat-button color="primary">Register Now</button>
                <button mat-button>Details</button>
              </mat-card-actions>
            </mat-card>
          </div>
        </div>
      </ng-container>
    </div>
  `,
  styles: [`
    .small-icon { font-size: 16px; width: 16px; height: 16px; }
  `]
})
export class FutureCampaignsComponent implements OnInit {
  private store = inject(Store);
  campaigns$ = this.store.select(selectUpcomingCampaigns);

  ngOnInit() {
    this.store.dispatch(CampaignActions.loadCampaigns());
  }
}
