
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CampaignDetailComponent } from './pages/campaign-detail/campaign-detail.component';
import { CreateCampaignComponent } from './pages/create-campaign/create-campaign.component';
import { HostDashboardComponent } from './pages/host-dashboard/host-dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CampaignListComponent } from './pages/campaign-list/campaign-list.component';
import { MessagingComponent } from './pages/messaging/messaging.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { InProgressCampaignsComponent } from './pages/in-progress-campaigns/in-progress-campaigns.component';
import { FutureCampaignsComponent } from './pages/future-campaigns/future-campaigns.component';
import { PastCampaignsComponent } from './pages/past-campaigns/past-campaigns.component';
import { UsersComponent } from './pages/users/users.component';
import { AboutComponent } from './pages/about/about.component';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'campaign/:id', component: CampaignDetailComponent },
  { path: 'create-campaign', component: CreateCampaignComponent },
  { path: 'host-dashboard', component: HostDashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'admin', component: AdminComponent, canActivate: [adminGuard] },
  { path: 'explore', component: CampaignListComponent },
  { path: 'messaging', component: MessagingComponent },
  { path: 'campaigns/in-progress', component: InProgressCampaignsComponent },
  { path: 'campaigns/future', component: FutureCampaignsComponent },
  { path: 'campaigns/past', component: PastCampaignsComponent },
  { path: 'users', component: UsersComponent, canActivate: [adminGuard] },
  { path: 'about', component: AboutComponent },
];
