import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  ShieldAlert, 
  Users, 
  CheckCircle2, 
  MessageSquare, 
  Flag, 
  Home,
  CircleDollarSign, 
  Activity, 
  Radio, 
  History,
  LogOut,
  Shield,
  ChevronLeft
} from 'lucide-react';
import { AdminView } from '../../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { supabase } from '../../supabase';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface AdminSidebarProps {
  activeView: AdminView;
  setActiveView: (view: AdminView) => void;
  onLogout: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeView, setActiveView, onLogout, isOpen = true, onClose }) => {
  const [counts, setCounts] = useState({
    fraud: 0,
    verification: 0,
    tickets: 0,
    reports: 0
  });

  const fetchCounts = async () => {
    try {
      // Fetch Fraud Alerts count
      const { count: fraudCount } = await supabase
        .from('fraud_alerts')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'New');
      
      // Fetch Verification Queue count
      const { count: verifCount } = await supabase
        .from('verifications')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'Pending');
      
      // Fetch Support Tickets count
      const { count: ticketCount } = await supabase
        .from('tickets')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'Open');
      
      // Fetch Property Reports count
      const { count: reportCount } = await supabase
        .from('reports')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'Pending');

      setCounts({
        fraud: fraudCount || 0,
        verification: verifCount || 0,
        tickets: ticketCount || 0,
        reports: reportCount || 0,
      });
    } catch (error) {
      console.error('Error fetching counts:', error);
    }
  };

  useEffect(() => {
    fetchCounts();

    // Set up real-time subscriptions
    const fraudSub = supabase
      .channel('fraud_counts')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'fraud_alerts' }, fetchCounts)
      .subscribe();

    const verifSub = supabase
      .channel('verif_counts')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'verifications' }, fetchCounts)
      .subscribe();

    const ticketSub = supabase
      .channel('ticket_counts')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tickets' }, fetchCounts)
      .subscribe();

    const reportSub = supabase
      .channel('report_counts')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reports' }, fetchCounts)
      .subscribe();

    return () => {
      fraudSub.unsubscribe();
      verifSub.unsubscribe();
      ticketSub.unsubscribe();
      reportSub.unsubscribe();
    };
  }, []);

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'fraud-detection', label: 'Fraud Detection', icon: ShieldAlert, badge: counts.fraud },
    { id: 'user-management', label: 'User Management', icon: Users },
    { id: 'verification-queue', label: 'Verification Queue', icon: CheckCircle2, badge: counts.verification },
    { id: 'support-tickets', label: 'Support Tickets', icon: MessageSquare, badge: counts.tickets },
    { id: 'reported-listings', label: 'Property Reports', icon: Flag, badge: counts.reports },
    { id: 'property-management', label: 'Property Management', icon: Home },
    { id: 'broadcast', label: 'Broadcast', icon: Radio },
    { id: 'audit-logs', label: 'Audit Logs', icon: History },
  ];

  return (
    <aside className={`bg-[#1a2332] text-white flex flex-col h-screen fixed top-0 z-50 transition-all ${isOpen ? 'left-0' : '-left-full'} md:left-0 md:w-72 md:relative md:h-auto`}>
      <div className="p-6 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="bg-orange-500 p-1.5 rounded-lg">
            <Shield className="w-6 h-6 text-white" fill="currentColor" />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight">Admin Panel</h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Security System</p>
          </div>
        </div>
        {onClose ? (
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors md:hidden">
            <ChevronLeft className="w-5 h-5" />
          </button>
        ) : (
          <button className="text-slate-400 hover:text-white transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as AdminView)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20" 
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-slate-400 group-hover:text-white")} />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-[10px] font-bold",
                  isActive ? "bg-white/20 text-white" : "bg-orange-500 text-white"
                )}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <div className="bg-white/5 rounded-2xl p-4 flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center font-bold text-sm">
            AD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold truncate">Admin User</p>
            <p className="text-[10px] text-slate-400 font-medium">Super Admin</p>
          </div>
          <button 
            onClick={onLogout}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
