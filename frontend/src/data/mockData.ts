import { Disaster, Donation, Badge, NGO, ImpactData } from '../types';

export const disasters: Disaster[] = [
  {
    id: '1',
    title: 'Kerala Flood Relief 2024',
    description: 'Severe flooding in Kerala affecting over 50,000 families. Immediate need for food, water, and temporary shelter.',
    location: 'Kerala, India',
    coordinates: [76.2711, 10.8505],
    severity: 'Critical',
    affectedPeople: 52000,
    targetAmount: 10000000,
    raisedAmount: 6540000,
    status: 'Active',
    verificationStatus: 'Government Verified',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z',
    images: ['https://images.pexels.com/photos/63572/pexels-photo-63572.jpeg'],
    ngoPartner: 'Kerala Relief Foundation'
  },
  {
    id: '2',
    title: 'Himachal Pradesh Landslide',
    description: 'Multiple landslides in Himachal Pradesh blocking roads and affecting transportation. Villages cut off from main areas.',
    location: 'Himachal Pradesh, India',
    coordinates: [77.1734, 31.1048],
    severity: 'High',
    affectedPeople: 15000,
    targetAmount: 3000000,
    raisedAmount: 1890000,
    status: 'Active',
    verificationStatus: 'Satellite Confirmed',
    createdAt: '2024-01-18T08:00:00Z',
    updatedAt: '2024-01-21T12:00:00Z',
    images: ['https://images.pexels.com/photos/127090/pexels-photo-127090.jpeg'],
    ngoPartner: 'Mountain Rescue Trust'
  },
  {
    id: '3',
    title: 'Cyclone Rehabilitation - Odisha',
    description: 'Post-cyclone rehabilitation work in coastal Odisha. Rebuilding homes and restoring infrastructure.',
    location: 'Odisha, India',
    coordinates: [85.0985, 20.9517],
    severity: 'Medium',
    affectedPeople: 28000,
    targetAmount: 5000000,
    raisedAmount: 4800000,
    status: 'Completed',
    verificationStatus: 'NGO Verified',
    createdAt: '2024-01-10T06:00:00Z',
    updatedAt: '2024-01-25T18:00:00Z',
    images: ['https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg'],
    ngoPartner: 'Coastal Aid Society'
  }
];

export const badges: Badge[] = [
  {
    id: '1',
    name: 'First Drop',
    description: 'Made your first donation',
    icon: 'droplets',
    unlockedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Helping Hand',
    description: 'Donated to 5 different disasters',
    icon: 'heart',
    unlockedAt: '2024-01-18T14:30:00Z'
  },
  {
    id: '3',
    name: 'Monthly Hero',
    description: 'Set up recurring monthly donations',
    icon: 'calendar',
    unlockedAt: '2024-01-20T09:15:00Z'
  }
];

export const recentDonations: Donation[] = [
  {
    id: '1',
    userId: 'user1',
    disasterId: '1',
    amount: 100,
    currency: 'INR',
    paymentMethod: 'UPI',
    isRecurring: false,
    timestamp: '2024-01-21T10:30:00Z',
    transactionHash: '0x1a2b3c4d5e6f7g8h9i0j',
    impact: 'Provided 20 liters of clean water',
    isAnonymous: false
  },
  {
    id: '2',
    userId: 'user2',
    disasterId: '2',
    amount: 500,
    currency: 'INR',
    paymentMethod: 'Card',
    isRecurring: true,
    frequency: 'monthly',
    timestamp: '2024-01-21T09:15:00Z',
    transactionHash: '0x2b3c4d5e6f7g8h9i0j1k',
    impact: 'Supported emergency medical supplies',
    isAnonymous: false
  }
];

export const impactData: ImpactData = {
  totalDonations: 15420000,
  totalDonors: 52341,
  disastersSupported: 47,
  livesImpacted: 125000,
  recentImpacts: [
    {
      id: '1',
      description: '2,500 meals distributed to flood victims',
      amount: 25000,
      disaster: 'Kerala Flood Relief 2024',
      timestamp: '2024-01-21T16:00:00Z'
    },
    {
      id: '2',
      description: 'Emergency shelter for 150 families established',
      amount: 75000,
      disaster: 'Himachal Pradesh Landslide',
      timestamp: '2024-01-21T14:30:00Z'
    }
  ]
};

export const ngos: NGO[] = [
  {
    id: '1',
    name: 'Kerala Relief Foundation',
    description: 'Specialized in flood relief and rehabilitation in Kerala state',
    verified: true,
    specializations: ['Flood Relief', 'Emergency Response', 'Rehabilitation'],
    contact: {
      email: 'contact@keralarelief.org',
      phone: '+91-484-2345678',
      website: 'https://keralarelief.org'
    }
  },
  {
    id: '2',
    name: 'Mountain Rescue Trust',
    description: 'Expert in mountain rescue and disaster relief in hilly regions',
    verified: true,
    specializations: ['Mountain Rescue', 'Landslide Response', 'Remote Area Aid'],
    contact: {
      email: 'help@mountainrescue.org',
      phone: '+91-177-2654321',
      website: 'https://mountainrescue.org'
    }
  }
];