import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Phone, User, Key, ArrowRight, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
  const [mode, setMode] = useState('user'); // user, vendor, temp_seller
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (mode === 'user') {
      login({ phone }, 'user');
      navigate('/buyer-dashboard');
    } else if (mode === 'vendor') {
      login({ username, password }, 'vendor');
      navigate('/vendor-dashboard');
    } else if (mode === 'admin') {
      login({}, 'admin');
      navigate('/admin-dashboard');
    } else if (mode === 'temp_seller') {
      login({}, 'temp_seller');
      navigate('/seller-dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
        <div className="text-center">
          <h2 className="mt-6 text-4xl font-extrabold text-gray-900 tracking-tight">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-600">
            Professional trade starts with a secure login.
          </p>
        </div>

        <div className="flex p-1 bg-gray-100 rounded-2xl mb-8">
          <button
            onClick={() => setMode('user')}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
              mode === 'user' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Subscriber
          </button>
          <button
            onClick={() => setMode('vendor')}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
              mode === 'vendor' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Vendor
          </button>
          <button
            onClick={() => setMode('temp_seller')}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
              mode === 'temp_seller' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Walk-in
          </button>
          <button
            onClick={() => setMode('admin')}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
              mode === 'admin' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Admin
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.form
            key={mode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-8 space-y-6"
            onSubmit={handleLogin}
          >
            {mode === 'user' && (
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="appearance-none rounded-xl relative block w-full px-12 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter Phone Number"
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ShieldCheck className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="appearance-none rounded-xl relative block w-full px-12 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter OTP (Sent via SMS)"
                  />
                </div>
                <p className="text-xs text-gray-500 text-center italic">
                  Note: Upon launch of the URL link, system will validate MSISDN.
                </p>
              </div>
            )}

            {mode === 'vendor' && (
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="appearance-none rounded-xl relative block w-full px-12 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Username"
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none rounded-xl relative block w-full px-12 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Password"
                  />
                </div>
              </div>
            )}

            {mode === 'admin' && (
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    required
                    className="appearance-none rounded-xl relative block w-full px-12 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Admin Username"
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    required
                    className="appearance-none rounded-xl relative block w-full px-12 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Admin Password"
                  />
                </div>
              </div>
            )}

            {mode === 'temp_seller' && (
              <div className="p-6 bg-blue-50 rounded-2xl text-blue-800 space-y-4">
                <div className="flex gap-3">
                  <UserPlus className="w-6 h-6 flex-shrink-0" />
                  <p className="text-sm font-medium">
                    You can create a walk-in (temporary) account to sell particular items. No registration required.
                  </p>
                </div>
                <ul className="text-xs space-y-2 list-disc list-inside opacity-80">
                   <li>State item pickup address and cost price</li>
                   <li>State bank account details (admin only)</li>
                   <li>Two optional hours available for discussion</li>
                </ul>
              </div>
            )}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-lg font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-lg shadow-blue-200"
              >
                {mode === 'temp_seller' ? 'Create Temporary Account' : 'Sign In'}
                <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.form>
        </AnimatePresence>

        {mode === 'vendor' && (
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Not a vendor yet?{' '}
              <Link to="/register-vendor" className="font-bold text-blue-600 hover:text-blue-500 transition-colors">
                Apply for Registration
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
