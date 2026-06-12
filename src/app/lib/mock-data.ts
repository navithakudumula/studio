
export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'donor' | 'hospital';
  avatar?: string;
  location?: string;
  bloodType?: BloodType;
}

export interface BloodStock {
  type: BloodType;
  units: number;
  lastUpdated: string;
}

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Dr. Sarah Mitchell', email: 'admin@lifelink.org', role: 'admin' },
  { id: 'u2', name: 'John Doe', email: 'john@donor.com', role: 'donor', bloodType: 'O-', avatar: 'https://picsum.photos/seed/d1/100/100' },
  { id: 'u3', name: 'City General Hospital', email: 'requests@citygen.com', role: 'hospital', location: 'Downtown Medical District' }
];

export const MOCK_INVENTORY: BloodStock[] = [
  { type: 'A+', units: 45, lastUpdated: '2024-05-20' },
  { type: 'A-', units: 12, lastUpdated: '2024-05-21' },
  { type: 'B+', units: 28, lastUpdated: '2024-05-20' },
  { type: 'B-', units: 5, lastUpdated: '2024-05-22' },
  { type: 'AB+', units: 18, lastUpdated: '2024-05-19' },
  { type: 'AB-', units: 3, lastUpdated: '2024-05-22' },
  { type: 'O+', units: 62, lastUpdated: '2024-05-20' },
  { type: 'O-', units: 8, lastUpdated: '2024-05-23' },
];

export const MOCK_DONATIONS = [
  { id: 'don1', donorId: 'u2', date: '2024-01-15', units: 1, location: 'Central Blood Bank', status: 'completed' },
  { id: 'don2', donorId: 'u2', date: '2024-04-10', units: 1, location: 'City Drive', status: 'completed' },
];

export const MOCK_REQUESTS = [
  { id: 'req1', hospitalId: 'u3', type: 'O-', urgency: 'emergency', units: 3, date: '2024-05-23', status: 'pending' },
  { id: 'req2', hospitalId: 'u3', type: 'A+', urgency: 'standard', units: 2, date: '2024-05-22', status: 'approved' },
];
