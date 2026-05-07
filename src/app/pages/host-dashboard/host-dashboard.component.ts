
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { CampaignActions } from '../../state/campaigns/campaigns.actions';
import { selectHostedCampaigns } from '../../state/campaigns/campaigns.selectors';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-host-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, RouterModule],
  template: `
    <div class="container py-4">
      <h3>📊 My Hosted Campaigns</h3>
      <div class="row mt-4">
        <div class="col-12 mb-3" *ngFor="let c of hostedCampaigns$ | async">
          <mat-card>
            <mat-card-header>
              <mat-card-title>{{ c.title }}</mat-card-title>
              <mat-card-subtitle>Status: {{ c.status }}</mat-card-subtitle>
            </mat-card-header>
            <mat-card-actions>
              <button mat-button color="primary" *ngIf="c.status === 'upcoming'">Start</button>
              <button mat-button color="warn" *ngIf="c.status === 'in-progress'">End</button>
              <button mat-button>Edit</button>
              <button mat-button color="accent" routerLink="/messaging">Message Participants</button>
            </mat-card-actions>
          </mat-card>
        </div>
      </div>
    </div>
  `
})
export class HostDashboardComponent implements OnInit {
  private store = inject(Store);
  hostedCampaigns$ = this.store.select(selectHostedCampaigns);

  ngOnInit() {
    this.store.dispatch(CampaignActions.loadHostedCampaigns());
  }
}
