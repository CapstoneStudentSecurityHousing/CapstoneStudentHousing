import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Search, MessageSquare, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../../supabase';
import { useNotification } from '../../contexts/NotificationContext';

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: any;
  senderName: string;
}

interface Conversation {
  otherUserId: string;
  otherUserName: string;
  lastMessage: string;
  lastTimestamp: any;
}

export const Messages = ({ user }: { user: any }) => {
  const { showNotification } = useNotification();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUserName, setSelectedUserName] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageSearchQuery, setMessageSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch conversations
  useEffect(() => {
    if (!user?.id) return;

    const fetchConversations = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .contains('participants', [user.id])
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching conversations:', error);
      } else {
        const convMap = new Map<string, Conversation>();
        
        (data || []).forEach(msg => {
          const otherUserId = msg.sender_id === user.id ? msg.receiver_id : msg.sender_id;
          const otherUserName = msg.sender_id === user.id ? msg.receiver_name : msg.sender_name;
          
          if (!convMap.has(otherUserId)) {
            convMap.set(otherUserId, {
              otherUserId,
              otherUserName: otherUserName || 'User',
              lastMessage: msg.text,
              lastTimestamp: msg.created_at
            });
          }
        });

        setConversations(Array.from(convMap.values()));
      }
      setLoading(false);
    };

    fetchConversations();

    const subscription = supabase
      .channel('messages_changes')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'messages',
        filter: `participants=cs.{${user.id}}`
      }, fetchConversations)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user?.id]);

  // Fetch messages for selected conversation
  useEffect(() => {
    if (!user?.id || !selectedUserId) {
      setMessages([]);
      return;
    }

    const fetchMessages = async () => {
      const participants = [user.id, selectedUserId].sort();
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .contains('participants', participants)
        .order('created_at', { ascending: true })
        .limit(100);

      if (error) {
        console.error('Error fetching messages:', error);
      } else {
        const formattedMessages = (data || []).map(m => ({
          id: m.id,
          senderId: m.sender_id,
          receiverId: m.receiver_id,
          text: m.text,
          timestamp: m.created_at,
          senderName: m.sender_name
        }));
        setMessages(formattedMessages);
      }
    };

    fetchMessages();

    const participants = [user.id, selectedUserId].sort();
    const subscription = supabase
      .channel(`chat_${selectedUserId}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'messages',
        filter: `participants=eq.{${participants.join(',')}}`
      }, fetchMessages)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user?.id, selectedUserId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUserId) return;

    if (!user?.is_verified) {
      showNotification('You must be verified to send messages.', 'error');
      return;
    }

    try {
      const participants = [user.id, selectedUserId].sort();
      const { error } = await supabase
        .from('messages')
        .insert({
          sender_id: user.id,
          sender_name: user.full_name || user.email,
          receiver_id: selectedUserId,
          receiver_name: selectedUserName,
          text: newMessage,
          participants: participants
        });

      if (error) throw error;
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-200px)] bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden flex">
      {/* Sidebar */}
      <div className="w-80 border-r border-slate-50 flex flex-col">
        <div className="p-6 border-b border-slate-50">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chats..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-orange-500/20 transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.filter(c => 
            c.otherUserName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
          ).length === 0 ? (
            <div className="p-8 text-center">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-6 h-6 text-slate-300" />
              </div>
              <p className="text-sm text-slate-400 font-medium">
                {searchQuery ? 'No matches found' : 'No conversations yet'}
              </p>
            </div>
          ) : (
            conversations
              .filter(c => 
                c.otherUserName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((conv) => (
              <button
                key={conv.otherUserId}
                onClick={() => {
                  setSelectedUserId(conv.otherUserId);
                  setSelectedUserName(conv.otherUserName);
                }}
                className={`w-full p-4 flex items-center gap-4 hover:bg-slate-50 transition-all border-b border-slate-50/50 ${
                  selectedUserId === conv.otherUserId ? 'bg-orange-50 border-r-4 border-r-orange-500' : ''
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold">
                  {conv.otherUserName.charAt(0)}
                </div>
                <div className="flex-1 text-left overflow-hidden">
                  <div className="flex justify-between items-center mb-0.5">
                    <h4 className="font-bold text-slate-900 truncate">{conv.otherUserName}</h4>
                    {conv.lastTimestamp && (
                      <span className="text-[10px] text-slate-400 font-medium">
                        {new Date(conv.lastTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 truncate">{conv.lastMessage}</p>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-50/30">
        {selectedUserId ? (
          <>
            {/* Chat Header */}
            <div className="p-4 bg-white border-b border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold">
                  {selectedUserName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{selectedUserName}</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Online</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
                  <input 
                    type="text" 
                    value={messageSearchQuery}
                    onChange={(e) => setMessageSearchQuery(e.target.value)}
                    placeholder="Search messages..."
                    className="pl-9 pr-4 py-1.5 bg-slate-50 border-none rounded-lg text-xs focus:ring-2 focus:ring-orange-500/20 transition-all w-48"
                  />
                </div>
              </div>
            </div>

            {/* Messages List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages
                .filter(m => m.text.toLowerCase().includes(messageSearchQuery.toLowerCase()))
                .map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex ${msg.senderId === user.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] p-4 rounded-3xl text-sm ${
                    msg.senderId === user.id 
                      ? 'bg-orange-500 text-white rounded-tr-none shadow-lg shadow-orange-500/20' 
                      : 'bg-white text-slate-700 rounded-tl-none border border-slate-100 shadow-sm'
                  }`}>
                    <p className="leading-relaxed">{msg.text}</p>
                    <div className={`text-[10px] mt-2 font-medium ${
                      msg.senderId === user.id ? 'text-orange-100' : 'text-slate-400'
                    }`}>
                      {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-6 bg-white border-t border-slate-50">
              <div className="relative flex gap-4">
                <input 
                  type="text" 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-orange-500/20 transition-all"
                />
                <button 
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="p-4 bg-orange-500 text-white rounded-2xl shadow-lg shadow-orange-500/20 hover:bg-orange-600 disabled:opacity-50 disabled:hover:bg-orange-500 transition-all"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
            <div className="w-20 h-20 bg-white rounded-[32px] shadow-xl shadow-slate-200/50 flex items-center justify-center mb-6">
              <MessageSquare className="w-10 h-10 text-orange-500" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Your Conversations</h3>
            <p className="text-slate-500 max-w-xs mx-auto">Select a chat from the sidebar to start messaging with students or landlords.</p>
          </div>
        )}
      </div>
    </div>
  );
};
