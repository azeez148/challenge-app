
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { CampaignActions } from '../../state/campaigns/campaigns.actions';
import { selectExploreCampaigns } from '../../state/campaigns/campaigns.selectors';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-campaign-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatSelectModule, MatInputModule, RouterModule],
  template: `
    <div class="container py-4">
      <div class="row mb-4">
        <div class="col-md-6 mb-3">
          <mat-form-field appearance="outline" class="w-100">
            <mat-label>Search...</mat-label>
            <input matInput placeholder="Search campaigns">
            <mat-icon matSuffix>search</mat-icon>
          </mat-form-field>
        </div>
        <div class="col-md-2 mb-3">
          <mat-form-field appearance="outline" class="w-100">
            <mat-label>Type</mat-label>
            <mat-select>
              <mat-option value="all">All</mat-option>
              <mat-option value="weight-loss">Weight Loss</mat-option>
              <mat-option value="steps">Steps</mat-option>
            </mat-select>
          </mat-form-field>
        </div>
        <div class="col-md-2 mb-3">
          <mat-form-field appearance="outline" class="w-100">
            <mat-label>Status</mat-label>
            <mat-select>
              <mat-option value="all">All</mat-option>
              <mat-option value="upcoming">Upcoming</mat-option>
              <mat-option value="in-progress">In Progress</mat-option>
            </mat-select>
          </mat-form-field>
        </div>
        <div class="col-md-2 mb-3">
          <mat-form-field appearance="outline" class="w-100">
            <mat-label>Sort</mat-label>
            <mat-select>
              <mat-option value="newest">Newest</mat-option>
              <mat-option value="participants">Participants</mat-option>
            </mat-select>
          </mat-form-field>
        </div>
      </div>

      <div class="row">
        <div class="col-12 mb-3" *ngFor="let c of exploreCampaigns$ | async">
          <mat-card [routerLink]="['/campaign', c.id]" style="cursor: pointer">
            <mat-card-header>
              <mat-card-title>{{ c.title }}</mat-card-title>
              <mat-card-subtitle>
                Start: {{ c.startDate | date }} | Participants: {{ c.participantsCount }}
              </mat-card-subtitle>
            </mat-card-header>
            <mat-card-actions class="justify-content-end">
              <button mat-flat-button color="primary">Join</button>
            </mat-card-actions>
          </mat-card>
        </div>
      </div>
    </div>
  `
})
export class CampaignListComponent implements OnInit {
  private store = inject(Store);
  exploreCampaigns$ = this.store.select(selectExploreCampaigns);

  ngOnInit() {
    this.store.dispatch(CampaignActions.loadCampaigns());
  }
}
