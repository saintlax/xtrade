import React, { useState, useEffect, useRef } from 'react';
import { Camera, MapPin, DollarSign, Clock, CreditCard, Eye, Send, X, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ItemForm = ({ onSubmit, initialData = null, isTemp = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    pickupAddress: '',
    bankDetails: '',
    discussionHours: ['', ''],
    images: [], // This will store blob URLs for preview
  });
  const [previewMode, setPreviewMode] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        discussionHours: initialData.discussionHours || ['', ''],
        images: initialData.images || [],
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleHourChange = (index, value) => {
    const newHours = [...formData.discussionHours];
    newHours[index] = value;
    setFormData(prev => ({ ...prev, discussionHours: newHours }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    onSubmit(formData);
  };

  if (previewMode) {
    return (
      <div className="bg-white rounded-3xl shadow-sm border p-8 space-y-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Preview Listing</h2>
            <p className="text-gray-500">This is how your item will appear to buyers.</p>
          </div>
          <button 
            onClick={() => setPreviewMode(false)}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all"
          >
            Edit Details
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-[2.5rem] overflow-hidden border-2 border-dashed border-gray-200 flex items-center justify-center relative">
              {formData.images.length > 0 ? (
                <img 
                  src={formData.images[0]} 
                  alt="Primary Preview" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center">
                  <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-2" />
                  <span className="text-gray-400 font-bold">No Image Uploaded</span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-4 gap-4">
              {formData.images.slice(1).map((img, idx) => (
                <div key={idx} className="aspect-square bg-gray-100 rounded-2xl overflow-hidden border border-gray-200">
                  <img src={img} alt={`Preview ${idx + 2}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-4xl font-black text-gray-900 mb-2">{formData.name || 'Unnamed Item'}</h3>
              <div className="text-3xl font-black text-blue-600">₦{Number(formData.price).toLocaleString()}</div>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-3xl space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Description</h4>
              <p className="text-gray-600 leading-relaxed">{formData.description || 'No description provided.'}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-2xl flex items-center gap-3">
                <MapPin className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="text-[10px] font-black uppercase text-gray-400">Pickup</div>
                  <div className="text-sm font-bold truncate">{formData.pickupAddress || 'Not set'}</div>
                </div>
              </div>
              <div className="p-4 border rounded-2xl flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="text-[10px] font-black uppercase text-gray-400">Discussion</div>
                  <div className="text-sm font-bold truncate">{formData.discussionHours.filter(h => h).join(', ') || 'Anytime'}</div>
                </div>
              </div>
            </div>

            {isTemp && (
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3 items-center">
                <CreditCard className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="text-[10px] font-black uppercase text-blue-400">Sensitive Data (Admin Only)</div>
                  <div className="text-sm font-bold text-blue-900">{formData.bankDetails || 'Bank details not set'}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="pt-8 border-t">
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-5 rounded-[1.5rem] font-black text-xl flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-xl shadow-blue-100"
          >
            <Send className="w-6 h-6" />
            {initialData ? 'Update Listing' : 'Confirm & Publish Listing'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setPreviewMode(true); }} className="space-y-8">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left Column: Media */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-black uppercase tracking-widest text-gray-400 mb-4">Item Images</label>
            <div className="grid grid-cols-2 gap-4">
              <AnimatePresence>
                {formData.images.map((img, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative aspect-square rounded-3xl overflow-hidden group border shadow-sm"
                  >
                    <img src={img} alt={`Upload ${index}`} className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {formData.images.length < 4 && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 hover:border-blue-500 hover:bg-blue-50/50 transition-all group"
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <Plus className="w-6 h-6 text-gray-400 group-hover:text-blue-600" />
                  </div>
                  <span className="text-xs font-bold text-gray-400 group-hover:text-blue-600 uppercase tracking-widest">Add Image</span>
                </button>
              )}
            </div>
            <input 
              type="file" 
              multiple 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleImageUpload}
            />
            <p className="text-xs text-gray-400 mt-4">Upload up to 4 high-quality photos of your item.</p>
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-black uppercase tracking-widest text-gray-400 mb-2">Item Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-2xl border bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold text-lg"
                placeholder="e.g. iPhone 13 Pro"
              />
            </div>
            <div>
              <label className="block text-sm font-black uppercase tracking-widest text-gray-400 mb-2">Description</label>
              <textarea
                name="description"
                required
                rows="4"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-2xl border bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500 transition-all leading-relaxed"
                placeholder="Describe condition, features, age, etc."
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-black uppercase tracking-widest text-gray-400 mb-2">Cost Price (₦)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-gray-400 text-lg">₦</span>
                <input
                  type="number"
                  name="price"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full pl-10 pr-6 py-4 rounded-2xl border bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-black text-lg"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-black uppercase tracking-widest text-gray-400 mb-2">Pickup Address</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="pickupAddress"
                  required
                  value={formData.pickupAddress}
                  onChange={handleChange}
                  className="w-full pl-12 pr-6 py-4 rounded-2xl border bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold"
                  placeholder="Street, City"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-black uppercase tracking-widest text-gray-400 mb-2">Bank Details (Admin Only)</label>
            <div className="relative">
              <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="bankDetails"
                required
                value={formData.bankDetails}
                onChange={handleChange}
                className="w-full pl-12 pr-6 py-4 rounded-2xl border bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold"
                placeholder="Bank Name, Account Number"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-black uppercase tracking-widest text-gray-400 mb-2">Optional Discussion Hours</label>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="time"
                  value={formData.discussionHours[0]}
                  onChange={(e) => handleHourChange(0, e.target.value)}
                  className="w-full pl-10 pr-4 py-4 rounded-2xl border bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold"
                />
              </div>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="time"
                  value={formData.discussionHours[1]}
                  onChange={(e) => handleHourChange(1, e.target.value)}
                  className="w-full pl-10 pr-4 py-4 rounded-2xl border bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t flex gap-4">
        <button
          type="submit"
          className="flex-1 bg-gray-900 text-white py-5 rounded-[1.5rem] font-black text-xl flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl shadow-gray-200"
        >
          <Eye className="w-6 h-6" />
          Preview & Submit
        </button>
      </div>
    </form>
  );
};

export default ItemForm;
