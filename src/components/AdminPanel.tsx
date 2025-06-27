// import React, { useState, useEffect } from 'react';
// import { X, Users, Globe, Clock, Download, Trash2, Ban, UserCheck, Eye, BarChart3, Shield, MapPin } from 'lucide-react';
// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = 'https://mldvuzkrcjnltzgwtpfc.supabase.co';
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sZHZ1emtyY2pubHR6Z3d0cGZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5Mjg4MjYsImV4cCI6MjA2NjUwNDgyNn0.idcUACM1z8IPkYdpV-oT_R1jZexmC25W7IMZaFvooUc';
// const supabase = createClient(supabaseUrl, supabaseKey);

// interface AdminPanelProps {
//   onClose: () => void;
//   visitorData: any;
// }

// const AdminPanel = ({ onClose, visitorData }: AdminPanelProps) => {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [realTimeVisitors, setRealTimeVisitors] = useState([]);
//   const [bannedIPs, setBannedIPs] = useState([]);
//   const [messages, setMessages] = useState<any[]>([]);

//   const tabs = [
//     { id: 'dashboard', name: 'Dashboard', icon: <BarChart3 className="w-4 h-4" /> },
//     { id: 'messages', name: 'Messages', icon: <Eye className="w-4 h-4" /> },
//     { id: 'visitors', name: 'Visitors', icon: <Users className="w-4 h-4" /> },
//     { id: 'analytics', name: 'Analytics', icon: <Globe className="w-4 h-4" /> },
//     { id: 'security', name: 'Security', icon: <Shield className="w-4 h-4" /> },
//   ];

//   const fetchMessages = async () => {
//     const { data, error } = await supabase
//       .from('messages')
//       .select('*')
//       .order('created_at', { ascending: false });

//     if (!error && data) {
//       setMessages(data);
//     } else {
//       console.error("❌ Failed to fetch messages:", error);
//     }
//   };

//   useEffect(() => {
//     fetchMessages();

//     const visitors = JSON.parse(localStorage.getItem('omnia_secure_visitors') || '[]');
//     setRealTimeVisitors(visitors);

//     const banned = JSON.parse(localStorage.getItem('omnia_banned_ips') || '[]');
//     setBannedIPs(banned);
//   }, []);

//   // باقي الكود بدون تعديل...

//   return (
//     <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//       <div className="bg-gray-900 rounded-2xl w-full max-w-7xl h-[90vh] overflow-hidden border border-gray-700">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-700">
//           <h2 className="text-2xl font-bold text-white">Omnia Admin Dashboard</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-white transition-colors duration-300"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         <div className="flex h-full">
//           {/* Sidebar */}
//           <div className="w-64 bg-gray-800 border-r border-gray-700 p-4">
//             <nav className="space-y-2">
//               {tabs.map((tab) => (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-300 ${
//                     activeTab === tab.id
//                       ? 'bg-purple-600 text-white'
//                       : 'text-gray-300 hover:bg-gray-700'
//                   }`}
//                 >
//                   {tab.icon}
//                   <span>{tab.name}</span>
//                 </button>
//               ))}
//             </nav>
//           </div>

//           {/* Main Content */}
//           <div className="flex-1 overflow-y-auto">
//             {activeTab === 'dashboard' && (
//               <div className="p-6">
//                 <h3 className="text-xl font-bold text-white mb-6">Real-Time Overview</h3>
                
//                 {/* Stats Grid */}
//                 <div className="grid grid-cols-4 gap-6 mb-8">
//                   <div className="bg-gray-800 p-6 rounded-xl">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <p className="text-gray-400 text-sm">Total Real Visitors</p>
//                         <p className="text-2xl font-bold text-white">{visitorData.totalVisitors}</p>
//                       </div>
//                       <Users className="w-8 h-8 text-purple-400" />
//                     </div>
//                   </div>
                  
//                   <div className="bg-gray-800 p-6 rounded-xl">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <p className="text-gray-400 text-sm">Today's Visitors</p>
//                         <p className="text-2xl font-bold text-white">{visitorData.todayVisitors}</p>
//                       </div>
//                       <Clock className="w-8 h-8 text-green-400" />
//                     </div>
//                   </div>
                  
//                   <div className="bg-gray-800 p-6 rounded-xl">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <p className="text-gray-400 text-sm">New Messages</p>
//                         <p className="text-2xl font-bold text-white">{messages.filter(m => m.status === 'unread').length}</p>
//                       </div>
//                       <Users className="w-8 h-8 text-blue-400" />
//                     </div>
//                   </div>
                  
//                   <div className="bg-gray-800 p-6 rounded-xl">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <p className="text-gray-400 text-sm">Countries</p>
//                         <p className="text-2xl font-bold text-white">{visitorData.countries.length}</p>
//                       </div>
//                       <Globe className="w-8 h-8 text-yellow-400" />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Quick Actions */}
//                 <div className="bg-gray-800 p-6 rounded-xl">
//                   <h4 className="text-lg font-semibold text-white mb-4">Quick Actions</h4>
//                   <div className="flex space-x-4">
//                     <button
//                       onClick={() => downloadData('all')}
//                       className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300"
//                     >
//                       <Download className="w-4 h-4" />
//                       <span>Export All Data</span>
//                     </button>
//                     <button
//                       onClick={() => downloadData('messages')}
//                       className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
//                     >
//                       <Download className="w-4 h-4" />
//                       <span>Export Messages</span>
//                     </button>
//                     <button
//                       onClick={() => downloadData('visitors')}
//                       className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300"
//                     >
//                       <Download className="w-4 h-4" />
//                       <span>Export Visitors</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === 'messages' && (
//               <div className="p-6">
//                 <div className="flex items-center justify-between mb-6">
//                   <h3 className="text-xl font-bold text-white">Contact Messages ({messages.length})</h3>
//                   <button
//                     onClick={() => downloadData('messages')}
//                     className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300"
//                   >
//                     <Download className="w-4 h-4" />
//                     <span>Export</span>
//                   </button>
//                 </div>

//                 <div className="space-y-4">
//                   {messages.length === 0 ? (
//                     <div className="text-center text-gray-400 py-8">
//                       No messages received yet.
//                     </div>
//                   ) : (
//                     messages.map((message) => (
//                       <div key={message.id} className="bg-gray-800 p-6 rounded-xl">
//                         <div className="flex items-start justify-between mb-4">
//                           <div>
//                             <h4 className="text-white font-semibold">{message.name}</h4>
//                             <p className="text-gray-400 text-sm">{message.email}</p>
//                             {message.whatsapp && <p className="text-gray-400 text-sm">{message.whatsapp}</p>}
//                           </div>
//                           <div className="flex space-x-2">
//                             <span className={`px-2 py-1 rounded text-xs ${
//                               message.status === 'unread' 
//                                 ? 'bg-red-600 text-white' 
//                                 : 'bg-green-600 text-white'
//                             }`}>
//                               {message.status}
//                             </span>
//                             {message.status === 'unread' && (
//                               <button 
//                                 onClick={() => markMessageAsRead(message.id)}
//                                 className="text-green-400 hover:text-green-300"
//                                 title="Mark as Read"
//                               >
//                                 <UserCheck className="w-4 h-4" />
//                               </button>
//                             )}
//                             <button 
//                               onClick={() => deleteMessage(message.id)}
//                               className="text-red-400 hover:text-red-300"
//                               title="Delete Message"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </button>
//                           </div>
//                         </div>
//                         <p className="text-gray-300 mb-4">{message.message}</p>
//                         <div className="flex items-center justify-between text-sm text-gray-400">
//                           <span className="flex items-center space-x-1">
//                             <MapPin className="w-3 h-3" />
//                             <span>{message.country}, {message.city}</span>
//                           </span>
//                           <span>{new Date(message.timestamp).toLocaleString()}</span>
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>
//             )}

//             {activeTab === 'visitors' && (
//               <div className="p-6">
//                 <div className="flex items-center justify-between mb-6">
//                   <h3 className="text-xl font-bold text-white">Real Visitor Tracking ({realTimeVisitors.length})</h3>
//                   <button
//                     onClick={() => downloadData('visitors')}
//                     className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300"
//                   >
//                     <Download className="w-4 h-4" />
//                     <span>Export</span>
//                   </button>
//                 </div>

//                 <div className="space-y-4">
//                   {realTimeVisitors.map((visitor, index) => (
//                     <div key={visitor.id} className="bg-gray-800 p-6 rounded-xl">
//                       <div className="flex items-start justify-between mb-4">
//                         <div>
//                           <h4 className="text-white font-semibold flex items-center space-x-2">
//                             <MapPin className="w-4 h-4 text-purple-400" />
//                             <span>{visitor.country}, {visitor.city}</span>
//                             {visitor.region && <span className="text-gray-400">({visitor.region})</span>}
//                           </h4>
//                           <p className="text-gray-400 text-sm">IP: {visitor.ip}</p>
//                           <p className="text-gray-400 text-sm">{visitor.device} - {visitor.browser}</p>
//                           {visitor.isp && <p className="text-gray-400 text-sm">ISP: {visitor.isp}</p>}
//                         </div>
//                         <div className="flex space-x-2">
//                           <span className={`px-2 py-1 rounded text-xs ${
//                             visitor.isActive ? 'bg-green-600 text-white' : 'bg-gray-600 text-white'
//                           }`}>
//                             {visitor.isActive ? 'Active' : 'Offline'}
//                           </span>
//                           {!bannedIPs.find(banned => banned.ip === visitor.ip) ? (
//                             <button 
//                               onClick={() => banVisitor(visitor.ip)}
//                               className="text-yellow-400 hover:text-yellow-300" 
//                               title="Ban User"
//                             >
//                               <Ban className="w-4 h-4" />
//                             </button>
//                           ) : (
//                             <button 
//                               onClick={() => unbanVisitor(visitor.ip)}
//                               className="text-green-400 hover:text-green-300" 
//                               title="Unban User"
//                             >
//                               <UserCheck className="w-4 h-4" />
//                             </button>
//                           )}
//                         </div>
//                       </div>
                      
//                       <div className="grid grid-cols-4 gap-4 mb-4">
//                         <div>
//                           <p className="text-gray-400 text-sm">Visit Time</p>
//                           <p className="text-white font-semibold text-sm">{new Date(visitor.visitTime).toLocaleString()}</p>
//                         </div>
//                         <div>
//                           <p className="text-gray-400 text-sm">Time on Site</p>
//                           <p className="text-white font-semibold text-sm">{formatTimeOnSite(visitor.timeOnSite)}</p>
//                         </div>
//                         <div>
//                           <p className="text-gray-400 text-sm">Screen</p>
//                           <p className="text-white font-semibold text-sm">{visitor.screenResolution}</p>
//                         </div>
//                         <div>
//                           <p className="text-gray-400 text-sm">Language</p>
//                           <p className="text-white font-semibold text-sm">{visitor.language}</p>
//                         </div>
//                       </div>

//                       <div>
//                         <p className="text-gray-400 text-sm mb-2">Pages Viewed:</p>
//                         <div className="flex space-x-2">
//                           {visitor.pageViews?.map((page, idx) => (
//                             <span
//                               key={idx}
//                               className="bg-purple-600/20 text-purple-400 px-2 py-1 rounded text-xs"
//                             >
//                               {page}
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {activeTab === 'analytics' && (
//               <div className="p-6">
//                 <h3 className="text-xl font-bold text-white mb-6">Site Analytics</h3>
                
//                 <div className="grid grid-cols-2 gap-6 mb-8">
//                   <div className="bg-gray-800 p-6 rounded-xl">
//                     <h4 className="text-lg font-semibold text-white mb-4">Page Views</h4>
//                     <div className="space-y-3">
//                       {Object.entries(visitorData.pageViews).map(([page, views]) => (
//                         <div key={page} className="flex items-center justify-between">
//                           <span className="text-gray-300 capitalize">{page}</span>
//                           <span className="text-white font-semibold">{views}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="bg-gray-800 p-6 rounded-xl">
//                     <h4 className="text-lg font-semibold text-white mb-4">Top Countries</h4>
//                     <div className="space-y-3">
//                       {visitorData.countries.slice(0, 5).map((country: string, idx: number) => {
//                         const countryVisitors = realTimeVisitors.filter(v => v.country === country).length;
//                         return (
//                           <div key={country} className="flex items-center justify-between">
//                             <span className="text-gray-300">{country}</span>
//                             <span className="text-white font-semibold">{countryVisitors}</span>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-gray-800 p-6 rounded-xl">
//                   <h4 className="text-lg font-semibold text-white mb-4">Device Analytics</h4>
//                   <div className="grid grid-cols-3 gap-4">
//                     <div className="text-center">
//                       <p className="text-2xl font-bold text-purple-400">
//                         {realTimeVisitors.filter(v => v.device === 'Mobile').length}
//                       </p>
//                       <p className="text-gray-400 text-sm">Mobile</p>
//                     </div>
//                     <div className="text-center">
//                       <p className="text-2xl font-bold text-blue-400">
//                         {realTimeVisitors.filter(v => v.device === 'Desktop').length}
//                       </p>
//                       <p className="text-gray-400 text-sm">Desktop</p>
//                     </div>
//                     <div className="text-center">
//                       <p className="text-2xl font-bold text-green-400">
//                         {realTimeVisitors.filter(v => v.isActive).length}
//                       </p>
//                       <p className="text-gray-400 text-sm">Active Now</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === 'security' && (
//               <div className="p-6">
//                 <h3 className="text-xl font-bold text-white mb-6">Security Management</h3>
                
//                 <div className="grid gap-6">
//                   <div className="bg-gray-800 p-6 rounded-xl">
//                     <h4 className="text-lg font-semibold text-white mb-4">Banned IPs ({bannedIPs.length})</h4>
//                     {bannedIPs.length === 0 ? (
//                       <p className="text-gray-400">No banned IPs</p>
//                     ) : (
//                       <div className="space-y-2">
//                         {bannedIPs.map((banned, index) => (
//                           <div key={index} className="flex items-center justify-between bg-gray-700 p-3 rounded">
//                             <div>
//                               <span className="text-white font-mono">{banned.ip}</span>
//                               <span className="text-gray-400 text-sm ml-2">
//                                 Banned: {new Date(banned.bannedAt).toLocaleString()}
//                               </span>
//                             </div>
//                             <button
//                               onClick={() => unbanVisitor(banned.ip)}
//                               className="text-green-400 hover:text-green-300"
//                               title="Unban"
//                             >
//                               <UserCheck className="w-4 h-4" />
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>

//                   <div className="bg-gray-800 p-6 rounded-xl">
//                     <h4 className="text-lg font-semibold text-white mb-4">Security Status</h4>
//                     <div className="space-y-3">
//                       <div className="flex items-center justify-between">
//                         <span className="text-gray-300">Data Encryption</span>
//                         <span className="text-green-400 font-semibold">Active</span>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <span className="text-gray-300">Secure Storage</span>
//                         <span className="text-green-400 font-semibold">Enabled</span>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <span className="text-gray-300">Admin Access</span>
//                         <span className="text-green-400 font-semibold">Protected</span>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <span className="text-gray-300">Real-time Tracking</span>
//                         <span className="text-green-400 font-semibold">Active</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminPanel;
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mldvuzkrcjnltzgwtpfc.supabase.co';
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // استخدم نفس المفتاح اللي في Contact
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sZHZ1emtyY2pubHR6Z3d0cGZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5Mjg4MjYsImV4cCI6MjA2NjUwNDgyNn0.idcUACM1z8IPkYdpV-oT_R1jZexmC25W7IMZaFvooUc';

const supabase = createClient(supabaseUrl, supabaseKey);

const AdminMessages = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching messages:', error.message);
    } else {
      setMessages(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);
  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-purple-400">📨 Messages Dashboard</h1>

      {loading ? (
        <p className="text-gray-400">Loading messages...</p>
      ) : messages.length === 0 ? (
        <p className="text-gray-400">No messages found.</p>
      ) : (
        <div className="space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-gray-800 border border-gray-700 p-4 rounded-lg shadow-md"
            >
              <div className="mb-2">
                <span className="text-purple-400 font-semibold">Name:</span> {msg.name}
              </div>
              <div className="mb-2">
                <span className="text-purple-400 font-semibold">Email:</span> {msg.email}
              </div>
              {msg.whatsapp && (
                <div className="mb-2">
                  <span className="text-purple-400 font-semibold">WhatsApp:</span> {msg.whatsapp}
                </div>
              )}
              <div className="mb-2">
                <span className="text-purple-400 font-semibold">Message:</span> {msg.message}
              </div>
              <div className="text-sm text-gray-400">
                <span>Sent at:</span>{' '}
                {new Date(msg.created_at).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
