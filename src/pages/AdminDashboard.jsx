import React, { useState } from 'react';
import { Layout } from '../layouts/Layout';
import { useAuth } from '../context/AuthContext';
import { 
  Users, ShieldCheck, Package, DollarSign, 
  CheckCircle2, XCircle, Eye, Search, Filter, 
  UserPlus, CreditCard, LayoutDashboard, Settings, MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { VENDORS, ESCROW_TRANSACTIONS, ITEMS } from '../data/mockData';
import Pagination from '../components/Pagination';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter items that belong to temporary sellers (id starting with 'temp_')
  const walkInListings = ITEMS.filter(item => item.sellerId.startsWith('temp_'));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  const currentVendors = VENDORS.slice(indexOfFirstItem, indexOfLastItem);
  const currentWalkIns = walkInListings.slice(indexOfFirstItem, indexOfLastItem);
  const currentEscrows = ESCROW_TRANSACTIONS.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">System Administration</h1>
            <p className="text-gray-500 mt-2 text-lg">Manage vendors, verify KYC, and monitor escrow transactions.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <div className="font-bold text-gray-900">{user.name}</div>
              <div className="text-sm text-blue-600 font-medium uppercase tracking-wider">System Admin</div>
            </div>
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
               <ShieldCheck className="w-6 h-6" />
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Admin Sidebar */}
          <nav className="lg:col-span-1 space-y-2">
            <button 
              onClick={() => handleTabChange('overview')}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${
                activeTab === 'overview' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              Overview
            </button>
            <button 
              onClick={() => handleTabChange('vendors')}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${
                activeTab === 'vendors' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Users className="w-5 h-5" />
              Registered Vendors
            </button>
            <button 
              onClick={() => handleTabChange('walk-ins')}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${
                activeTab === 'walk-ins' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <UserPlus className="w-5 h-5" />
              Walk-in Listings
            </button>
            <button 
              onClick={() => handleTabChange('escrow')}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${
                activeTab === 'escrow' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <CreditCard className="w-5 h-5" />
              Escrow Monitoring
            </button>
          </nav>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-8">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-3xl border shadow-sm">
                  <Users className="w-8 h-8 text-blue-600 mb-4" />
                  <div className="text-3xl font-extrabold">{VENDORS.length}</div>
                  <div className="text-gray-500 font-medium">Total Vendors</div>
                </div>
                <div className="bg-white p-8 rounded-3xl border shadow-sm">
                  <UserPlus className="w-8 h-8 text-blue-600 mb-4" />
                  <div className="text-3xl font-extrabold">{walkInListings.length}</div>
                  <div className="text-gray-500 font-medium">Walk-in Sellers</div>
                </div>
                <div className="bg-white p-8 rounded-3xl border shadow-sm">
                  <CreditCard className="w-8 h-8 text-blue-600 mb-4" />
                  <div className="text-3xl font-extrabold">₦{ESCROW_TRANSACTIONS.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}</div>
                  <div className="text-gray-500 font-medium">In Escrow</div>
                </div>
              </div>
            )}

            {activeTab === 'vendors' && (
              <section className="bg-white rounded-3xl shadow-sm border overflow-hidden">
                <div className="p-8 border-b flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Vendor Management</h2>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="text" placeholder="Search vendors..." className="pl-10 pr-4 py-2 bg-gray-50 border rounded-xl outline-none" />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Business Name</th>
                        <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">KYC Status</th>
                        <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Join Date</th>
                        <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {currentVendors.map(vendor => (
                        <tr key={vendor.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-8 py-6">
                            <div className="font-bold text-gray-900">{vendor.businessName}</div>
                            <div className="text-sm text-gray-500">{vendor.email}</div>
                          </td>
                          <td className="px-8 py-6">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                              vendor.kycStatus === 'approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {vendor.kycStatus}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-gray-600">{vendor.joinDate}</td>
                          <td className="px-8 py-6 text-right">
                            <button 
                              onClick={() => { setSelectedVendor(vendor); setShowVendorModal(true); }}
                              className="p-2 text-gray-400 hover:text-blue-600"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-4 border-t">
                  <Pagination 
                    currentPage={currentPage}
                    totalItems={VENDORS.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                  />
                </div>
              </section>
            )}

            {activeTab === 'walk-ins' && (
              <section className="bg-white rounded-3xl shadow-sm border p-8">
                <div className="mb-8">
                   <h2 className="text-2xl font-bold mb-2">Walk-in Listings</h2>
                   <p className="text-gray-500">Review temporary listings and sensitive seller details.</p>
                </div>
                <div className="space-y-6">
                   {currentWalkIns.map(listing => (
                     <div key={listing.id} className="p-6 border rounded-2xl bg-gray-50/50 space-y-6">
                        <div className="flex justify-between items-start">
                           <div className="flex items-center gap-4">
                              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center border shadow-sm">
                                 <Package className="w-8 h-8 text-blue-600" />
                              </div>
                              <div>
                                 <h3 className="text-lg font-bold">{listing.name}</h3>
                                 <p className="text-blue-600 font-bold">₦{Number(listing.price).toLocaleString()}</p>
                              </div>
                           </div>
                           <div className="bg-blue-600/10 text-blue-700 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest">
                              Walk-in Account
                           </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 pt-4 border-t">
                           <div className="space-y-3">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Public Details</h4>
                              <div className="flex items-center gap-2 text-sm text-gray-700">
                                 <MapPin className="w-4 h-4 text-gray-400" />
                                 {listing.pickupAddress}
                              </div>
                           </div>
                           <div className="space-y-3 bg-blue-50 p-4 rounded-xl border border-blue-100">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600">Sensitive Bank Details (Admin Only)</h4>
                              <div className="flex items-center gap-2 text-sm text-blue-900 font-bold">
                                 <CreditCard className="w-4 h-4" />
                                 Bank: Main Street Bank
                              </div>
                              <div className="text-sm text-blue-900 font-mono">
                                 ACC: 1234567890
                              </div>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
                <Pagination 
                  currentPage={currentPage}
                  totalItems={walkInListings.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                />
              </section>
            )}

            {activeTab === 'escrow' && (
               <section className="bg-white rounded-3xl shadow-sm border p-8">
                  <h2 className="text-2xl font-bold mb-8">Escrow Monitoring</h2>
                  <div className="space-y-4">
                     {currentEscrows.map(tx => (
                        <div key={tx.id} className="p-6 border rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
                           <div className="flex items-center gap-6">
                              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center border border-green-100 font-black text-xl">
                                 ₦
                              </div>
                              <div>
                                 <div className="font-bold">Order #{tx.id}</div>
                                 <div className="text-sm text-gray-500">Amount: <span className="font-bold text-gray-900">₦{(tx.amount + tx.deliveryFee).toLocaleString()}</span></div>
                              </div>
                           </div>
                           <div className="flex items-center gap-6">
                              <div className="text-right">
                                 <div className="text-sm font-bold text-gray-900">Held in Escrow</div>
                                 <div className="text-xs text-gray-500">{new Date(tx.timestamp).toLocaleString()}</div>
                              </div>
                              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-black rounded-full uppercase">
                                 {tx.status}
                              </span>
                           </div>
                        </div>
                     ))}
                  </div>
                  <Pagination 
                    currentPage={currentPage}
                    totalItems={ESCROW_TRANSACTIONS.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                  />
               </section>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
