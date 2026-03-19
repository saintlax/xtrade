import React, { useState } from 'react';
import { Search, Users, Calendar, Video, Clock, Filter, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BUYER_INTENTS } from '../data/mockData';
import Pagination from './Pagination';

const BuyerSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sentRequests, setSentRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const filteredIntents = BUYER_INTENTS.filter(intent => 
    intent.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    intent.buyerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = filteredIntents.length;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentIntents = filteredIntents.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRequestMeeting = (intentId) => {
    setSentRequests(prev => [...prev, intentId]);
    alert("Meeting request triggered! The buyer will be notified to join.");
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Search for Interested Buyers</h2>
          <p className="text-gray-500 mt-1">Find buyers who registered an intent to purchase items you have.</p>
        </div>
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search by item name or buyer..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentIntents.map((intent, index) => (
          <motion.div 
            key={intent.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-3xl p-6 border shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold text-lg">
                  {intent.buyerName.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{intent.buyerName}</h3>
                  <div className="text-xs text-gray-500 uppercase font-black tracking-widest mt-0.5">{intent.category}</div>
                </div>
              </div>
              <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                {intent.status}
              </div>
            </div>

            <div className="space-y-4 mb-8">
               <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="text-xs text-gray-400 uppercase font-bold mb-1">Looking for</div>
                  <div className="text-lg font-black text-gray-800">{intent.itemName}</div>
               </div>
               <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  Registered {new Date(intent.timestamp).toLocaleDateString()}
               </div>
            </div>

            <button 
              onClick={() => handleRequestMeeting(intent.id)}
              disabled={sentRequests.includes(intent.id)}
              className={`w-full py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all ${
                sentRequests.includes(intent.id) 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-100'
              }`}
            >
              {sentRequests.includes(intent.id) ? (
                <>
                  <Calendar className="w-5 h-5" />
                  Request Sent
                </>
              ) : (
                <>
                  <Video className="w-5 h-5" />
                  Trigger Meeting Request
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </motion.div>
        ))}
      </div>

      <Pagination 
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />

      {filteredIntents.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900">No matching buyer intents</h3>
          <p className="text-gray-500 mt-2">Try searching for different items or wait for new buyers to register.</p>
        </div>
      )}
    </div>
  );
};

export default BuyerSearch;
