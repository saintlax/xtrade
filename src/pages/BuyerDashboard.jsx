import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../layouts/Layout';
import { useAuth } from '../context/AuthContext';
import MeetingModal from '../components/MeetingModal';
import { 
  Package, Search, Calendar, Video, Clock, 
  ShoppingCart, Heart, History, Bell, ShieldCheck, MapPin, Edit, X, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MEETINGS, ITEMS } from '../data/mockData';
import Pagination from '../components/Pagination';

const BuyerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showRegisterItem, setShowRegisterItem] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [meetings, setMeetings] = useState(MEETINGS);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Get watchlist items and orders from user object (or default to empty)
  const watchlistItems = ITEMS.filter(item => (user.watchlist || []).includes(item.id));
  const orderHistory = user.orders || [];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset page on tab change
  };

  const handleEditMeeting = (meeting) => {
    setSelectedMeeting(meeting);
    setShowRescheduleModal(true);
  };

  const handleRescheduleSubmit = (updatedMeeting) => {
    setMeetings(prev => prev.map(m => m.id === updatedMeeting.id ? { ...m, ...updatedMeeting } : m));
    alert("Meeting rescheduled successfully!");
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
                 onClick={() => handleTabChange('overview')}
                 className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${
                    activeTab === 'overview' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-600 hover:bg-gray-100'
                 }`}
              >
                 <ShoppingCart className="w-5 h-5" />
                 Overview
              </button>
              <button 
                 onClick={() => handleTabChange('meetings')}
                 className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${
                    activeTab === 'meetings' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-600 hover:bg-gray-100'
                 }`}
              >
                 <Calendar className="w-5 h-5" />
                 Meetings
              </button>
              <button 
                 onClick={() => handleTabChange('watchlist')}
                 className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${
                    activeTab === 'watchlist' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-600 hover:bg-gray-100'
                 }`}
              >
                 <Heart className="w-5 h-5" />
                 Watchlist
              </button>
              <button 
                 onClick={() => handleTabChange('history')}
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
                        <div className="text-3xl font-extrabold">
                          {meetings.filter(m => m.status === 'scheduled').length}
                        </div>
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
                        <button 
                          onClick={() => handleTabChange('meetings')}
                          className="text-blue-600 font-bold hover:underline"
                        >
                          View All
                        </button>
                     </div>
                     <div className="space-y-4">
                        {meetings.filter(m => m.status === 'scheduled')
                          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                          .map(meeting => (
                          <div key={meeting.id} className="flex flex-col md:flex-row md:items-center gap-6 p-6 border rounded-2xl bg-gray-50/50">
                             <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border shadow-sm">
                                <Video className="w-6 h-6 text-blue-600" />
                             </div>
                             <div className="flex-grow">
                                <h3 className="text-lg font-bold">{meeting.itemName}</h3>
                                <p className="text-gray-500">Seller: <span className="font-bold">{meeting.sellerName || 'Tech Hub'}</span></p>
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
                                   onClick={() => handleEditMeeting(meeting)}
                                   className="p-3 bg-white border text-gray-400 rounded-xl hover:text-blue-600 hover:border-blue-100 transition-colors"
                                >
                                   <Edit className="w-5 h-5" />
                                </button>
                             </div>
                          </div>
                        ))}
                     </div>
                     <div className="mt-8">
                        <Pagination 
                           currentPage={currentPage}
                           totalItems={meetings.filter(m => m.status === 'scheduled').length}
                           itemsPerPage={itemsPerPage}
                           onPageChange={handlePageChange}
                        />
                     </div>
                  </section>
                </>
              )}

              {activeTab === 'meetings' && (
                 <section className="bg-white rounded-3xl shadow-sm border p-8">
                    <h2 className="text-2xl font-bold mb-8">Meeting History & Schedule</h2>
                    <div className="space-y-4">
                       {meetings
                        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                        .map(meeting => (
                         <div key={meeting.id} className="flex flex-col md:flex-row md:items-center gap-6 p-6 border rounded-2xl hover:border-blue-500 transition-colors">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-sm ${
                               meeting.status === 'missed' ? 'bg-red-50' : 'bg-white'
                            }`}>
                               <Video className={`w-6 h-6 ${meeting.status === 'missed' ? 'text-red-500' : 'text-blue-600'}`} />
                            </div>
                            <div className="flex-grow">
                               <h3 className="text-lg font-bold">{meeting.itemName}</h3>
                               <p className="text-gray-500">Seller: {meeting.sellerName || 'Tech Hub'}</p>
                               <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
                                  <div className="flex items-center gap-1">
                                     <Clock className="w-4 h-4" />
                                     {new Date(meeting.time).toLocaleString()}
                                  </div>
                                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase ${
                                     meeting.status === 'scheduled' ? 'bg-green-100 text-green-700' : 
                                     meeting.status === 'missed' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                                  }`}>
                                     {meeting.status}
                                  </span>
                               </div>
                            </div>
                            <button 
                               onClick={() => handleEditMeeting(meeting)}
                               className="px-6 py-3 bg-white border text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all text-sm"
                            >
                               {meeting.status === 'missed' ? 'Reschedule' : 'Edit Meeting'}
                            </button>
                         </div>
                       ))}
                    </div>
                    <div className="mt-8">
                       <Pagination 
                          currentPage={currentPage}
                          totalItems={meetings.length}
                          itemsPerPage={itemsPerPage}
                          onPageChange={handlePageChange}
                       />
                    </div>
                 </section>
              )}

              {activeTab === 'watchlist' && (
                 <section className="bg-white rounded-3xl shadow-sm border p-8">
                    <h2 className="text-2xl font-bold mb-8">Your Watchlist</h2>
                    {watchlistItems.length === 0 ? (
                       <div className="text-center py-12 text-gray-500 italic">Your watchlist is empty.</div>
                    ) : (
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {watchlistItems
                             .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                             .map(item => (
                             <div key={item.id} className="p-4 border rounded-2xl flex gap-4 group hover:border-blue-500 transition-all">
                                <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                                   <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                </div>
                                <div className="flex-grow min-w-0">
                                   <h3 className="font-bold text-gray-900 truncate">{item.name}</h3>
                                   <p className="text-blue-600 font-bold">₦{item.price.toLocaleString()}</p>
                                   <button 
                                      onClick={() => navigate(`/items`)}
                                      className="mt-2 text-xs font-bold text-gray-400 hover:text-blue-600 flex items-center gap-1"
                                   >
                                      View Item <ArrowRight className="w-3 h-3" />
                                   </button>
                                </div>
                             </div>
                          ))}
                       </div>
                    )}
                    <div className="mt-8">
                       <Pagination 
                          currentPage={currentPage}
                          totalItems={watchlistItems.length}
                          itemsPerPage={itemsPerPage}
                          onPageChange={handlePageChange}
                       />
                    </div>
                 </section>
              )}

              {activeTab === 'history' && (
                 <section className="bg-white rounded-3xl shadow-sm border p-8">
                    <h2 className="text-2xl font-bold mb-8">Order History</h2>
                    {orderHistory.length === 0 ? (
                       <div className="text-center py-12 text-gray-500 italic">No orders found.</div>
                    ) : (
                       <div className="space-y-4">
                          {orderHistory
                             .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                             .map(order => (
                             <div key={order.id} className="p-6 border rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-blue-500 transition-all">
                                <div>
                                   <div className="flex items-center gap-2 mb-1">
                                      <span className="text-xs font-black text-blue-600 uppercase tracking-widest">{order.id}</span>
                                      <span className="text-gray-300">•</span>
                                      <span className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</span>
                                   </div>
                                   <h3 className="text-lg font-bold text-gray-900">{order.itemName}</h3>
                                   <p className="text-gray-600 font-medium">₦{order.price.toLocaleString()}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                   <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                      order.status === 'delivered' ? 'bg-green-100 text-green-700' : 
                                      order.status === 'shipped' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                                   }`}>
                                      {order.status}
                                   </span>
                                   <button className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                                      <Package className="w-5 h-5" />
                                   </button>
                                </div>
                             </div>
                          ))}
                       </div>
                    )}
                    <div className="mt-8">
                       <Pagination 
                          currentPage={currentPage}
                          totalItems={orderHistory.length}
                          itemsPerPage={itemsPerPage}
                          onPageChange={handlePageChange}
                       />
                    </div>
                 </section>
              )}
           </div>
        </div>
      </div>

      <MeetingModal 
        isOpen={showRescheduleModal}
        onClose={() => setShowRescheduleModal(false)}
        onSubmit={handleRescheduleSubmit}
        meeting={selectedMeeting}
        mode="edit"
      />

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
