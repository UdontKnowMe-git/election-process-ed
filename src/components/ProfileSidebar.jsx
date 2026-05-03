import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, LogOut } from 'lucide-react';
import { useElectionStore } from '../store/useElectionStore';
import { logout, db } from '../services/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { AnalyticsService } from '../services/AnalyticsService';
import { useTranslation } from '../hooks/useTranslation';

const TranslatedText = ({ text, className }) => {
  const { translatedText } = useTranslation(text);
  return <span className={className}>{translatedText}</span>;
};

export const ProfileSidebar = () => {
  const { 
    isProfileSidebarOpen, 
    setProfileSidebarOpen, 
    user, 
    setUser,
    fullName, 
    age, 
    pincode, 
    setProfileData 
  } = useElectionStore();

  const [localName, setLocalName] = useState(fullName);
  const [localAge, setLocalAge] = useState(age);
  const [localPincode, setLocalPincode] = useState(pincode);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setLocalName(fullName);
    setLocalAge(age);
    setLocalPincode(pincode);
  }, [fullName, age, pincode, isProfileSidebarOpen]);

  const handleSave = async () => {
    setIsSaving(true);
    setProfileData({ fullName: localName, age: localAge, pincode: localPincode });
    AnalyticsService.logEvent('profile_update', { pincode: localPincode });

    if (user && db && db.collection) {
      try {
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
          displayName: localName,
          age: localAge,
          pincode: localPincode
        });
      } catch (error) {
        console.error("Error updating profile in Firestore:", error);
      }
    }
    setTimeout(() => {
      setIsSaving(false);
    }, 500);
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setProfileSidebarOpen(false);
  };

  return (
    <AnimatePresence>
      {isProfileSidebarOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            onClick={() => setProfileSidebarOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#FDFBF7]/80 backdrop-blur-md shadow-2xl shadow-indigo-900/10 z-[70] flex flex-col border-l border-white/20 rounded-l-[2.5rem]"
          >
            <div className="flex items-center justify-between p-10 border-b border-indigo-600/5">
              <h2 className="text-3xl font-black text-[#001F3F] tracking-tight">
                <TranslatedText text="My Profile" />
              </h2>
              <button
                onClick={() => setProfileSidebarOpen(false)}
                className="p-3 hover:bg-white/50 rounded-full transition-all border border-indigo-600/10 text-indigo-600"
                aria-label="Close profile"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-10 flex flex-col gap-8">
              {user && (
                <div className="flex flex-col items-center gap-4">
                  <img 
                    src={user.photoURL || 'https://via.placeholder.com/150'} 
                    alt="Profile" 
                    className="w-24 h-24 rounded-full border-4 border-indigo-600 shadow-md"
                    referrerPolicy="no-referrer"
                  />
                  <div className="text-center">
                    <p className="text-xl font-black text-[#001F3F]">{user.displayName}</p>
                    <p className="text-sm text-[#001F3F]/60 font-medium">{user.email}</p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#001F3F]/80 uppercase tracking-wider">
                    <TranslatedText text="Full Name" />
                  </label>
                  <input 
                    type="text" 
                    value={localName} 
                    onChange={(e) => setLocalName(e.target.value)}
                    className="w-full p-4 bg-white/50 border border-indigo-600/20 rounded-2xl focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all text-[#001F3F] font-semibold"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#001F3F]/80 uppercase tracking-wider">
                    <TranslatedText text="Age" />
                  </label>
                  <input 
                    type="number" 
                    value={localAge} 
                    onChange={(e) => setLocalAge(e.target.value)}
                    className="w-full p-4 bg-white/50 border border-indigo-600/20 rounded-2xl focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all text-[#001F3F] font-semibold"
                    placeholder="Enter your age"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#001F3F]/80 uppercase tracking-wider">
                    <TranslatedText text="Pincode" />
                  </label>
                  <input 
                    type="text" 
                    value={localPincode} 
                    onChange={(e) => setLocalPincode(e.target.value)}
                    className="w-full p-4 bg-white/50 border border-indigo-600/20 rounded-2xl focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all text-[#001F3F] font-semibold"
                    placeholder="e.g. 110001"
                    maxLength={6}
                  />
                </div>
              </div>
            </div>

            <div className="p-10 border-t border-indigo-600/5 flex flex-col gap-4 bg-white/30">
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-70"
              >
                <Save className="w-5 h-5" />
                {isSaving ? <TranslatedText text="Saving..." /> : <TranslatedText text="Save Profile" />}
              </button>
              
              {user && (
                <button 
                  onClick={handleLogout}
                  className="w-full py-3 px-4 bg-white border-2 border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <TranslatedText text="Logout" />
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
