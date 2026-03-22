import React, { useState } from 'react';
import { StudentSidebar } from './StudentSidebar';
import { StudentHeader } from './StudentHeader';
import { BrowseListings } from './views/BrowseListings';
import { MyBookings } from './views/MyBookings';
import { SavedProperties } from './views/SavedProperties';
import { Verification } from './views/Verification';
import { MyReviews } from './views/MyReviews';
import { ReportFraud } from './views/ReportFraud';
import { Messages } from '../shared/Messages';
import { Profile } from './views/Profile';
import { ShieldCheck } from 'lucide-react';

export const StudentDashboard = ({ onLogout, onLogin, user }: { onLogout: () => void; onLogin?: () => void; user: any }) => {
  const [activeTab, setActiveTab] = useState('browse');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const requireVerification = () => setActiveTab('verification');

  const renderContent = () => {
    switch (activeTab) {
      case 'browse': return <BrowseListings user={user} onRequireVerification={requireVerification} onNavigate={setActiveTab} onLogin={onLogin} />;
      case 'bookings': return <MyBookings user={user} onRequireVerification={requireVerification} onNavigate={setActiveTab} />;
      case 'saved': return <SavedProperties user={user} />;
      case 'verification': return <Verification user={user} />;
      case 'reviews': return <MyReviews user={user} />;
      case 'report': return <ReportFraud user={user} />;
      case 'messages': return <Messages user={user} />;
      case 'profile': return <Profile user={user} />;
      default: return <BrowseListings user={user} onRequireVerification={requireVerification} onNavigate={setActiveTab} onLogin={onLogin} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <StudentSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={onLogout} 
        onLogin={onLogin}
        user={user}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      <main className="flex-1 ml-0 md:ml-72">
        <div className="md:hidden p-4 bg-white border-b border-slate-100 flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="px-3 py-2 bg-orange-500 text-white rounded-lg"
          >
            Menu
          </button>
          <div className="font-bold text-lg">Student Portal</div>
        </div>
        <StudentHeader activeTab={activeTab} user={user} onLogin={onLogin} />
        <div className="p-10 max-w-7xl mx-auto">
          {user && !user?.is_verified && activeTab !== 'verification' && (
            <div className="mb-8 bg-orange-50 border border-orange-100 p-4 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Get Verified</p>
                  <p className="text-xs text-slate-500">Verify your student status to unlock all features and build trust with landlords.</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveTab('verification')}
                className="px-4 py-2 bg-orange-500 text-white text-xs font-bold rounded-lg hover:bg-orange-600 transition-all"
              >
                Verify Now
              </button>
            </div>
          )}
          {renderContent()}
        </div>
      </main>
    </div>
  );
};
