import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Video, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MeetingModal = ({ isOpen, onClose, onSubmit, meeting, mode = 'edit' }) => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    duration: '30',
  });

  useEffect(() => {
    if (meeting) {
      const dt = new Date(meeting.time);
      setFormData({
        date: dt.toISOString().split('T')[0],
        time: dt.toTimeString().split(' ')[0].slice(0, 5),
        duration: meeting.duration || '30',
      });
    }
  }, [meeting]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullDateTime = new Date(`${formData.date}T${formData.time}:00`).toISOString();
    onSubmit({
      ...meeting,
      time: fullDateTime,
      duration: parseInt(formData.duration),
      status: 'scheduled', // Reset to scheduled if it was missed
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        <div className="p-8 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">{mode === 'edit' ? 'Reschedule Meeting' : 'Schedule Meeting'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {meeting && (
            <div className="p-4 bg-blue-50 rounded-2xl flex gap-3 text-blue-800 text-sm">
              <Info className="w-5 h-5 flex-shrink-0" />
              <p>You are rescheduling the meeting for <strong>{meeting.itemName}</strong>.</p>
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">New Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">New Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Duration (minutes)</label>
              <select
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">60 minutes</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <button
              type="submit"
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
            >
              <Video className="w-5 h-5" />
              {mode === 'edit' ? 'Update & Reschedule' : 'Confirm Meeting'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-4 bg-gray-100 text-gray-700 rounded-2xl font-bold hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default MeetingModal;
