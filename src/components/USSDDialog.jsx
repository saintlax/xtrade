import React from 'react';
import { X, Phone, CheckCircle2, Copy, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const USSDDialog = ({ isOpen, onClose, pkg }) => {
  if (!isOpen || !pkg) return null;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('USSD code copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden border border-gray-100"
      >
        <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white">
              <Phone className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-black text-gray-900 tracking-tight">USSD Subscription</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-xl transition-colors text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 space-y-8">
          <div className="text-center">
            <p className="text-gray-500 font-medium mb-2">You selected the</p>
            <div className="text-3xl font-black text-gray-900 mb-1">{pkg.name} Package</div>
            <div className="text-2xl font-black text-blue-600">₦{pkg.price.toLocaleString()}</div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-900 rounded-[2rem] p-8 text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Phone className="w-24 h-24 -rotate-12" />
              </div>
              <div className="text-gray-400 text-xs font-black uppercase tracking-widest mb-3">Dial this code on your phone</div>
              <div className="text-4xl font-black text-white tracking-tighter mb-6 font-mono">
                {pkg.ussd}
              </div>
              <button 
                onClick={() => copyToClipboard(pkg.ussd)}
                className="flex items-center gap-2 mx-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-bold transition-all border border-white/10"
              >
                <Copy className="w-4 h-4" />
                Copy Code
              </button>
            </div>

            <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex gap-4">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-sm text-blue-900 leading-relaxed font-medium">
                After dialing, you will receive an SMS confirmation once your subscription is active.
              </div>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-full py-5 bg-gray-900 text-white rounded-[1.5rem] font-black hover:bg-black transition-all shadow-xl shadow-gray-200"
          >
            I've Dialed the Code
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default USSDDialog;
