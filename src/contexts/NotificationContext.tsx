import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

type NotificationType = 'success' | 'error' | 'info';

interface NotificationAction {
  label: string;
  onClick: () => void;
}

interface Notification {
  message: string;
  type: NotificationType;
  action?: NotificationAction;
}

interface NotificationContextType {
  showNotification: (message: string, type?: NotificationType, action?: NotificationAction) => void;
  hideNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const hideNotification = useCallback(() => {
    setNotification(null);
  }, []);

  const showNotification = useCallback((message: string, type: NotificationType = 'info', action?: NotificationAction) => {
    setNotification({ message, type, action });
    // Auto-hide after 5 seconds if no action is provided
    if (!action) {
      setTimeout(() => {
        setNotification(prev => prev?.message === message ? null : prev);
      }, 5000);
    }
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification, hideNotification }}>
      {children}
      <AnimatePresence>
        {notification && (
          <div className="fixed bottom-4 right-4 z-[100] max-w-md w-full px-4">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className={`p-4 rounded-xl shadow-2xl border flex items-start gap-3 ${
                notification.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' :
                notification.type === 'error' ? 'bg-rose-50 border-rose-200 text-rose-800' :
                'bg-blue-50 border-blue-200 text-blue-800'
              }`}
            >
              <div className="mt-0.5">
                {notification.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                {notification.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-500" />}
                {notification.type === 'info' && <Info className="w-5 h-5 text-blue-500" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium leading-relaxed">{notification.message}</p>
                {notification.action && (
                  <button
                    onClick={() => {
                      notification.action?.onClick();
                      hideNotification();
                    }}
                    className={`mt-2 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-colors ${
                      notification.type === 'success' ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900' :
                      notification.type === 'error' ? 'bg-rose-100 hover:bg-rose-200 text-rose-900' :
                      'bg-blue-100 hover:bg-blue-200 text-blue-900'
                    }`}
                  >
                    {notification.action.label}
                  </button>
                )}
              </div>
              <button
                onClick={hideNotification}
                className="p-1 hover:bg-black/5 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 opacity-50" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
