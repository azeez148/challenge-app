
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, RouterModule],
  template: `
    <div class="container py-5">
      <div class="text-center mb-5">
        <mat-icon style="font-size: 5rem; width: 5rem; height: 5rem; color: #1976d2;">emoji_events</mat-icon>
        <h1 class="mt-3">About ChallengeApp</h1>
        <p class="lead text-muted">Your platform for fitness challenges, motivation, and community.</p>
      </div>

      <div class="row mb-5">
        <div class="col-md-4 mb-4">
          <mat-card class="text-center p-4 h-100">
            <mat-icon style="font-size: 3rem; width: 3rem; height: 3rem; color: #1976d2;">flag</mat-icon>
            <h4 class="mt-3">Our Mission</h4>
            <p class="text-muted">
              Empower people to reach their health and fitness goals through friendly competition,
              accountability, and community support.
            </p>
          </mat-card>
        </div>
        <div class="col-md-4 mb-4">
          <mat-card class="text-center p-4 h-100">
            <mat-icon style="font-size: 3rem; width: 3rem; height: 3rem; color: #388e3c;">group</mat-icon>
            <h4 class="mt-3">Community</h4>
            <p class="text-muted">
              Join thousands of users across hundreds of challenges. Whether you're walking,
              running, or lifting — there's a challenge for you.
            </p>
          </mat-card>
        </div>
        <div class="col-md-4 mb-4">
          <mat-card class="text-center p-4 h-100">
            <mat-icon style="font-size: 3rem; width: 3rem; height: 3rem; color: #f57c00;">trending_up</mat-icon>
            <h4 class="mt-3">Track Progress</h4>
            <p class="text-muted">
              Log your metrics, climb the leaderboard, and celebrate wins with your friends and teammates.
            </p>
          </mat-card>
        </div>
      </div>

      <mat-card class="mb-5 p-4">
        <h3 class="mb-3">How It Works</h3>
        <div class="row">
          <div class="col-md-3 text-center mb-3">
            <div class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3"
                 style="width: 56px; height: 56px; font-size: 1.4rem; font-weight: bold;">1</div>
            <h5>Sign Up</h5>
            <p class="text-muted small">Create your free account and set up your profile.</p>
          </div>
          <div class="col-md-3 text-center mb-3">
            <div class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3"
                 style="width: 56px; height: 56px; font-size: 1.4rem; font-weight: bold;">2</div>
            <h5>Join a Challenge</h5>
            <p class="text-muted small">Browse public campaigns or get invited by a host.</p>
          </div>
          <div class="col-md-3 text-center mb-3">
            <div class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3"
                 style="width: 56px; height: 56px; font-size: 1.4rem; font-weight: bold;">3</div>
            <h5>Log Progress</h5>
            <p class="text-muted small">Track your daily metrics and watch your rank improve.</p>
          </div>
          <div class="col-md-3 text-center mb-3">
            <div class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3"
                 style="width: 56px; height: 56px; font-size: 1.4rem; font-weight: bold;">4</div>
            <h5>Win & Celebrate</h5>
            <p class="text-muted small">Reach the top of the leaderboard and earn recognition.</p>
          </div>
        </div>
      </mat-card>

      <div class="text-center">
        <h3 class="mb-3">Ready to Get Started?</h3>
        <button mat-flat-button color="primary" routerLink="/register" class="me-3">
          <mat-icon>person_add</mat-icon> Create Account
        </button>
        <button mat-stroked-button routerLink="/explore">
          <mat-icon>explore</mat-icon> Explore Campaigns
        </button>
      </div>
    </div>
  `
})
export class AboutComponent {}
