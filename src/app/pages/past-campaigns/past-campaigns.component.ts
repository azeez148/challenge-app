
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { CampaignActions } from '../../state/campaigns/campaigns.actions';
import { selectPastCampaigns } from '../../state/campaigns/campaigns.selectors';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-past-campaigns',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, RouterModule],
  template: `
    <div class="container py-4">
      <div class="d-flex align-items-center mb-4">
        <mat-icon class="me-2 text-secondary" style="font-size: 2rem; width: 2rem; height: 2rem;">history</mat-icon>
        <h2 class="mb-0">Past Campaigns</h2>
      </div>

      <ng-container *ngIf="campaigns$ | async as campaigns">
        <div *ngIf="campaigns.length === 0" class="text-center py-5 text-muted">
          <mat-icon style="font-size: 4rem; width: 4rem; height: 4rem;">history</mat-icon>
          <p class="mt-3">No past campaigns found.</p>
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
                <div class="d-flex flex-wrap gap-3 small text-muted">
                  <span>
                    <mat-icon class="small-icon">calendar_today</mat-icon>
                    {{ c.startDate | date:'mediumDate' }}
                  </span>
                  <span>—</span>
                  <span>
                    <mat-icon class="small-icon">event</mat-icon>
                    {{ c.endDate | date:'mediumDate' }}
                  </span>
                  <span class="badge bg-secondary ms-auto">{{ c.type }}</span>
                </div>
              </mat-card-content>
              <mat-card-actions>
                <button mat-button color="primary">View Results</button>
              </mat-card-actions>
            </mat-card>
          </div>
        </div>
      </ng-container>
    </div>
  `,
  styles: [`
    .small-icon { font-size: 14px; width: 14px; height: 14px; vertical-align: middle; }
  `]
})
export class PastCampaignsComponent implements OnInit {
  private store = inject(Store);
  campaigns$ = this.store.select(selectPastCampaigns);

  ngOnInit() {
    this.store.dispatch(CampaignActions.loadCampaigns());
  }
}
