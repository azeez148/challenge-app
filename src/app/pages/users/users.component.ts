
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { Observable, combineLatest, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { CampaignActions } from '../../state/campaigns/campaigns.actions';
import { selectExploreCampaigns } from '../../state/campaigns/campaigns.selectors';
import { MockDataService } from '../../services/mock-data.service';
import { User, Campaign } from '../../models';

interface UserWithCampaigns extends User {
  hostedCampaigns: Campaign[];
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTabsModule, MatListModule, MatButtonModule, MatIconModule, MatChipsModule, MatTableModule],
  template: `
    <div class="container py-4">
      <div class="d-flex align-items-center mb-4">
        <mat-icon class="me-2" style="font-size: 2rem; width: 2rem; height: 2rem; color: #1976d2;">manage_accounts</mat-icon>
        <h2 class="mb-0">Users Management</h2>
      </div>

      <ng-container *ngIf="vm$ | async as vm">
        <!-- Summary Cards -->
        <div class="row mb-4">
          <div class="col-md-4 mb-3">
            <mat-card class="text-center p-3">
              <mat-icon style="font-size: 2.5rem; width: 2.5rem; height: 2.5rem; color: #1976d2;">group</mat-icon>
              <h2 class="mt-2 mb-0">{{ vm.users.length }}</h2>
              <p class="text-muted mb-0">Total Users</p>
            </mat-card>
          </div>
          <div class="col-md-4 mb-3">
            <mat-card class="text-center p-3">
              <mat-icon style="font-size: 2.5rem; width: 2.5rem; height: 2.5rem; color: #388e3c;">person</mat-icon>
              <h2 class="mt-2 mb-0">{{ vm.participants.length }}</h2>
              <p class="text-muted mb-0">Participants</p>
            </mat-card>
          </div>
          <div class="col-md-4 mb-3">
            <mat-card class="text-center p-3">
              <mat-icon style="font-size: 2.5rem; width: 2.5rem; height: 2.5rem; color: #f57c00;">campaign</mat-icon>
              <h2 class="mt-2 mb-0">{{ vm.hosts.length }}</h2>
              <p class="text-muted mb-0">Campaign Hosts</p>
            </mat-card>
          </div>
        </div>

        <mat-tab-group>
          <!-- All Users Tab -->
          <mat-tab>
            <ng-template mat-tab-label>
              <mat-icon class="me-1">group</mat-icon> All Users
            </ng-template>
            <mat-list class="mt-2">
              <mat-list-item *ngFor="let user of vm.users" class="mb-2">
                <mat-icon matListItemIcon [style.color]="user.role === 'admin' ? '#f57c00' : '#1976d2'">
                  {{ user.role === 'admin' ? 'admin_panel_settings' : 'person' }}
                </mat-icon>
                <span matListItemTitle>{{ user.name }}</span>
                <span matListItemLine>{{ user.email }}</span>
                <div matListItemMeta class="d-flex align-items-center gap-2">
                  <span class="badge" [class.bg-warning]="user.role === 'admin'" [class.bg-primary]="user.role !== 'admin'">
                    {{ user.role }}
                  </span>
                  <button mat-icon-button color="primary" title="View Profile">
                    <mat-icon>visibility</mat-icon>
                  </button>
                  <button mat-icon-button color="warn" title="Block User">
                    <mat-icon>block</mat-icon>
                  </button>
                </div>
              </mat-list-item>
            </mat-list>
          </mat-tab>

          <!-- Participants Tab -->
          <mat-tab>
            <ng-template mat-tab-label>
              <mat-icon class="me-1">person</mat-icon> Participants
            </ng-template>
            <div class="mt-3">
              <p class="text-muted mb-3">Users actively participating in campaigns.</p>
              <mat-list>
                <mat-list-item *ngFor="let user of vm.participants" class="mb-2">
                  <mat-icon matListItemIcon color="primary">person</mat-icon>
                  <span matListItemTitle>{{ user.name }}</span>
                  <span matListItemLine>{{ user.email }}</span>
                  <div matListItemMeta>
                    <span class="badge bg-success">Participant</span>
                  </div>
                </mat-list-item>
              </mat-list>
            </div>
          </mat-tab>

          <!-- Campaign Hosts Tab -->
          <mat-tab>
            <ng-template mat-tab-label>
              <mat-icon class="me-1">campaign</mat-icon> Campaign Hosts
            </ng-template>
            <div class="mt-3">
              <p class="text-muted mb-3">Users hosting campaigns and their campaign details.</p>
              <div *ngFor="let host of vm.hostsWithCampaigns" class="mb-4">
                <mat-card>
                  <mat-card-header>
                    <mat-icon mat-card-avatar color="accent">account_circle</mat-icon>
                    <mat-card-title>{{ host.name }}</mat-card-title>
                    <mat-card-subtitle>{{ host.email }} &bull; Hosting {{ host.hostedCampaigns.length }} campaign(s)</mat-card-subtitle>
                  </mat-card-header>
                  <mat-card-content>
                    <mat-list dense>
                      <mat-list-item *ngFor="let campaign of host.hostedCampaigns">
                        <mat-icon matListItemIcon [style.color]="statusColor(campaign.status)">
                          {{ statusIcon(campaign.status) }}
                        </mat-icon>
                        <span matListItemTitle>{{ campaign.title }}</span>
                        <span matListItemLine>
                          {{ campaign.startDate | date:'mediumDate' }} — {{ campaign.endDate | date:'mediumDate' }}
                          &bull; {{ campaign.participantsCount }} participants
                        </span>
                        <div matListItemMeta>
                          <span class="badge" [class]="statusBadge(campaign.status)">{{ campaign.status }}</span>
                        </div>
                      </mat-list-item>
                    </mat-list>
                  </mat-card-content>
                </mat-card>
              </div>
            </div>
          </mat-tab>
        </mat-tab-group>
      </ng-container>
    </div>
  `
})
export class UsersComponent implements OnInit {
  private store = inject(Store);
  private mockDataService = inject(MockDataService);

  vm$ = combineLatest([
    this.mockDataService.getUsers(),
    this.store.select(selectExploreCampaigns)
  ]).pipe(
    map(([users, campaigns]) => {
      const hostIds = new Set(campaigns.map(c => c.hostId));
      const hosts = users.filter(u => hostIds.has(u.id));
      const participants = users.filter(u => u.role === 'user');

      const hostsWithCampaigns: UserWithCampaigns[] = hosts.map(host => ({
        ...host,
        hostedCampaigns: campaigns.filter(c => c.hostId === host.id)
      }));

      return { users, participants, hosts, hostsWithCampaigns };
    })
  );

  ngOnInit() {
    this.store.dispatch(CampaignActions.loadCampaigns());
  }

  statusColor(status: string): string {
    const map: Record<string, string> = {
      'in-progress': '#1976d2',
      'upcoming': '#388e3c',
      'past': '#757575',
      'cancelled': '#d32f2f'
    };
    return map[status] ?? '#757575';
  }

  statusIcon(status: string): string {
    const map: Record<string, string> = {
      'in-progress': 'directions_run',
      'upcoming': 'event_upcoming',
      'past': 'history',
      'cancelled': 'cancel'
    };
    return map[status] ?? 'campaign';
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
