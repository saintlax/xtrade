import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../layouts/Layout';
import { useAuth } from '../context/AuthContext';
import { 
  Package, Search, Calendar, Video, Clock, 
  ShoppingCart, Heart, History, Bell, ShieldCheck, MapPin, Edit, X, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BuyerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showRegisterItem, setShowRegisterItem] = useState(false);
  const [meetings, setMeetings] = useState([
    { id: 'm1', itemName: 'iPhone 13 Pro', seller: 'Tech Hub', time: '2026-03-20T10:00:00Z', status: 'scheduled', zoomLink: '/meeting/m1' },
    { id: 'm2', itemName: 'Sony WH-1000XM4', seller: 'Gadget World', time: '2026-03-21T14:30:00Z', status: 'missed', zoomLink: '/meeting/m2' }
  ]);

  const handleEditMeeting = (id) => {
    alert(`Editing meeting ${id}. You can reschedule or cancel.`);
  };

  const handleJoinMeeting = (link) => {
     navigate(link);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
             <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center text-white font-extrabold text-2xl shadow-lg shadow-blue-200">
                JD
             </div>
             <div>
                <h1 className="text-4xl font-extrabold text-gray-900">Hi, {user.name}</h1>
                <div className="flex items-center gap-2 mt-2">
                   <ShieldCheck className="w-4 h-4 text-blue-600" />
                   <span className="text-blue-700 font-bold text-sm bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
                      {user.subscriptionStatus} Subscriber
                   </span>
                </div>
             </div>
          </div>
          <button
            onClick={() => setShowRegisterItem(true)}
            className="px-6 py-4 bg-gray-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all shadow-lg shadow-gray-200"
          >
            <Package className="w-5 h-5" />
            Register Intent to Purchase
          </button>
        </header>

        <div className="grid lg:grid-cols-4 gap-8">
           <nav className="lg:col-span-1 space-y-2">
              <button 
                 onClick={() => setActiveTab('overview')}
                 className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${
                    activeTab === 'overview' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-600 hover:bg-gray-100'
                 }`}
              >
                 <ShoppingCart className="w-5 h-5" />
                 Overview
              </button>
              <button 
                 onClick={() => setActiveTab('meetings')}
                 className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${
                    activeTab === 'meetings' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-600 hover:bg-gray-100'
                 }`}
              >
                 <Calendar className="w-5 h-5" />
                 Meetings
              </button>
              <button 
                 onClick={() => setActiveTab('watchlist')}
                 className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${
                    activeTab === 'watchlist' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-600 hover:bg-gray-100'
                 }`}
              >
                 <Heart className="w-5 h-5" />
                 Watchlist
              </button>
              <button 
                 onClick={() => setActiveTab('history')}
                 className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${
                    activeTab === 'history' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-600 hover:bg-gray-100'
                 }`}
              >
                 <History className="w-5 h-5" />
                 Order History
              </button>
           </nav>

           <div className="lg:col-span-3 space-y-8">
              {activeTab === 'overview' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div className="bg-white p-8 rounded-3xl border shadow-sm group hover:border-blue-500 transition-colors">
                        <Calendar className="w-8 h-8 text-blue-600 mb-4" />
                        <div className="text-3xl font-extrabold">2</div>
                        <div className="text-gray-500 font-medium">Upcoming Meetings</div>
                     </div>
                     <div className="bg-white p-8 rounded-3xl border shadow-sm group hover:border-blue-500 transition-colors">
                        <ShoppingCart className="w-8 h-8 text-blue-600 mb-4" />
                        <div className="text-3xl font-extrabold">0</div>
                        <div className="text-gray-500 font-medium">Pending Deliveries</div>
                     </div>
                     <div className="bg-white p-8 rounded-3xl border shadow-sm group hover:border-blue-500 transition-colors">
                        <Bell className="w-8 h-8 text-blue-600 mb-4" />
                        <div className="text-3xl font-extrabold">4</div>
                        <div className="text-gray-500 font-medium">New Notifications</div>
                     </div>
                  </div>

                  <section className="bg-white rounded-3xl shadow-sm border p-8">
                     <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold">Upcoming Meetings</h2>
                        <button className="text-blue-600 font-bold hover:underline">View All</button>
                     </div>
                     <div className="space-y-4">
                        {meetings.filter(m => m.status === 'scheduled').map(meeting => (
                          <div key={meeting.id} className="flex flex-col md:flex-row md:items-center gap-6 p-6 border rounded-2xl bg-gray-50/50">
                             <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border shadow-sm">
                                <Video className="w-6 h-6 text-blue-600" />
                             </div>
                             <div className="flex-grow">
                                <h3 className="text-lg font-bold">{meeting.itemName}</h3>
                                <p className="text-gray-500">Seller: <span className="font-bold">{meeting.seller}</span></p>
                                <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
                                   <div className="flex items-center gap-1">
                                      <Clock className="w-4 h-4" />
                                      {new Date(meeting.time).toLocaleString()}
                                   </div>
                                </div>
                             </div>
                             <div className="flex gap-2">
                                <button 
                                   onClick={() => handleJoinMeeting(meeting.zoomLink)}
                                   className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all text-sm shadow-lg shadow-blue-100"
                                >
                                   Join Call
                                </button>
                                <button 
                                   onClick={() => handleEditMeeting(meeting.id)}
                                   className="p-3 bg-white border text-gray-400 rounded-xl hover:text-blue-600 hover:border-blue-100 transition-colors"
                                >
                                   <Edit className="w-5 h-5" />
                                </button>
                             </div>
                          </div>
                        ))}
                     </div>
                  </section>
                </>
              )}

              {activeTab === 'meetings' && (
                 <section className="bg-white rounded-3xl shadow-sm border p-8">
                    <h2 className="text-2xl font-bold mb-8">Meeting History & Schedule</h2>
                    <div className="space-y-4">
                       {meetings.map(meeting => (
                         <div key={meeting.id} className="flex flex-col md:flex-row md:items-center gap-6 p-6 border rounded-2xl">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-sm ${
                               meeting.status === 'missed' ? 'bg-red-50' : 'bg-white'
                            }`}>
                               <Video className={`w-6 h-6 ${meeting.status === 'missed' ? 'text-red-500' : 'text-blue-600'}`} />
                            </div>
                            <div className="flex-grow">
                               <h3 className="text-lg font-bold">{meeting.itemName}</h3>
                               <p className="text-gray-500">Seller: {meeting.seller}</p>
                               <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
                                  <div className="flex items-center gap-1">
                                     <Clock className="w-4 h-4" />
                                     {new Date(meeting.time).toLocaleString()}
                                  </div>
                                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase ${
                                     meeting.status === 'scheduled' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                  }`}>
                                     {meeting.status}
                                  </span>
                               </div>
                            </div>
                            <button 
                               onClick={() => handleEditMeeting(meeting.id)}
                               className="px-6 py-3 bg-white border text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all text-sm"
                            >
                               {meeting.status === 'missed' ? 'Reschedule' : 'Edit Meeting'}
                            </button>
                         </div>
                       ))}
                    </div>
                 </section>
              )}
           </div>
        </div>
      </div>

      {/* Register Item Intent Modal */}
      <AnimatePresence>
        {showRegisterItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
             <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden"
             >
                <div className="p-8 border-b flex justify-between items-center">
                   <h2 className="text-2xl font-bold">Register Purchase Intent</h2>
                   <button onClick={() => setShowRegisterItem(false)} className="text-gray-400 hover:text-gray-600">
                      <X className="w-6 h-6" />
                   </button>
                </div>
                <div className="p-8 space-y-6">
                   <p className="text-gray-600">Tell us what you're looking for and sellers will find you.</p>
                   <div className="space-y-4">
                      <div>
                         <label className="block text-sm font-semibold text-gray-700 mb-1">Item You Want to Buy</label>
                         <input type="text" className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. iPhone 13 Pro" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                           <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                           <input type="email" value={user.email} className="w-full px-4 py-3 rounded-xl border bg-gray-50 text-gray-400" disabled />
                        </div>
                        <div>
                           <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                           <input type="tel" value={user.phone} className="w-full px-4 py-3 rounded-xl border bg-gray-50 text-gray-400" disabled />
                        </div>
                      </div>
                   </div>
                   <button 
                      onClick={() => setShowRegisterItem(false)}
                      className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                   >
                      Register My Interest
                   </button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default BuyerDashboard;
