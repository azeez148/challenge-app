
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  photoUrl?: string;
  role: 'admin' | 'user';
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  hostId: string;
  hostName: string;
  status: 'upcoming' | 'in-progress' | 'past' | 'cancelled';
  type: 'weight-loss' | 'steps' | 'running' | 'other';
  metricType: 'kg' | 'steps' | 'km';
  targetGoal: number;
  startDate: Date;
  endDate: Date;
  isPublic: boolean;
  participantsCount: number;
}

export interface ParticipantProgress {
  userId: string;
  userName: string;
  currentValue: number;
  rank: number;
  progressPercentage: number;
}

export interface CampaignDetail extends Campaign {
  leaderboard: ParticipantProgress[];
}
