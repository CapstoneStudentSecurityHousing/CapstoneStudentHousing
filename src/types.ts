import React from 'react';

export type AdminView = 
  | 'overview' 
  | 'fraud-detection' 
  | 'user-management' 
  | 'verification-queue' 
  | 'support-tickets' 
  | 'reported-listings' 
  | 'property-management'
  | 'revenue' 
  | 'system-health' 
  | 'broadcast' 
  | 'audit-logs';

export interface StatCard {
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down';
  icon: React.ReactNode;
  color: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  type: 'Student' | 'Landlord';
  verified: boolean;
  joinDate: string;
  status: 'Active' | 'Suspended' | 'Pending';
  activity: string;
}

export interface FraudAlert {
  id: string;
  title: string;
  description: string;
  reportedBy: string;
  time: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'New' | 'Investigating' | 'Resolved';
}

export interface VerificationItem {
  id: string;
  title: string;
  owner: string;
  documents: number;
  time: string;
  aiScore: number;
  status: 'Pending' | 'Flagged' | 'Approved' | 'Rejected';
}

export interface SupportTicket {
  id: string;
  subject: string;
  user: string;
  userType: 'student' | 'landlord';
  priority: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'In Progress' | 'Resolved';
  lastReply: string;
}

export interface ReportedListing {
  id: string;
  title: string;
  landlord: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  reportedBy: string;
  time: string;
  reason: string;
  status: 'New' | 'Investigating' | 'Confirmed' | 'Resolved';
}

export interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  admin: string;
  target: string;
  details: string;
  type: 'user' | 'property' | 'fraud' | 'support' | 'system';
}
