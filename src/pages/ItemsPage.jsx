import React, { useState } from 'react';
import { Layout } from '../layouts/Layout';
import { ITEMS } from '../data/mockData';
import { Search, Filter, MapPin, DollarSign, Calendar, Info, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

const ItemsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems = ITEMS.filter(item => 
    (item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     item.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory === 'All' || item.category === selectedCategory)
  );

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <header className="mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Browse Marketplace</h1>
            <p className="text-lg text-gray-600">Find the best deals from verified vendors and local sellers.</p>
          </header>

          <div className="flex flex-col md:flex-row gap-6 mb-12">
            <div className="flex-grow relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search for items, brands, or categories..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
               <select 
                  className="px-6 py-4 bg-white rounded-2xl border-none shadow-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
               >
                  <option>All</option>
                  <option>Electronics</option>
                  <option>Audio</option>
                  <option>Home</option>
               </select>
               <button className="p-4 bg-white rounded-2xl shadow-sm hover:bg-gray-50 transition-colors">
                  <Filter className="w-6 h-6 text-gray-600" />
               </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-transparent hover:border-blue-100 group"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img 
                    src={item.images[0]} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-blue-600 border border-blue-100">
                    {item.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{item.name}</h3>
                    <span className="text-2xl font-black text-blue-600">${item.price}</span>
                  </div>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed">{item.description}</p>
                  
                  <div className="space-y-3 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      {item.pickupAddress}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-6">
                     <button className="px-4 py-3 bg-blue-50 text-blue-600 rounded-xl font-bold text-sm hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Meet Seller
                     </button>
                     <button className="px-4 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-100">
                        <ShoppingCart className="w-4 h-4" />
                        Buy Now
                     </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-20">
               <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border">
                  <Search className="w-8 h-8 text-gray-300" />
               </div>
               <h3 className="text-2xl font-bold text-gray-900">No items found</h3>
               <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ItemsPage;
