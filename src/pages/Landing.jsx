import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, Users, Calendar, Video, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { SUBSCRIPTION_PACKAGES } from '../data/mockData';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-blue-600" />
    </div>
    <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const Landing = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                Modern Marketplace for <span className="text-blue-600">Smart Trading</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                Connect with verified buyers and sellers. Secure transactions with built-in escrow, integrated logistics, and professional meeting scheduling.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/login" 
                  className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 flex items-center gap-2 group"
                >
                  Get Started Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/items" 
                  className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors"
                >
                  Browse Items
                </Link>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative hidden md:block"
            >
              <div className="bg-blue-600/10 rounded-3xl p-8 transform rotate-3 absolute inset-0 -z-10 blur-2xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800" 
                alt="Marketplace" 
                className="rounded-3xl shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Built for Professional Trade</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">Everything you need to buy and sell with confidence.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={ShieldCheck} 
              title="Secure Escrow" 
              description="Payments are held safely until delivery is confirmed by the buyer or logistics provider."
            />
            <FeatureCard 
              icon={Video} 
              title="Integrated Zoom" 
              description="Discuss discounts and details via professional video calls with built-in timers and alerts."
            />
            <FeatureCard 
              icon={Truck} 
              title="Automated Logistics" 
              description="Real-time delivery rates and automated dispatching to logistics firms via API."
            />
            <FeatureCard 
              icon={Users} 
              title="Verified Vendors" 
              description="Rigorous KYC process ensures all registered vendors are legitimate and trustworthy."
            />
            <FeatureCard 
              icon={Calendar} 
              title="Meeting Scheduler" 
              description="Easily schedule, edit, and join meetings to finalize deals."
            />
            <FeatureCard 
              icon={Clock} 
              title="30-min Alerts" 
              description="Automatic timer and warnings during calls to keep your deals moving efficiently."
            />
          </div>
        </div>
      </section>

      {/* Subscription Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Subscription Plans</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">Subscribe via short code to access our professional features.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {SUBSCRIPTION_PACKAGES.map((pkg) => (
              <div key={pkg.id} className="bg-white border rounded-2xl p-8 shadow-sm hover:border-blue-500 transition-colors group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                   <ArrowRight className="w-24 h-24 -rotate-45" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{pkg.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold">${pkg.price}</span>
                  <span className="text-gray-500 ml-2">/ {pkg.duration}</span>
                </div>
                <ul className="space-y-4 mb-8 text-gray-600">
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-green-500" /> Full Access to Items
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-green-500" /> Schedule Meetings
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-green-500" /> Buyer Protection
                  </li>
                </ul>
                <button className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-colors">
                  Subscribe via SMS
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
