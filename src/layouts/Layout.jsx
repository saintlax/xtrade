import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, User, LogOut, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center gap-2">
              <ShoppingBag className="w-8 h-8" />
              <span>xTrade</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/items" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Browse</Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to={user.role === 'vendor' ? '/vendor-dashboard' : (user.role === 'temp_seller' ? '/seller-dashboard' : '/buyer-dashboard')} 
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={() => { logout(); navigate('/'); }}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Login</Link>
                <Link 
                  to="/register-vendor" 
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Become a Vendor
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t px-4 pt-2 pb-6 space-y-1">
          <Link to="/items" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md">Browse</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md">Dashboard</Link>
              <button 
                onClick={() => { logout(); navigate('/'); }}
                className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-md font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md">Login</Link>
              <Link to="/register-vendor" className="block px-3 py-2 text-blue-600 font-medium hover:bg-blue-50 rounded-md">Become a Vendor</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-gray-900 text-white py-12 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-2">
          <h3 className="text-xl font-bold mb-4">xTrade</h3>
          <p className="text-gray-400 max-w-sm">
            Professional marketplace for buyers and sellers with secure escrow and delivery management.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Features</h4>
          <ul className="space-y-2 text-gray-400">
            <li>Secure Escrow</li>
            <li>Verified Vendors</li>
            <li>Meeting Schedulers</li>
            <li>Logistics Integration</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <ul className="space-y-2 text-gray-400">
            <li>Support: support@xtrade.com</li>
            <li>Phone: +1 (555) 123-4567</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} xTrade Marketplace. All rights reserved.
      </div>
    </div>
  </footer>
);

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};
