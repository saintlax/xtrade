import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '../layouts/Layout';
import { useAuth } from '../context/AuthContext';
import { 
  Video, Mic, MicOff, VideoOff, PhoneOff, 
  MessageSquare, Users, Settings, Clock, AlertTriangle, DollarSign, Save, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MeetingRoom = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(1800 + 300); // 35 minutes in seconds (30 min + 5 min warning)
  const [showWarning, setShowWarning] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [price, setPrice] = useState(850);
  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [newPrice, setNewPrice] = useState(850);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 300 && !showWarning) {
           setShowWarning(true);
        }
        if (prev <= 0) {
           clearInterval(timer);
           alert("The call has ended.");
           navigate(-1);
           return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showWarning, navigate]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleUpdatePrice = () => {
    setPrice(newPrice);
    setIsEditingPrice(false);
    alert("Price updated successfully after agreement!");
  };

  return (
    <div className="bg-gray-950 min-h-screen text-white">
      <div className="max-w-7xl mx-auto h-screen flex flex-col p-4 md:p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
           <div className="flex items-center gap-4">
              <div className="bg-red-600 px-3 py-1 rounded-lg flex items-center gap-2 text-sm font-bold animate-pulse">
                 <div className="w-2 h-2 bg-white rounded-full"></div>
                 LIVE
              </div>
              <h1 className="text-xl font-bold">Negotiation: iPhone 13 Pro</h1>
           </div>
           <div className={`flex items-center gap-3 px-4 py-2 rounded-xl border transition-colors ${
              showWarning ? 'bg-red-900/50 border-red-500 text-red-200' : 'bg-gray-900 border-gray-800 text-gray-400'
           }`}>
              <Clock className={`w-5 h-5 ${showWarning ? 'animate-bounce' : ''}`} />
              <span className="font-mono text-lg font-bold">{formatTime(timeLeft)}</span>
           </div>
        </header>

        {/* Main View */}
        <div className="flex-grow grid md:grid-cols-2 gap-8 mb-8">
           <div className="relative bg-gray-900 rounded-3xl overflow-hidden border border-gray-800 shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center">
                 {isVideoOn ? (
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" 
                      alt="Seller" 
                      className="w-full h-full object-cover opacity-50"
                    />
                 ) : (
                    <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center text-4xl font-bold">
                       S
                    </div>
                 )}
              </div>
              <div className="absolute bottom-6 left-6 flex items-center gap-3">
                 <span className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
                    {user?.role === 'vendor' || user?.role === 'temp_seller' ? 'You (Seller)' : 'Seller (Tech Hub)'}
                    {!isMicOn && <MicOff className="w-4 h-4 text-red-500" />}
                 </span>
              </div>
           </div>

           <div className="relative bg-gray-900 rounded-3xl overflow-hidden border border-gray-800 shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center text-4xl font-bold">
                    B
                 </div>
              </div>
              <div className="absolute bottom-6 left-6 flex items-center gap-3">
                 <span className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
                    {user?.role === 'buyer' ? 'You (Buyer)' : 'Buyer (John Doe)'}
                 </span>
              </div>
           </div>
        </div>

        {/* Price/Negotiation Panel */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 mb-8">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                 <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center">
                    <DollarSign className="w-8 h-8 text-blue-500" />
                 </div>
                 <div>
                    <div className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">Agreed Price</div>
                    <div className="text-4xl font-black text-white">${price}</div>
                 </div>
              </div>
              
              {(user?.role === 'vendor' || user?.role === 'temp_seller') && (
                 <div className="flex gap-4">
                    {isEditingPrice ? (
                       <div className="flex items-center gap-4 bg-gray-800 p-2 rounded-2xl border border-gray-700">
                          <input 
                             type="number" 
                             value={newPrice}
                             onChange={(e) => setNewPrice(e.target.value)}
                             className="bg-transparent border-none outline-none px-4 text-xl font-bold w-32"
                             placeholder="New Price"
                          />
                          <button 
                             onClick={handleUpdatePrice}
                             className="p-3 bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors"
                          >
                             <Save className="w-5 h-5" />
                          </button>
                          <button 
                             onClick={() => setIsEditingPrice(false)}
                             className="p-3 bg-gray-700 rounded-xl hover:bg-gray-600 transition-colors"
                          >
                             <X className="w-5 h-5" />
                          </button>
                       </div>
                    ) : (
                       <button 
                          onClick={() => setIsEditingPrice(true)}
                          className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2"
                       >
                          Edit Agreed Price
                       </button>
                    )}
                 </div>
              )}
           </div>
        </div>

        {/* Controls */}
        <footer className="flex justify-center items-center gap-6 pb-4">
           <button 
              onClick={() => setIsMicOn(!isMicOn)}
              className={`p-5 rounded-2xl transition-all ${isMicOn ? 'bg-gray-800 hover:bg-gray-700' : 'bg-red-600 hover:bg-red-700'}`}
           >
              {isMicOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
           </button>
           <button 
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`p-5 rounded-2xl transition-all ${isVideoOn ? 'bg-gray-800 hover:bg-gray-700' : 'bg-red-600 hover:bg-red-700'}`}
           >
              {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
           </button>
           <button className="p-5 bg-gray-800 hover:bg-gray-700 rounded-2xl transition-all">
              <MessageSquare className="w-6 h-6" />
           </button>
           <button className="p-5 bg-gray-800 hover:bg-gray-700 rounded-2xl transition-all">
              <Users className="w-6 h-6" />
           </button>
           <button 
              onClick={() => navigate(-1)}
              className="p-5 bg-red-600 hover:bg-red-700 rounded-2xl transition-all shadow-lg shadow-red-500/20 ml-8"
           >
              <PhoneOff className="w-6 h-6" />
           </button>
        </footer>
      </div>

      {/* Warning Alert */}
      <AnimatePresence>
         {showWarning && (
            <motion.div 
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: 50 }}
               className="fixed bottom-32 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4"
            >
               <div className="bg-red-600 text-white p-6 rounded-3xl shadow-2xl flex items-center gap-4 border-4 border-red-500">
                  <div className="bg-white/20 p-3 rounded-2xl">
                     <AlertTriangle className="w-8 h-8" />
                  </div>
                  <div>
                     <h4 className="text-xl font-black uppercase tracking-tighter">Time Warning</h4>
                     <p className="text-red-100 font-bold">This call will end in 5 minutes.</p>
                  </div>
                  <button onClick={() => setShowWarning(false)} className="ml-auto p-2 hover:bg-white/10 rounded-xl">
                     <X className="w-6 h-6" />
                  </button>
               </div>
            </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
};

export default MeetingRoom;
