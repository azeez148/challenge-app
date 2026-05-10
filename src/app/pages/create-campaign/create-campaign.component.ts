
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Store } from '@ngrx/store';
import { CampaignActions } from '../../state/campaigns/campaigns.actions';
import { Router } from '@angular/router';
import { Campaign } from '../../models';

type MetricOption = { value: string; label: string };

const METRIC_OPTIONS_BY_TYPE: Record<string, MetricOption[]> = {
  'weight-loss': [
    { value: 'kg', label: 'kg (kilograms)' },
    { value: 'lbs', label: 'lbs (pounds)' }
  ],
  'weight-gain': [
    { value: 'kg', label: 'kg (kilograms)' },
    { value: 'lbs', label: 'lbs (pounds)' }
  ],
  'steps': [
    { value: 'steps', label: 'steps' }
  ],
  'running': [
    { value: 'km', label: 'km (kilometres)' },
    { value: 'miles', label: 'miles' }
  ],
  'other': [
    { value: 'kg', label: 'kg (kilograms)' },
    { value: 'lbs', label: 'lbs (pounds)' },
    { value: 'steps', label: 'steps' },
    { value: 'km', label: 'km (kilometres)' },
    { value: 'miles', label: 'miles' },
    { value: 'calories', label: 'calories' },
    { value: 'other', label: 'Other (specify below)' }
  ]
};

@Component({
  selector: 'app-create-campaign',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule
  ],
  template: `
    <div class="container py-4">
      <h3>➕ Create Campaign</h3>
      <mat-stepper orientation="vertical" #stepper>
        <mat-step [stepControl]="infoForm">
          <form [formGroup]="infoForm">
            <ng-template matStepLabel>Step 1: Basic Info</ng-template>
            <mat-form-field appearance="outline" class="w-100">
              <mat-label>Campaign Name</mat-label>
              <input matInput formControlName="name" required>
            </mat-form-field>
            <mat-form-field appearance="outline" class="w-100">
              <mat-label>Description</mat-label>
              <textarea matInput formControlName="description" rows="3"></textarea>
            </mat-form-field>
            <mat-form-field appearance="outline" class="w-100">
              <mat-label>Type</mat-label>
              <mat-select formControlName="type">
                <mat-option value="weight-loss">Weight Loss</mat-option>
                <mat-option value="weight-gain">Weight Gain</mat-option>
                <mat-option value="steps">Steps</mat-option>
                <mat-option value="running">Running</mat-option>
                <mat-option value="other">Other</mat-option>
              </mat-select>
            </mat-form-field>
            <div>
              <button mat-button matStepperNext>Next</button>
            </div>
          </form>
        </mat-step>

        <mat-step [stepControl]="rulesForm">
          <form [formGroup]="rulesForm">
            <ng-template matStepLabel>Step 2: Rules</ng-template>

            <mat-form-field appearance="outline" class="w-100">
              <mat-label>Rule Type</mat-label>
              <mat-select formControlName="ruleType">
                <mat-option value="target">Reach a Target (fixed goal)</mat-option>
                <mat-option value="most">Most (highest value wins)</mat-option>
                <mat-option value="least">Least (lowest value wins)</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-100">
              <mat-label>Metric Type</mat-label>
              <mat-select formControlName="metricType">
                <mat-option *ngFor="let opt of availableMetricOptions" [value]="opt.value">{{ opt.label }}</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field *ngIf="rulesForm.get('metricType')?.value === 'other'" appearance="outline" class="w-100">
              <mat-label>Custom Metric</mat-label>
              <input matInput formControlName="customMetric" placeholder="e.g. push-ups, minutes of meditation">
            </mat-form-field>

            <mat-form-field *ngIf="rulesForm.get('ruleType')?.value === 'target'" appearance="outline" class="w-100">
              <mat-label>Target Goal</mat-label>
              <input matInput type="number" formControlName="targetGoal">
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-100">
              <mat-label>Winners</mat-label>
              <mat-select formControlName="winnersCount">
                <mat-option [value]="1">1 Winner</mat-option>
                <mat-option [value]="2">2 Winners (Winner + Runner-up)</mat-option>
                <mat-option [value]="3">3 Winners (Winner + Runner-up + 3rd Place)</mat-option>
              </mat-select>
            </mat-form-field>

            <div>
              <button mat-button matStepperPrevious>Back</button>
              <button mat-button matStepperNext>Next</button>
            </div>
          </form>
        </mat-step>

        <mat-step [stepControl]="settingsForm">
          <form [formGroup]="settingsForm">
            <ng-template matStepLabel>Step 3: Settings</ng-template>
            <mat-form-field appearance="outline" class="w-100">
              <mat-label>Start Date</mat-label>
              <input matInput [matDatepicker]="startPicker" formControlName="startDate" [min]="minStartDate">
              <mat-datepicker-toggle matIconSuffix [for]="startPicker"></mat-datepicker-toggle>
              <mat-datepicker #startPicker></mat-datepicker>
            </mat-form-field>
            <mat-form-field appearance="outline" class="w-100">
              <mat-label>End Date</mat-label>
              <input matInput [matDatepicker]="endPicker" formControlName="endDate" [min]="selectedStartDate" [max]="maxEndDate">
              <mat-datepicker-toggle matIconSuffix [for]="endPicker"></mat-datepicker-toggle>
              <mat-datepicker #endPicker></mat-datepicker>
            </mat-form-field>
            <div class="mb-3">
              <mat-slide-toggle formControlName="isPublic">Public Campaign</mat-slide-toggle>
            </div>
            <div>
              <button mat-button matStepperPrevious>Back</button>
              <button mat-raised-button color="primary" (click)="onCreate()">Create Campaign</button>
            </div>
          </form>
        </mat-step>
      </mat-stepper>
    </div>
  `
})
export class CreateCampaignComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private router = inject(Router);

  minStartDate = new Date();
  selectedStartDate = new Date();
  maxEndDate = this.computeMaxEndDate(new Date());

  availableMetricOptions: MetricOption[] = METRIC_OPTIONS_BY_TYPE['weight-loss'];

  infoForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    type: ['weight-loss', Validators.required]
  });

  rulesForm = this.fb.group({
    ruleType: ['target', Validators.required],
    metricType: ['kg', Validators.required],
    customMetric: [''],
    targetGoal: [null as number | null],
    winnersCount: [1, Validators.required]
  });

  settingsForm = this.fb.group({
    startDate: [new Date(), Validators.required],
    endDate: [new Date(), Validators.required],
    isPublic: [true]
  });

  ngOnInit() {
    this.infoForm.get('type')?.valueChanges.subscribe(type => {
      const options = METRIC_OPTIONS_BY_TYPE[type ?? 'other'] ?? METRIC_OPTIONS_BY_TYPE['other'];
      this.availableMetricOptions = options;
      this.rulesForm.get('metricType')?.setValue(options[0].value);
    });

    this.rulesForm.get('ruleType')?.valueChanges.subscribe(ruleType => {
      const targetGoalControl = this.rulesForm.get('targetGoal');
      if (ruleType === 'target') {
        targetGoalControl?.setValidators([Validators.required, Validators.min(1)]);
      } else {
        targetGoalControl?.clearValidators();
        targetGoalControl?.setValue(null);
      }
      targetGoalControl?.updateValueAndValidity();
    });

    this.rulesForm.get('metricType')?.valueChanges.subscribe(metricType => {
      const customMetricControl = this.rulesForm.get('customMetric');
      if (metricType === 'other') {
        customMetricControl?.setValidators([Validators.required]);
      } else {
        customMetricControl?.clearValidators();
        customMetricControl?.setValue('');
      }
      customMetricControl?.updateValueAndValidity();
    });

    this.settingsForm.get('startDate')?.valueChanges.subscribe(startDate => {
      const date = startDate instanceof Date ? startDate : new Date(startDate ?? '');
      this.selectedStartDate = date;
      this.maxEndDate = this.computeMaxEndDate(date);
      const endDate = this.settingsForm.get('endDate')?.value;
      if (endDate && new Date(endDate) > this.maxEndDate) {
        this.settingsForm.get('endDate')?.setValue(this.maxEndDate);
      }
    });
  }

  private computeMaxEndDate(from: Date): Date {
    const max = new Date(from);
    max.setMonth(max.getMonth() + 3);
    return max;
  }

  onCreate() {
    if (this.infoForm.valid && this.rulesForm.valid && this.settingsForm.valid) {
      const campaignValue = {
        ...this.infoForm.value,
        ...this.rulesForm.value,
        ...this.settingsForm.value
      };

      const campaign: Partial<Campaign> = {
        title: campaignValue.name || '',
        description: campaignValue.description || '',
        type: (campaignValue.type as any) || 'other',
        ruleType: (campaignValue.ruleType as any) || 'most',
        metricType: (campaignValue.metricType as any) || 'other',
        customMetric: campaignValue.customMetric || undefined,
        targetGoal: campaignValue.targetGoal ?? undefined,
        winnersCount: (campaignValue.winnersCount as 1 | 2 | 3) ?? 1,
        startDate: campaignValue.startDate || new Date(),
        endDate: campaignValue.endDate || new Date(),
        isPublic: !!campaignValue.isPublic
      };

      this.store.dispatch(CampaignActions.createCampaign({ campaign }));
      this.router.navigate(['/dashboard']);
    }
  }
}
