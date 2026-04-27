
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-messaging',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, RouterModule],
  template: `
    <div class="container py-4">
      <mat-card style="max-width: 600px;" class="mx-auto">
        <mat-card-header>
          <mat-card-title>📢 Send Message</mat-card-title>
        </mat-card-header>
        <mat-card-content class="mt-3">
          <mat-form-field appearance="outline" class="w-100">
            <mat-label>Message Box</mat-label>
            <textarea matInput [(ngModel)]="message" rows="5" placeholder="Reminder: Update your progress today!"></textarea>
          </mat-form-field>
        </mat-card-content>
        <mat-card-actions class="justify-content-end p-3">
          <button mat-raised-button color="primary" (click)="sendWhatsApp()">
            <i class="bi bi-whatsapp me-2"></i> Send via WhatsApp
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `
})
export class MessagingComponent {
  message = 'Reminder: Update your progress today!';

  sendWhatsApp() {
    const url = `https://wa.me/?text=${encodeURIComponent(this.message)}`;
    window.open(url, '_blank');
  }
}
