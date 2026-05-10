
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CampaignState } from './campaigns.reducer';

export const selectCampaignState = createFeatureSelector<CampaignState>('campaigns');

export const selectExploreCampaigns = createSelector(
  selectCampaignState,
  (state) => state.exploreCampaigns
);

export const selectMyCampaigns = createSelector(
  selectCampaignState,
  (state) => state.myCampaigns
);

export const selectHostedCampaigns = createSelector(
  selectCampaignState,
  (state) => state.hostedCampaigns
);

export const selectSelectedCampaign = createSelector(
  selectCampaignState,
  (state) => state.selectedCampaign
);

export const selectCampaignLoading = createSelector(
  selectCampaignState,
  (state) => state.loading
);

export const selectInProgressCampaigns = createSelector(
  selectExploreCampaigns,
  (campaigns) => campaigns.filter(c => c.status === 'in-progress')
);

export const selectUpcomingCampaigns = createSelector(
  selectExploreCampaigns,
  (campaigns) => campaigns.filter(c => c.status === 'upcoming')
);

export const selectPastCampaigns = createSelector(
  selectExploreCampaigns,
  (campaigns) => campaigns.filter(c => c.status === 'past')
);
