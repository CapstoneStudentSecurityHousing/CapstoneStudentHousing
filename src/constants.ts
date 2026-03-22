import { 
  Users, 
  Home, 
  ShieldAlert, 
  CheckCircle2, 
  CircleDollarSign, 
  Clock,
  UserCheck,
  AlertTriangle,
  CheckCircle,
  XCircle,
  MessageSquare,
  Flag,
  Activity,
  History,
  Radio
} from 'lucide-react';
import { User, FraudAlert, VerificationItem, SupportTicket, ReportedListing, AuditLog } from './types';

export const MOCK_USERS: User[] = [
  {
    id: 'USER-1',
    name: 'Maria Santos',
    email: 'maria.santos@slu.edu.ph',
    type: 'Student',
    verified: true,
    joinDate: 'Jan 15, 2024',
    status: 'Active',
    activity: '2 bookings'
  },
  {
    id: 'USER-2',
    name: 'John Reyes',
    email: 'john.reyes@uc-bcf.edu.ph',
    type: 'Student',
    verified: true,
    joinDate: 'Feb 3, 2024',
    status: 'Active',
    activity: '1 bookings'
  },
  {
    id: 'USER-3',
    name: 'Robert Cruz',
    email: 'robert.cruz@gmail.com',
    type: 'Landlord',
    verified: true,
    joinDate: 'Dec 10, 2023',
    status: 'Active',
    activity: '6 properties'
  },
  {
    id: 'USER-4',
    name: 'Sarah Mendoza',
    email: 'sarah.m@yahoo.com',
    type: 'Landlord',
    verified: false,
    status: 'Suspended',
    joinDate: 'Mar 1, 2024',
    activity: '2 properties • 3 reports'
  },
  {
    id: 'USER-5',
    name: 'Michael Torres',
    email: 'mtorres@bsu.edu.ph',
    type: 'Student',
    verified: false,
    joinDate: 'Mar 5, 2024',
    status: 'Pending',
    activity: '0 bookings'
  }
];

export const MOCK_FRAUD_ALERTS: FraudAlert[] = [
  {
    id: 'FRAUD-1',
    title: 'Duplicate Property Photos Detected',
    description: 'Property #2847 uses images from another verified listing',
    reportedBy: 'AI System',
    time: '2 minutes ago',
    priority: 'HIGH',
    status: 'Investigating'
  },
  {
    id: 'FRAUD-2',
    title: 'Off-Platform Payment Request',
    description: 'Landlord requested direct bank transfer from student',
    reportedBy: 'Maria Santos',
    time: '15 minutes ago',
    priority: 'CRITICAL',
    status: 'New'
  },
  {
    id: 'FRAUD-3',
    title: 'Suspicious Document Upload',
    description: 'Government ID appears to be digitally altered',
    reportedBy: 'AI Verification',
    time: '1 hour ago',
    priority: 'HIGH',
    status: 'Investigating'
  },
  {
    id: 'FRAUD-4',
    title: 'Multiple Fraud Reports',
    description: 'Same landlord reported by 3 different students',
    reportedBy: 'Multiple Users',
    time: '3 hours ago',
    priority: 'MEDIUM',
    status: 'Resolved'
  }
];

export const MOCK_VERIFICATIONS: VerificationItem[] = [
  {
    id: 'PROP-2847',
    title: 'Modern Studio near SLU',
    owner: 'Robert Cruz',
    documents: 4,
    time: '2 hours ago',
    aiScore: 92,
    status: 'Pending'
  },
  {
    id: 'PROP-2851',
    title: 'Shared Room in Baguio Center',
    owner: 'Anna Garcia',
    documents: 3,
    time: '5 hours ago',
    aiScore: 45,
    status: 'Flagged'
  },
  {
    id: 'USER-1847',
    title: 'Michael Torres',
    owner: 'Submitted 1 day ago',
    documents: 2,
    time: '1 day ago',
    aiScore: 88,
    status: 'Pending'
  }
];

export const MOCK_TICKETS: SupportTicket[] = [
  {
    id: 'TKT-1847',
    subject: 'Cannot complete payment',
    user: 'Maria Santos',
    userType: 'student',
    priority: 'High',
    status: 'Open',
    lastReply: '30 minutes ago'
  },
  {
    id: 'TKT-1845',
    subject: 'Property verification taking too long',
    user: 'Robert Cruz',
    userType: 'landlord',
    priority: 'Medium',
    status: 'In Progress',
    lastReply: '1 hour ago'
  },
  {
    id: 'TKT-1842',
    subject: 'Landlord not responding to messages',
    user: 'John Reyes',
    userType: 'student',
    priority: 'Medium',
    status: 'Open',
    lastReply: '5 hours ago'
  },
  {
    id: 'TKT-1838',
    subject: 'How to upload documents?',
    user: 'Lisa Ramos',
    userType: 'student',
    priority: 'Low',
    status: 'Resolved',
    lastReply: '18 hours ago'
  }
];

export const MOCK_REPORTED_LISTINGS: ReportedListing[] = [
  {
    id: 'PROP-2847',
    title: 'Modern Studio near SLU',
    landlord: 'Sarah Mendoza',
    priority: 'HIGH',
    reportedBy: 'Maria Santos',
    time: '2 hours ago',
    reason: 'Fake Listing',
    status: 'Investigating'
  },
  {
    id: 'PROP-2823',
    title: 'Affordable Room for Rent',
    landlord: 'Unknown User',
    priority: 'CRITICAL',
    reportedBy: 'John Reyes',
    time: '1 day ago',
    reason: 'Scam',
    status: 'Confirmed'
  },
  {
    id: 'PROP-2801',
    title: 'Cozy Apartment Downtown',
    landlord: 'Anna Garcia',
    priority: 'MEDIUM',
    reportedBy: 'Multiple Users',
    time: '2 days ago',
    reason: 'Misleading Info',
    status: 'Resolved'
  }
];

export const MOCK_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'LOG-1',
    timestamp: '10 minutes ago',
    action: 'User Suspended',
    admin: 'Admin User',
    target: 'Sarah Mendoza (Landlord)',
    details: 'Multiple fraud reports',
    type: 'user'
  },
  {
    id: 'LOG-2',
    timestamp: '1 hour ago',
    action: 'Property Verified',
    admin: 'Admin User',
    target: 'PROP-2847',
    details: 'All documents approved',
    type: 'property'
  },
  {
    id: 'LOG-3',
    timestamp: '2 hours ago',
    action: 'Fraud Alert Created',
    admin: 'AI System',
    target: 'PROP-2851',
    details: 'Duplicate photos detected',
    type: 'fraud'
  },
  {
    id: 'LOG-4',
    timestamp: '3 hours ago',
    action: 'Support Ticket Resolved',
    admin: 'Admin User',
    target: 'TKT-1838',
    details: 'User inquiry answered',
    type: 'support'
  },
  {
    id: 'LOG-5',
    timestamp: '1 day ago',
    action: 'Broadcast Sent',
    admin: 'Admin User',
    target: 'All Users',
    details: 'Platform maintenance notice',
    type: 'system'
  }
];
