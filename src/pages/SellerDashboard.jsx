import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '../layouts/Layout';
import ItemForm from '../components/ItemForm';
 import BuyerSearch from '../components/BuyerSearch';
 import { useAuth } from '../context/AuthContext';
 import MeetingModal from '../components/MeetingModal';
 import { Package, Plus, Search, Calendar, Video, Clock, Users, ArrowRight, Edit } from 'lucide-react';
 import { motion } from 'framer-motion';
 import { MEETINGS } from '../data/mockData';
 
 const SellerDashboard = () => {
   const { user } = useAuth();
   const navigate = useNavigate();
   const [showAddForm, setShowAddForm] = useState(false);
   const [showBuyerSearch, setShowBuyerSearch] = useState(false);
   const [showRescheduleModal, setShowRescheduleModal] = useState(false);
   const [selectedMeeting, setSelectedMeeting] = useState(null);
   const [localMeetings, setLocalMeetings] = useState(MEETINGS);
   const [listings, setListings] = useState([]);
   const [editingItem, setEditingItem] = useState(null);

   // Filter meetings for this seller
   const sellerMeetings = localMeetings.filter(m => m.sellerId === user.id);

  const handleEditMeeting = (meeting) => {
    setSelectedMeeting(meeting);
    setShowRescheduleModal(true);
  };

  const handleRescheduleSubmit = (updatedMeeting) => {
    setLocalMeetings(prev => prev.map(m => m.id === updatedMeeting.id ? { ...m, ...updatedMeeting } : m));
    alert("Meeting rescheduled successfully!");
  };

  const handleAddListing = (data) => {
    if (editingItem) {
      setListings(prev => prev.map(item => item.id === editingItem.id ? { ...data, id: editingItem.id } : item));
      setEditingItem(null);
    } else {
      setListings(prev => [...prev, { ...data, id: Date.now().toString(), status: 'pending' }]);
    }
    setShowAddForm(false);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setShowAddForm(true);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
             <h1 className="text-4xl font-extrabold text-gray-900">Seller Dashboard</h1>
             <p className="text-gray-500 mt-2 text-lg">Manage your temporary listings and meeting requests.</p>
           </div>
           <div className="flex gap-4">
             <button
               onClick={() => { setShowBuyerSearch(!showBuyerSearch); setShowAddForm(false); }}
               className={`px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-200 ${
                 showBuyerSearch ? 'bg-gray-900 text-white' : 'bg-white text-gray-900 border'
               }`}
             >
               <Users className="w-5 h-5" />
               {showBuyerSearch ? 'Back to Dashboard' : 'Search Interested Buyers'}
             </button>
             <button
               onClick={() => { setShowAddForm(!showAddForm); setShowBuyerSearch(false); setEditingItem(null); }}
               className="px-6 py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
             >
               {showAddForm ? 'Back to Listings' : (
                 <>
                   <Plus className="w-5 h-5" />
                   Sell Particular Item
                 </>
               )}
             </button>
           </div>
         </header>
 
         {showAddForm ? (
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="bg-white rounded-3xl shadow-sm border p-8"
           >
             <h2 className="text-2xl font-bold mb-8">{editingItem ? 'Edit Listing' : 'Create New Listing'}</h2>
             <ItemForm onSubmit={handleAddListing} initialData={editingItem} isTemp={true} />
           </motion.div>
         ) : showBuyerSearch ? (
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
           >
             <BuyerSearch />
           </motion.div>
         ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-3xl shadow-sm border p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Package className="w-6 h-6 text-blue-600" />
                    Your Active Listings
                  </h2>
                </div>
                
                {listings.length === 0 ? (
                  <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">You haven't added any items yet.</p>
                    <button 
                      onClick={() => setShowAddForm(true)}
                      className="mt-4 text-blue-600 font-bold hover:underline"
                    >
                      Start selling now
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {listings.map(item => (
                      <div key={item.id} className="flex items-center gap-6 p-6 border rounded-2xl hover:border-blue-500 transition-colors group">
                        <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
                          {item.images && item.images.length > 0 ? (
                            <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <Package className="w-8 h-8 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-xl font-bold">{item.name}</h3>
                          <p className="text-gray-500 text-sm line-clamp-1">{item.description}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-blue-600 font-bold">₦{Number(item.price).toLocaleString()}</span>
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full uppercase tracking-wider">
                              {item.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                           <button 
                             onClick={() => handleEditItem(item)}
                             className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                           >
                              <Edit className="w-5 h-5" />
                           </button>
                           <button className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                              <Search className="w-5 h-5" />
                           </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              <section className="bg-white rounded-3xl shadow-sm border p-8">
                <h2 className="text-2xl font-bold flex items-center gap-2 mb-8">
                  <Calendar className="w-6 h-6 text-blue-600" />
                  Meeting Requests
                </h2>
                {sellerMeetings.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 italic">
                    No pending meeting requests from buyers.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sellerMeetings.map(meeting => (
                      <div key={meeting.id} className="flex flex-col md:flex-row md:items-center gap-6 p-6 border rounded-2xl bg-gray-50/50">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border shadow-sm">
                          <Video className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-lg font-bold">{meeting.itemName}</h3>
                          <p className="text-gray-500">Buyer: <span className="font-bold">{meeting.buyerName}</span></p>
                          <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {new Date(meeting.time).toLocaleString()}
                            </div>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                               meeting.status === 'scheduled' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                             }`}>
                               {meeting.status}
                             </span>
                           </div>
                         </div>
                         <div className="flex gap-2">
                           <button 
                             onClick={() => handleEditMeeting(meeting)}
                             className="p-3 bg-white border text-gray-400 rounded-xl hover:text-blue-600 hover:border-blue-100 transition-colors"
                           >
                             <Edit className="w-5 h-5" />
                           </button>
                           <button 
                             onClick={() => navigate(meeting.zoomLink)}
                             className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all text-sm shadow-lg shadow-blue-100 flex items-center gap-2"
                           >
                             Join Meeting
                             <ArrowRight className="w-4 h-4" />
                           </button>
                         </div>
                       </div>
                     ))}
                   </div>
                 )}
               </section>
             </div>

             <aside className="space-y-8">
               <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-xl shadow-blue-200">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                     <Video className="w-6 h-6" />
                     Zoom Integration
                  </h3>
                  <p className="text-blue-100 mb-6 opacity-90 leading-relaxed">
                     Discuss prices and details directly with buyers. Our integrated Zoom calls feature a 30-minute timer with alerts.
                  </p>
                  <button className="w-full py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors">
                     Learn More
                  </button>
               </div>

               <div className="bg-white rounded-3xl border p-8 shadow-sm">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                     <Clock className="w-5 h-5 text-blue-600" />
                     Recent Activity
                  </h3>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <p className="text-sm text-gray-600">You logged in as a temporary seller.</p>
                    </div>
                  </div>
               </div>
            </aside>
          </div>
        )}
      </div>

      <MeetingModal 
        isOpen={showRescheduleModal}
        onClose={() => setShowRescheduleModal(false)}
        onSubmit={handleRescheduleSubmit}
        meeting={selectedMeeting}
        mode="edit"
      />
    </Layout>
  );
};

export default SellerDashboard;
