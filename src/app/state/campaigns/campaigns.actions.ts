
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Campaign, CampaignDetail } from '../../models';

export const CampaignActions = createActionGroup({
  source: 'Campaigns',
  events: {
    'Load Campaigns': emptyProps(),
    'Load Campaigns Success': props<{ campaigns: Campaign[] }>(),
    'Load Campaigns Failure': props<{ error: string }>(),
    'Load My Campaigns': emptyProps(),
    'Load My Campaigns Success': props<{ campaigns: Campaign[] }>(),
    'Load Hosted Campaigns': emptyProps(),
    'Load Hosted Campaigns Success': props<{ campaigns: Campaign[] }>(),
    'Load Campaign Detail': props<{ id: string }>(),
    'Load Campaign Detail Success': props<{ campaign: CampaignDetail }>(),
    'Join Campaign': props<{ campaignId: string }>(),
    'Create Campaign': props<{ campaign: Partial<Campaign> }>(),
  }
});
