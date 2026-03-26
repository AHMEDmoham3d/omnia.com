import React, { useState, useEffect } from 'react';
import { X, Users, Globe, Clock, Download, Trash2, Ban, UserCheck, Eye, BarChart3, Shield, MapPin, Lock, Menu } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mldvuzkrcjnltzgwtpfc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sZHZ1emtyY2pubHR6Z3d0cGZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5Mjg4MjYsImV4cCI6MjA2NjUwNDgyNn0.idcUACM1z8IPkYdpV-oT_R1jZexmC25W7IMZaFvooUc';
const supabase = createClient(supabaseUrl, supabaseKey);

interface Message {
  id: number;
  created_at: string;
  name: string;
  email: string;
  whatsapp?: string;
  message: string;
  status: 'unread' | 'read';
  country?: string;
  city?: string;
  timestamp?: string;
}

interface Visitor {
  id: string;
  country: string;
  city: string;
  region?: string;
  ip: string;
  device: string;
  browser: string;
  isp?: string;
  isActive: boolean;
  visitTime: string;
  timeOnSite: number;
  screenResolution: string;
  language: string;
  pageViews?: string[];
}

interface BannedIP {
  ip: string;
  bannedAt: string;
}

interface VisitorData {
  totalVisitors: number;
  todayVisitors: number;
  countries: string[];
  pageViews: Record<string, number>;
}

interface AdminPanelProps {
  onClose: () => void;
  visitorData: VisitorData;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose, visitorData }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'messages' | 'visitors' | 'analytics' | 'security'>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [realTimeVisitors, setRealTimeVisitors] = useState<Visitor[]>([]);
  const [bannedIPs, setBannedIPs] = useState<BannedIP[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const unreadMessagesCount = messages.filter(m => m.status === 'unread').length;

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: <BarChart3 className="w-5 h-5" /> },
    { 
      id: 'messages', 
      name: 'Messages', 
      icon: unreadMessagesCount > 0 ? (
        <div className="relative">
          <Eye className="w-5 h-5" />\n          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">\n            {unreadMessagesCount}\n          </span>
        </div>
      ) : <Eye className="w-5 h-5" /> 
    },
    { id: 'visitors', name: 'Visitors', icon: <Users className="w-5 h-5" /> },
    { id: 'analytics', name: 'Analytics', icon: <Globe className="w-5 h-5" /> },
    { id: 'security', name: 'Security', icon: <Shield className="w-5 h-5" /> },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctEmail = 'omniaAbdo@gmail.com';
    const correctPassword = '123456789Omnia';
    
    if (email === correctEmail && password === correctPassword) {
      setIsLoggedIn(true);
    } else {
      setLoginError('خطأ في البريد الإلكتروني أو كلمة المرور');
    }
  };

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setMessages(data as Message[]);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const downloadData = (type: 'all' | 'messages' | 'visitors') => {
    let data: any, filename = '';
    switch (type) {
      case 'all':
        data = { messages, visitors: realTimeVisitors, bannedIPs };
        filename = 'admin-data.json';
        break;
      case 'messages':
        data = messages;
        filename = 'messages.json';
        break;
      case 'visitors':
        data = realTimeVisitors;
        filename = 'visitors.json';
        break;
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const markMessageAsRead = async (id: number) => {
    await supabase.from('messages').update({ status: 'read' }).eq('id', id);
    setMessages(messages.map(msg => msg.id === id ? { ...msg, status: 'read' } : msg));
  };

  const deleteMessage = async (id: number) => {
    await supabase.from('messages').delete().eq('id', id);
    setMessages(messages.filter(msg => msg.id !== id));
    setShowDeleteConfirm(null);
  };

  const banVisitor = (ip: string) => {
    const bannedAt = new Date().toISOString();
    const newBanned = [...bannedIPs, { ip, bannedAt }];
    localStorage.setItem('admin_banned_ips', JSON.stringify(newBanned));
    setBannedIPs(newBanned);
  };

  const unbanVisitor = (ip: string) => {
    const newBanned = bannedIPs.filter(b => b.ip !== ip);
    localStorage.setItem('admin_banned_ips', JSON.stringify(newBanned));
    setBannedIPs(newBanned);
  };

  const formatTimeOnSite = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchMessages();
      const visitors = localStorage.getItem('omnia_secure_visitors') ? JSON.parse(localStorage.getItem('omnia_secure_visitors')!) as Visitor[] : [];
      const banned = localStorage.getItem('admin_banned_ips') ? JSON.parse(localStorage.getItem('admin_banned_ips')!) as BannedIP[] : [];
      setRealTimeVisitors(visitors);
      setBannedIPs(banned);
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6">
        <div className="bg-gray-900/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md border border-gray-700 shadow-2xl">
          <div className="flex flex-col items-center mb-6 text-center">
            <Lock className="w-16 h-16 text-purple-500 mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">لوحة التحكم</h2>
            <p className="text-gray-400 text-sm">أدخل بيانات الدخول</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-300 p-4 rounded-xl text-sm text-center">
                {loginError}
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-gray-400 text-sm font-medium mb-2">البريد الإلكتروني</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all min-h-[48px]"
                placeholder="your@email.com"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-gray-400 text-sm font-medium mb-2">كلمة المرور</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all min-h-[48px]"
                placeholder="••••••••"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-purple-500/50 transition-all font-semibold text-lg min-h-[52px] shadow-lg hover:shadow-xl"
            >
              <Lock className="w-5 h-5 inline mr-2" />
              دخول
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col md:flex-row items-stretch p-2 sm:p-4 h-screen md:h-[95vh]">
        {/* Sidebar */}
        <div className={`bg-gray-900/95 backdrop-blur-md border-r border-gray-700/50 shadow-2xl transform transition-transform duration-300 ease-in-out fixed md:relative inset-0 z-50 w-full md:w-72 h-full flex flex-col overflow-hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
          
          {/* Header */}
          <div className="p-4 md:p-6 border-b border-gray-700/50 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-3">
              <Shield className="w-7 h-7 text-purple-400" />
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                لوحة التحكم
              </h1>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-gray-800/50 transition-colors text-gray-400 hover:text-white md:ml-auto"
              aria-label="إغلاق"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  if (isSidebarOpen) closeSidebar();
                }}
                className={`w-full flex items-center space-x-3 p-4 rounded-2xl transition-all duration-300 text-left group hover:shadow-lg min-h-[52px] ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-600/80 to-pink-600/80 text-white shadow-lg border border-purple-500/50 backdrop-blur-sm'
                    : 'text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border hover:border-gray-600/50'
                }`}
              >
                {tab.icon}
                <span className="flex-1 font-medium">{tab.name}</span>
                {tab.id === 'messages' && unreadMessagesCount > 0 && (
                  <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                    {unreadMessagesCount > 9 ? '9+' : unreadMessagesCount}
                  </div>
                )}
              </button>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-700/50 mt-auto">
            <button
              onClick={() => setIsLoggedIn(false)}
              className="w-full flex items-center space-x-3 p-4 bg-gray-800/50 hover:bg-red-600/80 text-red-300 hover:text-white rounded-2xl transition-all duration-300 font-medium min-h-[52px]"
            >
              <Lock className="w-5 h-5" />
              <span>تسجيل خروج</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className={`flex-1 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'blur-sm pointer-events-none' : ''}`}>
          <main className="p-4 sm:p-6 lg:p-8 space-y-6">
            {activeTab === 'dashboard' && (
              <>
                <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    نظرة عامة
                  </h2>
                  <div className="flex gap-3 flex-wrap">
                    <button
                      onClick={() => downloadData('all')}
                      className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 shadow-lg transition-all min-h-[48px] whitespace-nowrap"
                    >
                      <Download className="w-4 h-4" />
                      تصدير الكل
                    </button>
                  </div>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                  <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-purple-500/50 transition-all group">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm font-medium">الزوار الكليين</p>
                        <p className="text-3xl lg:text-2xl font-bold text-white mt-1">{visitorData.totalVisitors}</p>
                      </div>
                      <Users className="w-10 h-10 text-purple-400 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>

                  <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-green-500/50 transition-all group">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm font-medium">زوار اليوم</p>
                        <p className="text-3xl lg:text-2xl font-bold text-white mt-1">{visitorData.todayVisitors}</p>
                      </div>
                      <Clock className="w-10 h-10 text-green-400 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>

                  <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all group relative">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm font-medium">رسائل جديدة</p>
                        <p className="text-3xl lg:text-2xl font-bold text-white mt-1">{unreadMessagesCount}</p>
                      </div>
                      <div className="relative">
                        <Eye className="w-10 h-10 text-blue-400 group-hover:scale-110 transition-transform" />
                        {unreadMessagesCount > 0 && (
                          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg">
                            {unreadMessagesCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-yellow-500/50 transition-all group">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm font-medium">الدول</p>
                        <p className="text-3xl lg:text-2xl font-bold text-white mt-1">{visitorData.countries.length}</p>
                      </div>
                      <Globe className="w-10 h-10 text-yellow-400 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm p-6 lg:p-8 rounded-3xl border border-gray-700/50 shadow-xl">
                  <h4 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Download className="w-6 h-6" />
                    إجراءات سريعة
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <button
                      onClick={() => downloadData('all')}
                      className="group relative overflow-hidden bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 p-6 rounded-2xl text-white font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 min-h-[60px] flex items-center justify-center gap-3 border-0 hover:scale-[1.02]"
                    >
                      <Download className="w-6 h-6 group-hover:scale-110 transition-transform" />
                      تصدير كل البيانات
                    </button>
                    <button
                      onClick={() => downloadData('messages')}
                      className="group relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 p-6 rounded-2xl text-white font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 min-h-[60px] flex items-center justify-center gap-3 border-0 hover:scale-[1.02]"
                    >
                      <Download className="w-6 h-6 group-hover:scale-110 transition-transform" />
                      تصدير الرسائل
                    </button>
                    <button
                      onClick={() => downloadData('visitors')}
                      className="group relative overflow-hidden bg-gradient-to-br from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 p-6 rounded-2xl text-white font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 min-h-[60px] flex items-center justify-center gap-3 border-0 hover:scale-[1.02]"
                    >
                      <Download className="w-6 h-6 group-hover:scale-110 transition-transform" />
                      تصدير الزوار
                    </button>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'messages' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                      <Eye className="w-8 h-8" />
                      الرسائل ({messages.length})
                      {unreadMessagesCount > 0 && (
                        <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                          {unreadMessagesCount} غير مقروءة
                        </span>
                      )}
                    </h3>
                  </div>
                  <button
                    onClick={() => downloadData('messages')}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all whitespace-nowrap min-h-[52px]"
                  >
                    <Download className="w-5 h-5" />
                    تصدير الرسائل
                  </button>
                </div>

                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                  {messages.length === 0 ? (
                    <div className="text-center py-12">
                      <Eye className="w-16 h-16 text-gray-600 mx-auto mb-4 opacity-50" />
                      <p className="text-gray-400 text-lg font-medium">لا توجد رسائل بعد</p>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div key={message.id} className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-purple-500/50 transition-all hover:shadow-xl">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1 min-w-0">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-semibold text-lg">
                                  {message.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div className="min-w-0 flex-1">
                                <h4 className="text-white font-bold truncate">{message.name}</h4>
                                <p className="text-gray-400 text-sm truncate">{message.email}</p>
                                {message.whatsapp && (
                                  <p className="text-gray-400 text-sm truncate">{message.whatsapp}</p>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 self-start lg:self-center">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              message.status === 'unread' 
                                ? 'bg-red-500/90 text-white' 
                                : 'bg-green-500/90 text-white'
                            }`}>
                              {message.status === 'unread' ? 'غير مقروء' : 'مقروء'}
                            </span>
                            <div className="flex gap-1">
                              {message.status === 'unread' && (
                                <button 
                                  onClick={() => markMessageAsRead(message.id)}
                                  className="p-2 hover:bg-green-500/20 rounded-xl text-green-400 hover:text-green-300 transition-all"
                                  title="وضع كمقروء"
                                >
                                  <UserCheck className="w-5 h-5" />
                                </button>
                              )}
                              <button 
                                onClick={() => setShowDeleteConfirm(message.id)}
                                className="p-2 hover:bg-red-500/20 rounded-xl text-red-400 hover:text-red-300 transition-all"
                                title="حذف"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-300 text-base leading-relaxed mb-6">{message.message}</p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                          {message.country && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{message.country}, {message.city}</span>
                            </span>
                          )}
                          {message.timestamp && (
                            <span>{new Date(message.timestamp).toLocaleString('ar-EG')}</span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'visitors' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                    <Users className="w-8 h-8" />
                    الزوار الحاليين ({realTimeVisitors.length})
                  </h3>
                  <button
                    onClick={() => downloadData('visitors')}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all whitespace-nowrap min-h-[52px]"
                  >
                    <Download className="w-5 h-5" />
                    تصدير الزوار
                  </button>
                </div>

                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                  {realTimeVisitors.length === 0 ? (
                    <div className="text-center py-12">
                      <Users className="w-16 h-16 text-gray-600 mx-auto mb-4 opacity-50" />
                      <p className="text-gray-400 text-lg font-medium">لا يوجد زوار حالياً</p>
                    </div>
                  ) : realTimeVisitors.map((visitor) => (
                    <div key={visitor.id} className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-emerald-500/50 transition-all hover:shadow-xl">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                            <Globe className="w-7 h-7 text-white" />
                          </div>
                          <div>
                            <h4 className="text-white font-bold flex flex-col lg:flex-row lg:items-center gap-2">
                              <span>{visitor.country}</span>
                              <span className="text-gray-400 font-normal">، {visitor.city}</span>
                              {visitor.region && (
                                <span className="text-xs bg-gray-700 px-2 py-1 rounded-full">{visitor.region}</span>
                              )}
                            </h4>
                            <p className="text-gray-400 text-sm">IP: <span className="font-mono">{visitor.ip}</span></p>
                            <p className="text-gray-400 text-sm">{visitor.device} • {visitor.browser}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 self-start lg:self-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            visitor.isActive 
                              ? 'bg-emerald-500/90 text-white shadow-lg' 
                              : 'bg-gray-600/90 text-gray-200'
                          }`}>
                            {visitor.isActive ? 'نشط الآن' : 'غير متصل'}
                          </span>
                          {!bannedIPs.some(b => b.ip === visitor.ip) ? (
                            <button 
                              onClick={() => banVisitor(visitor.ip)}
                              className="p-3 bg-yellow-500/20 hover:bg-yellow-500/40 text-yellow-400 hover:text-yellow-300 rounded-xl transition-all shadow-lg hover:shadow-xl min-w-[44px] h-[44px] flex items-center justify-center"
                              title="حظر الزائر"
                            >
                              <Ban className="w-5 h-5" />
                            </button>
                          ) : (
                            <button 
                              onClick={() => unbanVisitor(visitor.ip)}
                              className="p-3 bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-400 hover:text-emerald-300 rounded-xl transition-all shadow-lg hover:shadow-xl min-w-[44px] h-[44px] flex items-center justify-center"
                              title="إلغاء الحظر"
                            >
                              <UserCheck className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-900/50 rounded-2xl">
                        <div className="text-center p-3">
                          <p className="text-gray-400 text-xs uppercase tracking-wide">وقت الزيارة</p>
                          <p className="text-white font-mono text-sm">{new Date(visitor.visitTime).toLocaleString('ar-EG')}</p>
                        </div>
                        <div className="text-center p-3">
                          <p className="text-gray-400 text-xs uppercase tracking-wide">مدة البقاء</p>
                          <p className="text-emerald-400 font-mono font-semibold text-sm">{formatTimeOnSite(visitor.timeOnSite)}</p>
                        </div>
                        <div className="text-center p-3">
                          <p className="text-gray-400 text-xs uppercase tracking-wide">دقة الشاشة</p>
                          <p className="text-white font-mono text-sm">{visitor.screenResolution}</p>
                        </div>
                        <div className="text-center p-3">
                          <p className="text-gray-400 text-xs uppercase tracking-wide">اللغة</p>
                          <p className="text-white font-mono text-sm">{visitor.language}</p>
                        </div>
                      </div>

                      {visitor.pageViews && visitor.pageViews.length > 0 && (
                        <div>
                          <p className="text-gray-400 text-sm font-medium mb-3 flex items-center gap-2">
                            صفحات تمت زيارتها:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {visitor.pageViews.map((page, idx) => (
                              <span
                                key={idx}
                                className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs font-medium border border-purple-500/30 hover:bg-purple-500/30 transition-all"
                              >
                                {page}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                    <BarChart3 className="w-8 h-8" />
                    الإحصائيات والتحليلات
                  </h3>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-800/50 backdrop-blur-sm p-6 lg:p-8 rounded-3xl border border-gray-700/50 shadow-xl">
                    <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                      <BarChart3 className="w-6 h-6 text-blue-400" />
                      مشاهدات الصفحات
                    </h4>
                    <div className="space-y-4">
                      {Object.entries(visitorData.pageViews).map(([page, views]) => (
                        <div key={page} className="flex items-center justify-between p-4 bg-gray-900/50 rounded-2xl hover:bg-gray-900/70 transition-all">
                          <span className="text-gray-300 capitalize font-medium min-w-0 truncate">{page}</span>
                          <span className="text-white font-bold text-lg bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                            {views}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-800/50 backdrop-blur-sm p-6 lg:p-8 rounded-3xl border border-gray-700/50 shadow-xl">
                    <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                      <Globe className="w-6 h-6 text-yellow-400" />
                      أعلى الدول
                    </h4>
                    <div className="space-y-4">
                      {visitorData.countries.slice(0, 8).map((country, idx) => {
                        const count = realTimeVisitors.filter(v => v.country === country).length;
                        return (
                          <div key={country} className="flex items-center justify-between p-4 bg-gray-900/50 rounded-2xl hover:bg-gray-900/70 transition-all">
                            <span className="text-gray-300 font-medium">{country}</span>
                            <span className="text-white font-bold text-lg">{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-700/50 shadow-2xl">
                  <h4 className="text-2xl font-bold text-white mb-8 flex items-center gap-3 justify-center">
                    تحليل الأجهزة
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center group hover:scale-105 transition-all">
                      <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl flex items-center justify-center border-2 border-purple-500/30 group-hover:border-purple-400/50">
                        <Users className="w-12 h-12 text-purple-400 group-hover:scale-110 transition-all" />
                      </div>
                      <p className="text-3xl font-bold text-white mb-2">{realTimeVisitors.filter(v => v.device === 'Mobile').length}</p>
                      <p className="text-gray-400 text-lg font-medium uppercase tracking-wide">موبايل</p>
                    </div>
                    <div className="text-center group hover:scale-105 transition-all">
                      <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-3xl flex items-center justify-center border-2 border-blue-500/30 group-hover:border-blue-400/50">
                        <Globe className="w-12 h-12 text-blue-400 group-hover:scale-110 transition-all" />
                      </div>
                      <p className="text-3xl font-bold text-white mb-2">{realTimeVisitors.filter(v => v.device === 'Desktop').length}</p>
                      <p className="text-gray-400 text-lg font-medium uppercase tracking-wide">كمبيوتر</p>
                    </div>
                    <div className="text-center group hover:scale-105 transition-all">
                      <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-3xl flex items-center justify-center border-2 border-emerald-500/30 group-hover:border-emerald-400/50">
                        <Clock className="w-12 h-12 text-emerald-400 group-hover:scale-110 transition-all" />
                      </div>
                      <p className="text-3xl font-bold text-white mb-2">{realTimeVisitors.filter(v => v.isActive).length}</p>
                      <p className="text-gray-400 text-lg font-medium uppercase tracking-wide">نشط الآن</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3 justify-center">
                  <Shield className="w-9 h-9" />
                  إدارة الأمان
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-700/50 shadow-xl">
                    <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                      عناوين محظورة ({bannedIPs.length})
                    </h4>
                    {bannedIPs.length === 0 ? (
                      <div className="text-center py-12">
                        <Ban className="w-16 h-16 text-gray-600 mx-auto mb-4 opacity-50" />
                        <p className="text-gray-400 text-lg font-medium">لا توجد عناوين محظورة</p>
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                        {bannedIPs.map((banned) => (
                          <div key={banned.ip} className="flex items-center justify-between p-5 bg-gray-900/50 rounded-2xl border border-gray-700/50 hover:border-red-500/50 transition-all hover:shadow-lg">
                            <div>
                              <span className="text-white font-mono text-lg block font-bold">{banned.ip}</span>
                              <span className="text-gray-400 text-sm">
                                تم الحظر في {new Date(banned.bannedAt).toLocaleString('ar-EG')}
                              </span>
                            </div>
                            <button
                              onClick={() => unbanVisitor(banned.ip)}
                              className="p-3 bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-400 hover:text-emerald-300 rounded-2xl transition-all shadow-lg hover:shadow-xl min-w-[48px] h-[48px] flex items-center justify-center"
                            >
                              <UserCheck className="w-5 h-5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-700/50 shadow-xl">
                    <h4 className="text-xl font-bold text-white mb-8 flex items-center gap-3 justify-center">
                      حالة الأمان
                    </h4>
                    <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between p-6 bg-gray-900/50 rounded-2xl">
                        <span className="text-gray-300 font-medium">تشفير البيانات</span>
                        <span className="px-4 py-2 bg-emerald-500/90 text-white rounded-xl font-semibold text-sm shadow-lg">مفعل</span>
                      </div>
                      <div className="flex items-center justify-between p-6 bg-gray-900/50 rounded-2xl">
                        <span className="text-gray-300 font-medium">التخزين الآمن</span>
                        <span className="px-4 py-2 bg-emerald-500/90 text-white rounded-xl font-semibold text-sm shadow-lg">مفعل</span>
                      </div>
                      <div className="flex items-center justify-between p-6 bg-gray-900/50 rounded-2xl">
                        <span className="text-gray-300 font-medium">وصول الإدارة</span>
                        <span className="px-4 py-2 bg-emerald-500/90 text-white rounded-xl font-semibold text-sm shadow-lg">محمي</span>
                      </div>
                      <div className="flex items-center justify-between p-6 bg-gray-900/50 rounded-2xl md:col-span-2">
                        <span className="text-gray-300 font-medium">التتبع في الوقت الحقيقي</span>
                        <span className="px-4 py-2 bg-emerald-500/90 text-white rounded-xl font-semibold text-sm shadow-lg">مفعل</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
