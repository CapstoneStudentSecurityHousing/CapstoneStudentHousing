import React, { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { AdminView } from '../../types';
// import { motion, AnimatePresence } from 'motion/react';
const motion = {
  div: ({ children, className, ...props }: any) => <div className={className} {...props}>{children}</div>,
};
const AnimatePresence = ({ children }: any) => <>{children}</>;

// Import views
import { Overview } from './views/Overview';
import { FraudDetection } from './views/FraudDetection';
import { UserManagement } from './views/UserManagement';
import { VerificationQueue } from './views/VerificationQueue';
import { SupportTickets } from './views/SupportTickets';
import { ReportedListings } from './views/ReportedListings';
import { Broadcast } from './views/Broadcast';
import { AuditLogs } from './views/AuditLogs';
import { PropertyManagement } from './views/PropertyManagement';
import { Revenue } from './views/Revenue';
import { SystemHealth } from './views/SystemHealth';

interface AdminDashboardProps {
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeView, setActiveView] = useState<AdminView>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderView = () => {
    switch (activeView) {
      case 'overview': return <Overview />;
      case 'fraud-detection': return <FraudDetection />;
      case 'user-management': return <UserManagement />;
      case 'verification-queue': return <VerificationQueue />;
      case 'support-tickets': return <SupportTickets />;
      case 'reported-listings': return <ReportedListings />;
      case 'property-management': return <PropertyManagement />;
      case 'broadcast': return <Broadcast />;
      case 'audit-logs': return <AuditLogs />;
      default: return <Overview />;
    }
  };

  const getViewTitle = () => {
    switch (activeView) {
      case 'overview': return 'Admin Dashboard';
      case 'fraud-detection': return 'Fraud Detection';
      case 'user-management': return 'User Management';
      case 'verification-queue': return 'Verification Queue';
      case 'support-tickets': return 'Support Tickets';
      case 'reported-listings': return 'Property Reports';
      case 'property-management': return 'Property Management';
      case 'broadcast': return 'Broadcast Center';
      case 'audit-logs': return 'Audit Logs';
      default: return 'Admin Dashboard';
    }
  };

  const getViewSubtitle = () => {
    switch (activeView) {
      case 'overview': return 'Monitor and manage your platform security';
      case 'fraud-detection': return 'Analyze and respond to suspicious activities';
      case 'user-management': return 'Manage students, landlords, and platform access';
      case 'verification-queue': return 'Review and approve property and user documents';
      case 'support-tickets': return 'Resolve user inquiries and technical issues';
      case 'reported-listings': return 'Investigate and take action on reported property listings';
      case 'property-management': return 'Monitor and manage all property listings on the platform';
      case 'broadcast': return 'Send platform-wide announcements and alerts';
      case 'audit-logs': return 'Track all administrative and system actions';
      default: return 'Monitor and manage your platform security';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        onLogout={onLogout}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      <main className="flex-1 ml-0 md:ml-72 min-h-screen flex flex-col">
        <div className="md:hidden p-4 bg-white border-b border-slate-100 flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-md bg-orange-500 text-white"
            aria-label="Open menu"
          >
            <span className="text-xl font-bold">☰</span>
          </button>
          <div className="font-bold text-lg">Admin Portal</div>
        </div>
        <AdminHeader title={getViewTitle()} subtitle={getViewSubtitle()} />

        <div className="p-10 max-w-7xl mx-auto w-full flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};
