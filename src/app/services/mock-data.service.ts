
import { Injectable } from '@angular/core';
import { Observable, of, throwError, delay } from 'rxjs';
import { Campaign, CampaignDetail, User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private users: User[] = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'user', phone: '+1234567890' },
    { id: '2', name: 'Admin Jane', email: 'admin@example.com', role: 'admin' },
    { id: '3', name: 'User A', email: 'userA@example.com', role: 'user' },
    { id: '4', name: 'User C', email: 'userC@example.com', role: 'user' },
  ];

  private campaigns: Campaign[] = [
    {
      id: 'c1',
      title: '10K Steps Challenge',
      description: 'Walk 10,000 steps every day!',
      hostId: '1',
      hostName: 'John Doe',
      status: 'in-progress',
      type: 'steps',
      metricType: 'steps',
      ruleType: 'target',
      targetGoal: 10000,
      winnersCount: 1,
      startDate: new Date('2023-10-01'),
      endDate: new Date('2023-10-31'),
      isPublic: true,
      participantsCount: 120
    },
    {
      id: 'c2',
      title: 'Weight Loss - April',
      description: 'Lose weight together.',
      hostId: '2',
      hostName: 'Admin Jane',
      status: 'in-progress',
      type: 'weight-loss',
      metricType: 'kg',
      ruleType: 'most',
      winnersCount: 1,
      startDate: new Date('2023-04-01'),
      endDate: new Date('2023-04-30'),
      isPublic: true,
      participantsCount: 80
    },
    {
      id: 'c3',
      title: 'Running Challenge',
      description: 'Run 5km every weekend.',
      hostId: '1',
      hostName: 'John Doe',
      status: 'upcoming',
      type: 'running',
      metricType: 'km',
      ruleType: 'target',
      targetGoal: 20,
      winnersCount: 1,
      startDate: new Date('2024-05-01'),
      endDate: new Date('2024-05-31'),
      isPublic: true,
      participantsCount: 50
    }
  ];

  getCampaigns(): Observable<Campaign[]> {
    return of(this.campaigns).pipe(delay(500));
  }

  getCampaignById(id: string): Observable<CampaignDetail | undefined> {
    const campaign = this.campaigns.find(c => c.id === id);
    if (!campaign) return of(undefined);

    const detail: CampaignDetail = {
      ...campaign,
      leaderboard: [
        { userId: '3', userName: 'User A', currentValue: 4.2, rank: 1, progressPercentage: 84 },
        { userId: 'current-user', userName: 'You', currentValue: 3.8, rank: 2, progressPercentage: 76 },
        { userId: '4', userName: 'User C', currentValue: 3.5, rank: 3, progressPercentage: 70 },
      ]
    };
    return of(detail).pipe(delay(500));
  }

  getMyCampaigns(): Observable<Campaign[]> {
    return of([this.campaigns[0], this.campaigns[1]]).pipe(delay(500));
  }

  getHostedCampaigns(): Observable<Campaign[]> {
    return of([this.campaigns[0], this.campaigns[2]]).pipe(delay(500));
  }

  login(email: string, password: string): Observable<User> {
    const user = this.users.find(u => u.email === email);
    if (user) {
      return of(user).pipe(delay(500));
    }
    return throwError(() => new Error('Invalid credentials')).pipe(delay(500));
  }
}
