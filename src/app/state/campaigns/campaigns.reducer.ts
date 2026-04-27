
import { createReducer, on } from '@ngrx/store';
import { Campaign, CampaignDetail } from '../../models';
import { CampaignActions } from './campaigns.actions';

export interface CampaignState {
  exploreCampaigns: Campaign[];
  myCampaigns: Campaign[];
  hostedCampaigns: Campaign[];
  selectedCampaign: CampaignDetail | null;
  loading: boolean;
  error: string | null;
}

export const initialState: CampaignState = {
  exploreCampaigns: [],
  myCampaigns: [],
  hostedCampaigns: [],
  selectedCampaign: null,
  loading: false,
  error: null,
};

export const campaignReducer = createReducer(
  initialState,
  on(CampaignActions.loadCampaigns, (state) => ({ ...state, loading: true })),
  on(CampaignActions.loadCampaignsSuccess, (state, { campaigns }) => ({ ...state, exploreCampaigns: campaigns, loading: false })),
  on(CampaignActions.loadMyCampaignsSuccess, (state, { campaigns }) => ({ ...state, myCampaigns: campaigns })),
  on(CampaignActions.loadHostedCampaignsSuccess, (state, { campaigns }) => ({ ...state, hostedCampaigns: campaigns })),
  on(CampaignActions.loadCampaignDetailSuccess, (state, { campaign }) => ({ ...state, selectedCampaign: campaign, loading: false })),
  on(CampaignActions.loadCampaignsFailure, (state, { error }) => ({ ...state, error, loading: false }))
);
