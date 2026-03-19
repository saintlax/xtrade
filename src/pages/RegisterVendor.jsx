import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../layouts/Layout';
import { 
  User, Lock, Mail, Phone, Briefcase, MapPin, 
  CreditCard, CheckCircle2, ArrowRight, ArrowLeft, ShieldCheck, Loader2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RegisterVendor = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: '',
    email: '',
    phone: '',
    businessName: '',
    businessAddress: '',
    businessCategory: 'Electronics',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API call and payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep(5); // Success step
    }, 2000);
  };

  const steps = [
    { id: 1, title: 'Credentials', icon: Lock },
    { id: 2, title: 'Personal', icon: User },
    { id: 3, title: 'Business', icon: Briefcase },
    { id: 4, title: 'Setup Fee', icon: CreditCard },
  ];

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Progress Bar */}
          {step < 5 && (
            <div className="mb-12">
              <div className="flex items-center justify-between relative">
                {steps.map((s, idx) => (
                  <React.Fragment key={s.id}>
                    <div className="flex flex-col items-center z-10">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold transition-all shadow-sm ${
                        step >= s.id ? 'bg-blue-600 text-white shadow-blue-200' : 'bg-white text-gray-400 border'
                      }`}>
                        <s.icon className="w-5 h-5" />
                      </div>
                      <span className={`text-xs font-bold mt-2 uppercase tracking-wider ${
                        step >= s.id ? 'text-blue-600' : 'text-gray-400'
                      }`}>
                        {s.title}
                      </span>
                    </div>
                    {idx < steps.length - 1 && (
                      <div className="flex-grow h-0.5 mx-4 bg-gray-200 relative -top-4">
                        <motion.div 
                          className="absolute inset-0 bg-blue-600"
                          initial={{ width: '0%' }}
                          animate={{ width: step > s.id ? '100%' : '0%' }}
                        />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12"
            >
              {step === 1 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-black text-gray-900">Create Your Account</h2>
                    <p className="text-gray-500 mt-2">Start your journey as a verified vendor on xTrade.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="username"
                        placeholder="Choose Username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        name="password"
                        placeholder="Create Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>
                  </div>
                  <button 
                    onClick={handleNext}
                    disabled={!formData.username || !formData.password}
                    className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg shadow-blue-100"
                  >
                    Continue to Personal Details
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-black text-gray-900">Personal Information</h2>
                    <p className="text-gray-500 mt-2">We need some basic info to verify your identity.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={handleBack} className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-all">
                      <ArrowLeft className="w-5 h-5" />
                      Back
                    </button>
                    <button 
                      onClick={handleNext}
                      disabled={!formData.fullName || !formData.email || !formData.phone}
                      className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg shadow-blue-100"
                    >
                      Business Details
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-black text-gray-900">Business Details</h2>
                    <p className="text-gray-500 mt-2">Tell us about the items you plan to sell.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="relative">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="businessName"
                        placeholder="Business Name"
                        value={formData.businessName}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="businessAddress"
                        placeholder="Business Address"
                        value={formData.businessAddress}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>
                    <div className="relative">
                      <select
                        name="businessCategory"
                        value={formData.businessCategory}
                        onChange={handleChange}
                        className="w-full px-4 py-4 rounded-2xl border bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none"
                      >
                        <option>Electronics</option>
                        <option>Audio</option>
                        <option>Fashion</option>
                        <option>Home & Living</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={handleBack} className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-all">
                      <ArrowLeft className="w-5 h-5" />
                      Back
                    </button>
                    <button 
                      onClick={handleNext}
                      disabled={!formData.businessName || !formData.businessAddress}
                      className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg shadow-blue-100"
                    >
                      Final Step: Setup Fee
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-8">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-3xl flex items-center justify-center text-blue-600 mx-auto mb-6">
                      <CreditCard className="w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900">One-time Setup Fee</h2>
                    <p className="text-gray-500 mt-2">A small fee applies to setup your professional vendor account.</p>
                  </div>

                  <div className="bg-blue-50 rounded-3xl p-8 border border-blue-100">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-blue-800 font-bold">Registration Package</span>
                      <span className="text-2xl font-black text-blue-600">₦25,000</span>
                    </div>
                    <ul className="space-y-2 text-sm text-blue-700">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Verified Vendor Badge</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Unlimited Item Uploads</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Professional Dashboard</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 border rounded-2xl bg-gray-50 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <CreditCard className="w-6 h-6 text-gray-400" />
                        <span className="font-bold text-gray-700">Pay with Card</span>
                      </div>
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button onClick={handleBack} className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-2xl font-bold hover:bg-gray-200 transition-all">
                      Back
                    </button>
                    <button 
                      onClick={handleFinalSubmit}
                      disabled={isProcessing}
                      className="flex-[2] py-4 bg-gray-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all shadow-lg shadow-gray-200"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Pay ₦25,000 & Register
                          <ShieldCheck className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="text-center space-y-8 py-12">
                  <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-100">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <div>
                    <h2 className="text-4xl font-black text-gray-900">Registration Complete!</h2>
                    <p className="text-xl text-gray-600 mt-4 leading-relaxed max-w-md mx-auto">
                      Welcome to the xTrade community, <strong>{formData.businessName}</strong>! Your account is now being reviewed for KYC.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-3xl border text-left max-w-sm mx-auto">
                    <h4 className="font-bold mb-4 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-blue-600" />
                      Next Steps:
                    </h4>
                    <ul className="space-y-3 text-sm text-gray-600">
                      <li>• Log in with your new credentials</li>
                      <li>• Upload your first batch of items</li>
                      <li>• Complete KYC verification in dashboard</li>
                    </ul>
                  </div>
                  <button 
                    onClick={() => navigate('/login')}
                    className="px-12 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                  >
                    Go to Login
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterVendor;
