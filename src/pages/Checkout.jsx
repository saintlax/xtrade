import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '../layouts/Layout';
import { ITEMS } from '../data/mockData';
import { 
  Truck, ShieldCheck, CreditCard, MapPin, 
  Info, CheckCircle2, Loader2, ArrowRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = ITEMS.find(i => i.id === id) || ITEMS[0];
  
  const [step, setStep] = useState('details'); // details, payment, processing, success
  const [deliveryFee, setDeliveryFee] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [address, setAddress] = useState('');

  const calculateDelivery = () => {
    setIsCalculating(true);
    // Simulate API call to logistics firm
    setTimeout(() => {
      setDeliveryFee(15000);
      setIsCalculating(false);
      setStep('payment');
    }, 1500);
  };

  const handlePayment = () => {
    setStep('processing');
    // Simulate payment processing and escrow hold
    setTimeout(() => {
      setStep('success');
    }, 2500);
  };

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
             <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                   step === 'details' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-green-500 text-white'
                }`}>
                   {step === 'details' ? '1' : <CheckCircle2 className="w-6 h-6" />}
                </div>
                <div className="h-0.5 w-16 bg-gray-200"></div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                   step === 'payment' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : (['processing', 'success'].includes(step) ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500')
                }`}>
                   {['details', 'payment'].includes(step) ? '2' : <CheckCircle2 className="w-6 h-6" />}
                </div>
                <div className="h-0.5 w-16 bg-gray-200"></div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                   step === 'success' ? 'bg-green-500 text-white shadow-lg shadow-green-200' : 'bg-gray-200 text-gray-500'
                }`}>
                   3
                </div>
             </div>
             <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Secure Checkout</h1>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
             <div className="md:col-span-2 space-y-6">
                <AnimatePresence mode="wait">
                   {step === 'details' && (
                      <motion.div 
                         key="details"
                         initial={{ opacity: 0, x: -20 }}
                         animate={{ opacity: 1, x: 0 }}
                         exit={{ opacity: 0, x: 20 }}
                         className="bg-white rounded-3xl p-8 border shadow-sm"
                      >
                         <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-blue-600" />
                            Delivery Address
                         </h2>
                         <div className="space-y-4">
                            <textarea 
                               className="w-full p-4 rounded-2xl border bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                               rows="3"
                               placeholder="Enter your full delivery address..."
                               value={address}
                               onChange={(e) => setAddress(e.target.value)}
                            />
                            <div className="p-4 bg-blue-50 rounded-2xl flex gap-3 text-blue-800 text-sm">
                               <Info className="w-5 h-5 flex-shrink-0" />
                               <p>We'll calculate the delivery amount from the logistics firm via API based on your source and destination.</p>
                            </div>
                            <button 
                               onClick={calculateDelivery}
                               disabled={!address || isCalculating}
                               className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                               {isCalculating ? (
                                  <>
                                     <Loader2 className="w-5 h-5 animate-spin" />
                                     Calculating Rates...
                                  </>
                               ) : (
                                  <>
                                     Calculate Delivery
                                     <ArrowRight className="w-5 h-5" />
                                  </>
                               )}
                            </button>
                         </div>
                      </motion.div>
                   )}

                   {step === 'payment' && (
                      <motion.div 
                         key="payment"
                         initial={{ opacity: 0, x: -20 }}
                         animate={{ opacity: 1, x: 0 }}
                         exit={{ opacity: 0, x: 20 }}
                         className="bg-white rounded-3xl p-8 border shadow-sm"
                      >
                         <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-blue-600" />
                            Payment Method
                         </h2>
                         <div className="space-y-6">
                            <div className="p-6 border-2 border-blue-600 rounded-2xl bg-blue-50 flex items-center justify-between">
                               <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                     <CreditCard className="w-6 h-6 text-blue-600" />
                                  </div>
                                  <div>
                                     <div className="font-bold">Credit / Debit Card</div>
                                     <div className="text-sm text-blue-600">Secure Payment</div>
                                  </div>
                               </div>
                               <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                                  <div className="w-2 h-2 bg-white rounded-full"></div>
                               </div>
                            </div>

                            <div className="p-4 bg-yellow-50 rounded-2xl flex gap-3 text-yellow-800 text-sm border border-yellow-100">
                               <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                               <p><strong>Escrow Protection:</strong> System holds your payment until delivery is confirmed. Only then is it transferred to the vendor.</p>
                            </div>

                            <button 
                               onClick={handlePayment}
                               className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                            >
                               Complete Payment & Secure Funds
                            </button>
                         </div>
                      </motion.div>
                   )}

                   {step === 'processing' && (
                      <div className="bg-white rounded-3xl p-12 border shadow-sm text-center space-y-6">
                         <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto" />
                         <h2 className="text-2xl font-bold">Processing Transaction</h2>
                         <p className="text-gray-500">Securing your funds in escrow and informing the logistics company...</p>
                      </div>
                   )}

                   {step === 'success' && (
                      <motion.div 
                         initial={{ scale: 0.9, opacity: 0 }}
                         animate={{ scale: 1, opacity: 1 }}
                         className="bg-white rounded-3xl p-12 border shadow-sm text-center space-y-6"
                      >
                         <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-12 h-12" />
                         </div>
                         <h2 className="text-3xl font-black">Payment Secured!</h2>
                         <p className="text-gray-600 text-lg">
                            Your payment is now held in escrow. We've informed the logistics company and the seller is preparing your item.
                         </p>
                         <div className="pt-8">
                            <button 
                               onClick={() => navigate('/buyer-dashboard')}
                               className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all"
                            >
                               Go to Dashboard
                            </button>
                         </div>
                      </motion.div>
                   )}
                </AnimatePresence>
             </div>

             <div className="space-y-6">
                <div className="bg-white rounded-3xl p-8 border shadow-sm">
                   <h3 className="font-bold mb-6 text-gray-900">Order Summary</h3>
                   <div className="space-y-4">
                      <div className="flex justify-between text-gray-600">
                         <span>{item.name}</span>
                         <span className="font-bold">₦{Number(item.price).toLocaleString()}</span>
                      </div>
                      {deliveryFee && (
                         <div className="flex justify-between text-gray-600">
                            <span>Delivery Fee</span>
                            <span className="font-bold">₦{Number(deliveryFee).toLocaleString()}</span>
                         </div>
                      )}
                      <div className="border-t pt-4 flex justify-between text-xl font-black text-blue-600">
                         <span>Total</span>
                         <span>₦{(Number(item.price) + Number(deliveryFee || 0)).toLocaleString()}</span>
                      </div>
                   </div>
                </div>

                <div className="bg-blue-600 text-white rounded-3xl p-8 shadow-lg shadow-blue-100">
                   <Truck className="w-8 h-8 mb-4" />
                   <h3 className="font-bold mb-2">Logistics Update</h3>
                   <p className="text-blue-100 text-sm opacity-90 leading-relaxed">
                      Once payment is confirmed, we'll automatically notify our logistics partner with the item details for pickup.
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
