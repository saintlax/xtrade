import React, { useState } from 'react';
import { Layout } from '../layouts/Layout';
import ItemForm from '../components/ItemForm';
import { useAuth } from '../context/AuthContext';
import { 
  Package, Plus, Search, Calendar, Video, Clock, 
  ShieldCheck, UserCheck, TrendingUp, Settings, LogOut, LayoutDashboard 
} from 'lucide-react';
import { motion } from 'framer-motion';

const VendorDashboard = () => {
  const { user, logout } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [listings, setListings] = useState([
    { id: '1', name: 'iPhone 13 Pro', price: 850, status: 'available', description: '256GB Graphite' },
    { id: '2', name: 'MacBook Air M2', price: 1200, status: 'available', description: '16GB RAM, 512GB SSD' }
  ]);

  const handleAddListing = (data) => {
    setListings(prev => [...prev, { ...data, id: Date.now().toString(), status: 'available' }]);
    setShowAddForm(false);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
             <div className="w-16 h-16 bg-blue-100 rounded-3xl flex items-center justify-center text-blue-600 font-extrabold text-2xl shadow-sm border">
                TH
             </div>
             <div>
                <h1 className="text-4xl font-extrabold text-gray-900">{user.name}</h1>
                <div className="flex items-center gap-2 mt-2">
                   <UserCheck className="w-4 h-4 text-green-600" />
                   <span className="text-green-700 font-bold text-sm bg-green-50 px-3 py-1 rounded-full uppercase tracking-wider">
                      Verified Vendor
                   </span>
                </div>
             </div>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-6 py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
          >
            {showAddForm ? 'Back to Dashboard' : (
              <>
                <Plus className="w-5 h-5" />
                Upload New Item
              </>
            )}
          </button>
        </header>

        {showAddForm ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-sm border p-8"
          >
            <h2 className="text-2xl font-bold mb-8">Add New Inventory</h2>
            <ItemForm onSubmit={handleAddListing} isTemp={false} />
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-4 gap-8">
             <nav className="lg:col-span-1 space-y-2">
                <button 
                   onClick={() => setActiveTab('dashboard')}
                   className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${
                      activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-600 hover:bg-gray-100'
                   }`}
                >
                   <LayoutDashboard className="w-5 h-5" />
                   Dashboard
                </button>
                <button 
                   onClick={() => setActiveTab('inventory')}
                   className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${
                      activeTab === 'inventory' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-600 hover:bg-gray-100'
                   }`}
                >
                   <Package className="w-5 h-5" />
                   Inventory
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
                   onClick={() => setActiveTab('settings')}
                   className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${
                      activeTab === 'settings' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-600 hover:bg-gray-100'
                   }`}
                >
                   <Settings className="w-5 h-5" />
                   Settings
                </button>
             </nav>

             <div className="lg:col-span-3 space-y-8">
                {activeTab === 'dashboard' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                       <div className="bg-white p-8 rounded-3xl border shadow-sm">
                          <TrendingUp className="w-8 h-8 text-blue-600 mb-4" />
                          <div className="text-3xl font-extrabold">$2,450</div>
                          <div className="text-gray-500 font-medium">Monthly Revenue</div>
                       </div>
                       <div className="bg-white p-8 rounded-3xl border shadow-sm">
                          <Package className="w-8 h-8 text-blue-600 mb-4" />
                          <div className="text-3xl font-extrabold">{listings.length}</div>
                          <div className="text-gray-500 font-medium">Active Items</div>
                       </div>
                       <div className="bg-white p-8 rounded-3xl border shadow-sm">
                          <Calendar className="w-8 h-8 text-blue-600 mb-4" />
                          <div className="text-3xl font-extrabold">3</div>
                          <div className="text-gray-500 font-medium">Pending Meetings</div>
                       </div>
                    </div>

                    <section className="bg-white rounded-3xl shadow-sm border p-8">
                       <h2 className="text-2xl font-bold mb-8">Recent Inventory</h2>
                       <div className="space-y-4">
                          {listings.map(item => (
                            <div key={item.id} className="flex items-center gap-6 p-6 border rounded-2xl hover:border-blue-500 transition-colors">
                               <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center">
                                  <Package className="w-6 h-6 text-gray-400" />
                               </div>
                               <div className="flex-grow">
                                  <h3 className="text-lg font-bold">{item.name}</h3>
                                  <div className="flex items-center gap-4">
                                     <span className="text-blue-600 font-bold">${item.price}</span>
                                     <span className="text-gray-400 text-sm">{item.description}</span>
                                  </div>
                               </div>
                               <button className="px-4 py-2 text-sm font-bold text-gray-600 hover:text-blue-600 transition-colors">
                                  Edit
                               </button>
                            </div>
                          ))}
                       </div>
                    </section>
                  </>
                )}

                {activeTab === 'inventory' && (
                   <section className="bg-white rounded-3xl shadow-sm border p-8">
                      <div className="flex items-center justify-between mb-8">
                         <h2 className="text-2xl font-bold">Manage Inventory</h2>
                         <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input 
                               type="text" 
                               placeholder="Search inventory..." 
                               className="pl-10 pr-4 py-2 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                         </div>
                      </div>
                      <div className="space-y-4">
                         {listings.map(item => (
                           <div key={item.id} className="flex items-center gap-6 p-6 border rounded-2xl hover:border-blue-500 transition-colors">
                              <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center">
                                 <Package className="w-8 h-8 text-gray-400" />
                              </div>
                              <div className="flex-grow">
                                 <h3 className="text-xl font-bold">{item.name}</h3>
                                 <p className="text-gray-500 mb-2">{item.description}</p>
                                 <div className="flex items-center gap-4">
                                    <span className="text-blue-600 font-bold text-lg">${item.price}</span>
                                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full uppercase tracking-wider">
                                       {item.status}
                                    </span>
                                 </div>
                              </div>
                           </div>
                         ))}
                      </div>
                   </section>
                )}
             </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default VendorDashboard;
