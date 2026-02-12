export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  totalDonated: number;
  badges: Badge[];
  joinedAt: string;
  isAnonymous?: boolean;
}

export interface Disaster {
  id: string;
  title: string;
  description: string;
  location: string;
  coordinates: [number, number];
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  affectedPeople: number;
  targetAmount: number;
  raisedAmount: number;
  status: 'Active' | 'Completed' | 'Urgent';
  verificationStatus: 'Pending' | 'Government Verified' | 'NGO Verified' | 'Satellite Confirmed';
  createdAt: string;
  updatedAt: string;
  images: string[];
  ngoPartner?: string;
}

export interface Donation {
  id: string;
  userId: string;
  disasterId: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  isRecurring: boolean;
  frequency?: 'daily' | 'weekly' | 'monthly';
  timestamp: string;
  transactionHash: string;
  impact: string;
  isAnonymous: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

export interface ImpactData {
  totalDonations: number;
  totalDonors: number;
  disastersSupported: number;
  livesImpacted: number;
  recentImpacts: ImpactItem[];
}

export interface ImpactItem {
  id: string;
  description: string;
  amount: number;
  disaster: string;
  timestamp: string;
}

export interface NGO {
  id: string;
  name: string;
  description: string;
  verified: boolean;
  specializations: string[];
  contact: {
    email: string;
    phone: string;
    website?: string;
  };
}

export interface USSDSession {
  sessionId: string;
  phoneNumber: string;
  currentStep: number;
  selectedDisaster?: string;
  amount?: number;
  completed: boolean;
}