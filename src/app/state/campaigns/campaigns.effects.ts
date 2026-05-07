
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CampaignActions } from './campaigns.actions';
import { MockDataService } from '../../services/mock-data.service';

@Injectable()
export class CampaignEffects {
  private actions$ = inject(Actions);
  private mockDataService = inject(MockDataService);

  loadCampaigns$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CampaignActions.loadCampaigns),
      mergeMap(() =>
        this.mockDataService.getCampaigns().pipe(
          map(campaigns => CampaignActions.loadCampaignsSuccess({ campaigns })),
          catchError(error => of(CampaignActions.loadCampaignsFailure({ error: error.message })))
        )
      )
    )
  );

  loadMyCampaigns$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CampaignActions.loadMyCampaigns),
      mergeMap(() =>
        this.mockDataService.getMyCampaigns().pipe(
          map(campaigns => CampaignActions.loadMyCampaignsSuccess({ campaigns }))
        )
      )
    )
  );

  loadHostedCampaigns$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CampaignActions.loadHostedCampaigns),
      mergeMap(() =>
        this.mockDataService.getHostedCampaigns().pipe(
          map(campaigns => CampaignActions.loadHostedCampaignsSuccess({ campaigns }))
        )
      )
    )
  );

  loadCampaignDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CampaignActions.loadCampaignDetail),
      mergeMap(({ id }) =>
        this.mockDataService.getCampaignById(id).pipe(
          map(campaign => {
            if (campaign) return CampaignActions.loadCampaignDetailSuccess({ campaign });
            return CampaignActions.loadCampaignsFailure({ error: 'Campaign not found' });
          })
        )
      )
    )
  );
}
