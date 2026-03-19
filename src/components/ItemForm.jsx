import React, { useState } from 'react';
import { Camera, MapPin, DollarSign, Clock, CreditCard, Eye, Send } from 'lucide-react';

const ItemForm = ({ onSubmit, isTemp = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    pickupAddress: '',
    bankDetails: '',
    discussionHours: ['', ''],
    images: [],
  });
  const [previewMode, setPreviewMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleHourChange = (index, value) => {
    const newHours = [...formData.discussionHours];
    newHours[index] = value;
    setFormData(prev => ({ ...prev, discussionHours: newHours }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (previewMode) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border p-8 space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Preview Listing</h2>
          <button 
            onClick={() => setPreviewMode(false)}
            className="text-blue-600 font-medium hover:underline"
          >
            Back to Edit
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
            <Camera className="w-12 h-12 text-gray-400" />
            <span className="ml-2 text-gray-500">Image Preview</span>
          </div>
          <div className="space-y-4">
            <h3 className="text-3xl font-bold text-gray-900">{formData.name || 'Item Name'}</h3>
            <p className="text-gray-600">{formData.description || 'Item description will appear here...'}</p>
            <div className="flex items-center gap-2 text-2xl font-bold text-blue-600">
              <DollarSign className="w-6 h-6" />
              {formData.price || '0.00'}
            </div>
            <div className="space-y-2 pt-4 border-t">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5" />
                <span>{formData.pickupAddress || 'Pickup Address'}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <span>Discussion: {formData.discussionHours.filter(h => h).join(', ') || 'Not set'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex gap-4">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all"
          >
            <Send className="w-5 h-5" />
            Submit Listing
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setPreviewMode(true); }} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Item Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="e.g. iPhone 13 Pro"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              required
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="Describe the condition, features, etc."
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Cost Price ($)</label>
              <input
                type="number"
                name="price"
                required
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Pickup Address</label>
              <input
                type="text"
                name="pickupAddress"
                required
                value={formData.pickupAddress}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="Street, City"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Bank Details (Admin Only)</label>
            <input
              type="text"
              name="bankDetails"
              required
              value={formData.bankDetails}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="Bank Name, Account Number"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Optional Discussion Hours</label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="time"
                value={formData.discussionHours[0]}
                onChange={(e) => handleHourChange(0, e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
              <input
                type="time"
                value={formData.discussionHours[1]}
                onChange={(e) => handleHourChange(1, e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 flex gap-4">
        <button
          type="submit"
          className="flex-1 bg-gray-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all"
        >
          <Eye className="w-5 h-5" />
          Preview Listing
        </button>
      </div>
    </form>
  );
};

export default ItemForm;
