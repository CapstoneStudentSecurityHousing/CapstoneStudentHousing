export interface UserProfile {
  id: string;
  email: string;
  username: string;
  full_name: string;
  role: 'student' | 'landlord' | 'admin';
  status: 'Active' | 'Suspended';
  is_verified: boolean;
  phone_number?: string;
  university?: string;
  student_id?: string;
  course?: string;
  year_of_study?: string;
  business_name?: string;
  tax_id?: string;
  business_address?: string;
  website?: string;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  address?: string;
  location: string;
  price: number;
  status: 'Active' | 'Pending' | 'Suspended';
  is_verified: boolean;
  rating: number;
  reviews_count: number;
  views: number;
  inquiries: number;
  bookings: number;
  landlord_id: string;
  landlord_name: string;
  landlord_phone: string;
  landlord_email: string;
  type: string;
  amenities: string[];
  image_url: string;
  images: string[];
  beds?: number;
  baths?: number;
}

export interface Booking {
  id: string;
  listing_id: string;
  student_id: string;
  student_name: string;
  landlord_id: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  from_date: string;
  to_date: string;
  total_amount: number;
}

export interface Review {
  id: string;
  listing_id: string;
  student_id: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface VerificationItem {
  id: string;
  user_id: string;
  user_email: string;
  type: 'student' | 'landlord';
  status: 'Pending' | 'Verified' | 'Rejected';
  submitted_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  sender_name: string;
  receiver_id: string;
  receiver_name: string;
  text: string;
  participants: string[];
  listing_id?: string;
  created_at: string;
}

export interface Report {
  id: string;
  student_id: string;
  listing_id: string;
  description: string;
  status: 'Open' | 'Resolved';
  created_at: string;
}

export interface AuditLog {
  id: string;
  action: string;
  target_id: string;
  admin_id: string;
  created_at: string;
}

export interface SupportTicket {
  id: string;
  user_id: string;
  subject: string;
  message: string;
  status: 'Open' | 'Closed';
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  created_at: string;
  read: boolean;
}

const nextId = () => `${Date.now()}-${Math.floor(Math.random() * 100000)}`;

export const db = {
  profiles: <UserProfile[]>[
    { id: 'student1', email: 'student@example.com', username: 'student', full_name: 'Student One', role: 'student', status: 'Active', is_verified: true, university: 'SLU' },
    { id: 'landlord1', email: 'landlord@example.com', username: 'landlord', full_name: 'Landlord One', role: 'landlord', status: 'Active', is_verified: true, business_name: 'Acme Properties' },
    { id: 'admin1', email: 'admin@example.com', username: 'admin', full_name: 'Admin One', role: 'admin', status: 'Active', is_verified: true },
  ],

  listings: <Listing[]>[
    {
      id: 'listing1', title: 'Cozy Studio in Baguio', description: 'Near university and market', location: 'Baguio City', price: 8500,
      address: '123 Pine Street', status: 'Active', is_verified: true, rating: 4.8, reviews_count: 4, views: 308, inquiries: 16, bookings: 5,
      landlord_id: 'landlord1', landlord_name:'Landlord One', landlord_phone:'09171234567', landlord_email:'landlord@example.com', type:'Studio', amenities:['WiFi','Security','Kitchen'],
      image_url:'https://images.unsplash.com/photo-1560448204-e48dccb1e5f5?q=80&w=1000', images:['https://images.unsplash.com/photo-1560448204-e48dccb1e5f5?q=80&w=1000']
    },
    {
      id: 'listing2', title: '2BR Apartment near SLU', description: 'Comfortable student apartment', location: 'Baguio City', price: 12000,
      address: '45 Mata St', status: 'Active', is_verified: true, rating: 4.6, reviews_count: 10, views: 512, inquiries: 34, bookings: 9,
      landlord_id: 'landlord1', landlord_name:'Landlord One', landlord_phone:'09171234567', landlord_email:'landlord@example.com', type:'Apartment', amenities:['WiFi','Laundry','Parking'],
      image_url:'https://images.unsplash.com/photo-1560448204-e48dccb1e5f5?q=80&w=1000', images:['https://images.unsplash.com/photo-1560448204-e48dccb1e5f5?q=80&w=1000']
    }
  ],

  bookings: <Booking[]>[
    { id: 'booking1', listing_id: 'listing1', student_id: 'student1', student_name: 'Student One', landlord_id: 'landlord1', status: 'Confirmed', from_date:'2025-04-01', to_date:'2025-06-30', total_amount:25500 },
    { id: 'booking2', listing_id: 'listing2', student_id: 'student1', student_name: 'Student One', landlord_id: 'landlord1', status: 'Pending', from_date:'2025-05-01', to_date:'2025-07-31', total_amount:36000 },
  ],

  reviews: <Review[]>[
    { id: 'review1', listing_id: 'listing1', student_id: 'student1', rating: 5, comment: 'Great place!', created_at: new Date().toISOString() },
    { id: 'review2', listing_id: 'listing2', student_id: 'student1', rating: 4, comment: 'Very cozy.', created_at: new Date().toISOString() },
  ],

  verifications: <VerificationItem[]>[
    { id: 'ver1', user_id: 'student1', user_email: 'student@example.com', type:'student', status:'Verified', submitted_at: new Date().toISOString() },
    { id: 'ver2', user_id: 'landlord1', user_email: 'landlord@example.com', type:'landlord', status:'Pending', submitted_at: new Date().toISOString() },
  ],

  messages: <Message[]>[
    { id:'msg1', sender_id:'student1', sender_name:'Student One', receiver_id:'landlord1', receiver_name:'Landlord One', text:'Hi, I am interested in your listing.', participants:['student1','landlord1'], listing_id:'listing1', created_at:new Date().toISOString() }
  ],

  reports: <Report[]>[
    { id:'report1', student_id:'student1', listing_id:'listing2', description:'Misleading price details', status:'Open', created_at: new Date().toISOString() }
  ],

  audit_logs: <AuditLog[]>[
    { id: 'audit1', action: 'Listing created', target_id:'listing1', admin_id:'admin1', created_at: new Date().toISOString() }
  ],

  support_tickets: <SupportTicket[]>[
    { id:'ticket1', user_id:'student1', subject:'Need help booking', message:'Booking seems to fail.', status:'Open', created_at:new Date().toISOString() }
  ],

  notifications: <Notification[]>[
    { id:'note1', user_id:'student1', title:'Welcome!', message:'Welcome to SafeStay mock dashboard.', type:'info', created_at:new Date().toISOString(), read:false }
  ]
};

export const getNextId = () => `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
