import React, { useState, useEffect } from 'react';
import { useApp } from '../AppContext';
import { db, auth, loginWithGoogle, handleFirestoreError, OperationType } from '../firebase';
import { doc, setDoc, deleteDoc, collection } from 'firebase/firestore';
import { supabase, isSupabaseConfigured, SUPABASE_SQL_SCHEMA } from '../supabaseClient';
import { 
  X, Save, FileSpreadsheet, DatabaseBackup, Database, Trash2, Check,
  Plus, Edit, Eye, Settings as SettingsIcon, MessageCircle, FileText, 
  HelpCircle, Image as ImageIcon, Users, Star, Layers, CheckSquare, Lock, Key, LogOut
} from 'lucide-react';
import { motion } from 'motion/react';
import { Service, Project, GalleryItem, Testimonial, Blog, FAQ, TeamMember, Settings } from '../types';
import { ImageUploader } from './ImageUploader';

interface AdminPanelProps {
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const { 
    lang, settings, services, projects, gallery, testimonials, blogs, faqs, team, messages, showNotification, isAdmin, adminLogin, adminLogout
  } = useApp();

  const [activeTab, setActiveTab] = useState<'settings' | 'messages' | 'services' | 'projects' | 'gallery' | 'testimonials' | 'blogs' | 'faqs' | 'team' | 'backup'>('settings');

  // Edit / Add Form States
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Custom ID/Pass Login Form States
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  // Settings local state
  const [settingsForm, setSettingsForm] = useState<Settings>({ ...settings });

  // Custom premium popup state
  const [successPopup, setSuccessPopup] = useState<{ show: boolean; message: string } | null>(null);

  const triggerSuccessPopup = (msg: string) => {
    setSuccessPopup({ show: true, message: msg });
  };

  useEffect(() => {
    setSettingsForm({ ...settings });
  }, [settings]);

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    adminLogin(usernameInput, passwordInput);
  };

  const handleSettingsSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Deep clean the object to replace undefined values with empty strings or nulls to prevent Firestore validation failures
      const cleanedSettings: any = {};
      Object.keys(settingsForm).forEach((key) => {
        const val = (settingsForm as any)[key];
        cleanedSettings[key] = val === undefined ? "" : val;
      });

      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.from('settings').upsert({ ...cleanedSettings, id: 'config' });
        if (error) throw error;
      } else {
        await setDoc(doc(db, 'settings', 'config'), cleanedSettings);
      }
      showNotification('ওয়েবসাইট সেটিংস সফলভাবে আপডেট করা হয়েছে!', 'success');
      triggerSuccessPopup(lang === 'bn' ? 'ওয়েবসাইট সেটিংস সফলভাবে আপডেট করা হয়েছে!' : 'Website settings updated successfully!');
    } catch (err) {
      console.error("Settings save error details:", err);
      showNotification(
        lang === 'bn' 
          ? 'সংরক্ষণ করা যায়নি! দয়া করে ইন্টারনেট সংযোগ চেক করে আবার চেষ্টা করুন।' 
          : 'Failed to save! Please check your internet connection and try again.',
        'error'
      );
      if (!isSupabaseConfigured) {
        handleFirestoreError(err, OperationType.UPDATE, 'settings/config');
      }
    }
  };

  // Toggle Message Read Status
  const toggleMessageStatus = async (msgId: string, currentStatus: string) => {
    try {
      const nextStatus = currentStatus === 'unread' ? 'read' : 'unread';
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.from('messages').update({ status: nextStatus }).eq('id', msgId);
        if (error) throw error;
      } else {
        await setDoc(doc(db, 'messages', msgId), { status: nextStatus }, { merge: true });
      }
      showNotification('বার্তা স্ট্যাটাস পরিবর্তন করা হয়েছে!', 'success');
      triggerSuccessPopup(lang === 'bn' ? 'bar-tār stya-ṭās saphal-bhāb-e up-ḍeṭ karā hay-e-chhe!' : 'Message status updated successfully!');
    } catch (err) {
      console.error(err);
      showNotification(
        lang === 'bn' 
          ? 'স্ট্যাটাস পরিবর্তন করা যায়নি! দয়া করে আবার চেষ্টা করুন।' 
          : 'Failed to change status! Please try again.',
        'error'
      );
      if (!isSupabaseConfigured) {
        handleFirestoreError(err, OperationType.UPDATE, `messages/${msgId}`);
      }
    }
  };

  // Delete Item from any collection
  const deleteItem = async (colName: string, docId: string) => {
    if (!window.confirm(lang === 'bn' ? 'আপনি কি নিশ্চিতভাবে এটি ডিলিট করতে চান?' : 'Are you sure you want to delete this item?')) return;
    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.from(colName).delete().eq('id', docId);
        if (error) throw error;
      } else {
        await deleteDoc(doc(db, colName, docId));
      }
      showNotification('আইটেমটি সফলভাবে ডিলিট করা হয়েছে!', 'success');
      triggerSuccessPopup(lang === 'bn' ? 'আইটেমটি সফলভাবে ডিলিট করা হয়েছে!' : 'Item deleted successfully!');
    } catch (err) {
      console.error(err);
      showNotification(
        lang === 'bn' 
          ? 'ডিলিট করা যায়নি! দয়া করে আবার চেষ্টা করুন।' 
          : 'Failed to delete! Please try again.',
        'error'
      );
      if (!isSupabaseConfigured) {
        handleFirestoreError(err, OperationType.DELETE, `${colName}/${docId}`);
      }
    }
  };

  // Save/Update helper for entities
  const handleEntitySave = async (colName: string, payload: any) => {
    try {
      const docId = payload.id || `${colName.slice(0, 4)}-${Date.now()}`;
      
      // Deep clean the payload object to prevent any undefined values from causing Firestore failures
      const finalPayload: any = {};
      Object.keys(payload).forEach((key) => {
        const val = payload[key];
        finalPayload[key] = val === undefined ? "" : val;
      });
      finalPayload.id = docId;

      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.from(colName).upsert(finalPayload);
        if (error) throw error;
      } else {
        await setDoc(doc(db, colName, docId), finalPayload);
      }
      showNotification('আইটেমটি সফলভাবে সংরক্ষিত হয়েছে!', 'success');
      triggerSuccessPopup(lang === 'bn' ? 'তথ্যটি সফলভাবে সংরক্ষণ করা হয়েছে!' : 'Saved successfully!');
      setEditingItem(null);
      setIsAdding(false);
    } catch (err) {
      console.error("Entity save error details:", err);
      showNotification(
        lang === 'bn' 
          ? 'সংরক্ষণ করা যায়নি! দয়া করে আবার চেষ্টা করুন।' 
          : 'Failed to save! Please try again.',
        'error'
      );
      if (!isSupabaseConfigured) {
        handleFirestoreError(err, OperationType.WRITE, `${colName}/${payload.id || 'new'}`);
      }
    }
  };

  // Export messages to CSV Excel format
  const exportMessagesToCSV = () => {
    if (messages.length === 0) {
      alert('রপ্তানি করার জন্য কোনো বার্তা নেই!');
      return;
    }
    const headers = ['ID', 'Name', 'Phone', 'Email', 'Subject', 'Message', 'Status', 'CreatedAt'];
    const rows = messages.map(msg => [
      msg.id,
      msg.name,
      msg.phone,
      msg.email,
      msg.subject,
      msg.message.replace(/\n/g, ' '),
      msg.status,
      msg.createdAt
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.map(val => `"${val}"`).join(","))].join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Ace_Messages_Export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('এক্সেল স্প্রেডশীট ফাইল ডাউনলোড শুরু হয়েছে!', 'success');
    triggerSuccessPopup(lang === 'bn' ? 'এক্সেল স্প্রেডশীট ফাইল ডাউনলোড সফলভাবে শুরু হয়েছে!' : 'Excel export started successfully!');
  };

  // Backup and Restore local files mock
  const handleBackupExport = () => {
    const backupData = {
      settings,
      services,
      projects,
      gallery,
      testimonials,
      blogs,
      faqs,
      team,
      exportedAt: new Date().toISOString()
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData));
    const link = document.createElement('a');
    link.setAttribute("href", dataStr);
    link.setAttribute("download", `ACE_Database_Backup_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('ডাটাবেজ ব্যাকআপ ফাইল সফলভাবে ডাউনলোড হয়েছে!', 'success');
    triggerSuccessPopup(lang === 'bn' ? 'ডাটাবেজ ব্যাকআপ ফাইল সফলভাবে ডাউনলোড করা হয়েছে!' : 'Database backup downloaded successfully!');
  };

  // Restore database by parsing JSON
  const handleBackupRestore = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = async (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          
          if (isSupabaseConfigured && supabase) {
            if (parsed.settings) {
              await supabase.from('settings').upsert({ ...parsed.settings, id: 'config' });
            }
            if (Array.isArray(parsed.services)) {
              for (const s of parsed.services) await supabase.from('services').upsert(s);
            }
            if (Array.isArray(parsed.projects)) {
              for (const p of parsed.projects) await supabase.from('projects').upsert(p);
            }
            if (Array.isArray(parsed.gallery)) {
              for (const g of parsed.gallery) await supabase.from('gallery').upsert(g);
            }
            if (Array.isArray(parsed.testimonials)) {
              for (const t of parsed.testimonials) await supabase.from('testimonials').upsert(t);
            }
            if (Array.isArray(parsed.blogs)) {
              for (const b of parsed.blogs) await supabase.from('blogs').upsert(b);
            }
            if (Array.isArray(parsed.faqs)) {
              for (const f of parsed.faqs) await supabase.from('faqs').upsert(f);
            }
            if (Array.isArray(parsed.team)) {
              for (const tm of parsed.team) await supabase.from('team').upsert(tm);
            }
          } else {
            if (parsed.settings) {
              await setDoc(doc(db, 'settings', 'config'), parsed.settings);
            }
            if (Array.isArray(parsed.services)) {
              for (const s of parsed.services) await setDoc(doc(db, 'services', s.id), s);
            }
            if (Array.isArray(parsed.projects)) {
              for (const p of parsed.projects) await setDoc(doc(db, 'projects', p.id), p);
            }
            if (Array.isArray(parsed.gallery)) {
              for (const g of parsed.gallery) await setDoc(doc(db, 'gallery', g.id), g);
            }
            if (Array.isArray(parsed.testimonials)) {
              for (const t of parsed.testimonials) await setDoc(doc(db, 'testimonials', t.id), t);
            }
            if (Array.isArray(parsed.blogs)) {
              for (const b of parsed.blogs) await setDoc(doc(db, 'blogs', b.id), b);
            }
            if (Array.isArray(parsed.faqs)) {
              for (const f of parsed.faqs) await setDoc(doc(db, 'faqs', f.id), f);
            }
            if (Array.isArray(parsed.team)) {
              for (const tm of parsed.team) await setDoc(doc(db, 'team', tm.id), tm);
            }
          }
          showNotification('ডাটাবেজ রি-স্টোর সফলভাবে সম্পন্ন হয়েছে!', 'success');
          triggerSuccessPopup(lang === 'bn' ? 'ডাটাবেজ রি-স্টোর সফলভাবে সম্পন্ন হয়েছে!' : 'Database restore completed successfully!');
        } catch (err) {
          alert('ব্যাকআপ ফাইলটি সঠিক নয়। দয়া করে সঠিক ফাইল আপলোড করুন।');
        }
      };
    }
  };

  const tabsList = [
    { id: 'settings', label: lang === 'bn' ? 'ওয়েবসাইট সেটিংস' : 'Website Settings', icon: <SettingsIcon className="w-4 h-4" /> },
    { id: 'messages', label: lang === 'bn' ? 'বার্তা সমূহ' : 'Messages', icon: <MessageCircle className="w-4 h-4" /> },
    { id: 'services', label: lang === 'bn' ? 'সার্ভিসসমূহ' : 'Services', icon: <Layers className="w-4 h-4" /> },
    { id: 'projects', label: lang === 'bn' ? 'প্রজেক্টস' : 'Projects', icon: <CheckSquare className="w-4 h-4" /> },
    { id: 'gallery', label: lang === 'bn' ? 'গ্যালারি' : 'Gallery Progress', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'testimonials', label: lang === 'bn' ? 'রিভিউ ও মতামত' : 'Testimonials', icon: <Star className="w-4 h-4" /> },
    { id: 'blogs', label: lang === 'bn' ? 'ব্লগ টিপস' : 'Blogs', icon: <FileText className="w-4 h-4" /> },
    { id: 'faqs', label: lang === 'bn' ? 'প্রশ্নোত্তর' : 'FAQs', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'team', label: lang === 'bn' ? 'প্রকৌশলী টিম' : 'Team Members', icon: <Users className="w-4 h-4" /> },
    { id: 'backup', label: lang === 'bn' ? 'ব্যাকআপ ও রিসেট' : 'Backup & Sync', icon: <DatabaseBackup className="w-4 h-4" /> },
  ] as const;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90">
      <div className="bg-[#05221b] border-2 border-[#e6b325] rounded-2xl w-full max-w-6xl h-[92vh] flex flex-col overflow-hidden shadow-2xl relative text-left">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#041a14] border-b border-[#0d5c46]/40 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#e6b325]/10 text-[#e6b325] rounded-xl">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-display font-extrabold text-base sm:text-lg text-white">
                  {lang === 'bn' ? 'আমিনুল ইঞ্জিনিয়ার্স - অ্যাডমিন কন্ট্রোল প্যানেল' : 'ACE - Admin Control Panel'}
                </h3>
                {isSupabaseConfigured ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] mr-1 animate-pulse"></span>
                    Supabase
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#3b82f6]/20 text-[#3b82f6] border border-[#3b82f6]/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mr-1"></span>
                    Firebase
                  </span>
                )}
              </div>
              <p className="text-[10px] sm:text-xs text-[#e6b325] font-sans font-medium">
                {lang === 'bn' ? '১০০% ডাইনামিক রিয়েল-টাইম কনটেন্ট ম্যানেজমেন্ট সিস্টেম' : 'Real-time corporate engine. Fully editable.'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {isAdmin && (
              <button
                onClick={() => {
                  adminLogout();
                }}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-full border border-red-500/50 text-xs text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
                title={lang === 'bn' ? 'লগআউট' : 'Logout'}
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{lang === 'bn' ? 'লগআউট' : 'Logout'}</span>
              </button>
            )}
            <button 
              onClick={onClose}
              className="p-1.5 rounded-full bg-[#05221b] text-gray-400 hover:text-[#e6b325] transition-colors cursor-pointer border border-[#0d5c46]/40"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {!isAdmin ? (
          <div className="flex-grow flex items-center justify-center p-6 bg-[#041a14]/60 overflow-y-auto">
            <motion.form 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleCustomLogin} 
              className="w-full max-w-md bg-[#041c15] border border-[#0d5c46]/40 p-8 rounded-2xl shadow-xl space-y-6"
            >
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-[#e6b325]/10 flex items-center justify-center mx-auto text-[#e6b325]">
                  <Lock className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-display font-black text-white">
                  {lang === 'bn' ? 'অ্যাডমিন লগইন' : 'Admin Area Login'}
                </h4>
                <p className="text-xs text-gray-400 font-sans">
                  {lang === 'bn' ? 'ড্যাশবোর্ড অ্যাক্সেস করতে অনুগ্রহ করে লগইন করুন' : 'Please authenticate to access the site controls'}
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1 block text-left">
                  <label className="text-xs font-bold text-gray-300 font-sans block text-left">
                    {lang === 'bn' ? 'ইউজারনেম / আইডি' : 'Admin Username / ID'}
                  </label>
                  <input
                    type="text"
                    required
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    placeholder="e.g. admin"
                    className="w-full bg-[#05221b] border border-[#0d5c46]/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#e6b325] transition-colors font-sans text-sm font-mono"
                  />
                </div>

                <div className="space-y-1 block text-left">
                  <label className="text-xs font-bold text-gray-300 font-sans block text-left">
                    {lang === 'bn' ? 'পাসওয়ার্ড' : 'Security Password'}
                  </label>
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#05221b] border border-[#0d5c46]/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#e6b325] transition-colors font-sans text-sm font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#e6b325] to-[#f3c647] hover:scale-[1.02] text-[#041a14] font-sans font-extrabold text-sm py-3.5 rounded-xl shadow-lg shadow-[#e6b325]/20 cursor-pointer transition-all flex items-center justify-center space-x-2"
              >
                <Key className="w-4 h-4" />
                <span>{lang === 'bn' ? 'লগইন করুন (স্থানীয়)' : 'Verify & Enter (Local)'}</span>
              </button>

              <div className="flex items-center my-3">
                <div className="flex-grow border-t border-[#0d5c46]/30"></div>
                <span className="px-3 text-[10px] text-gray-400 uppercase font-sans font-medium">
                  {lang === 'bn' ? 'অথবা' : 'OR'}
                </span>
                <div className="flex-grow border-t border-[#0d5c46]/30"></div>
              </div>

              <button
                type="button"
                onClick={async () => {
                  try {
                    const u = await loginWithGoogle();
                    if (u && u.email === "hasanmdrakib193@gmail.com") {
                      showNotification(
                        lang === 'bn' 
                          ? 'গুগল অ্যাডমিন হিসেবে সফলভাবে লগইন হয়েছে!' 
                          : 'Logged in as Google Admin successfully!',
                        'success'
                      );
                    } else if (u) {
                      showNotification(
                        lang === 'bn' 
                          ? `দুঃখিত, '${u.email}' কোনো অ্যাডমিন ইমেইল নয়।` 
                          : `Sorry, '${u.email}' is not an authorized admin email.`,
                        'error'
                      );
                    }
                  } catch (err) {
                    showNotification(
                      lang === 'bn' ? 'গুগল সাইন-ইন ব্যর্থ হয়েছে!' : 'Google Sign-In failed!',
                      'error'
                    );
                  }
                }}
                className="w-full bg-white hover:bg-gray-100 hover:scale-[1.02] text-[#041a14] font-sans font-bold text-sm py-3 rounded-xl cursor-pointer transition-all flex items-center justify-center space-x-2 border border-gray-300 shadow-md"
              >
                <svg className="w-4.5 h-4.5" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12.24 10.285V14.4h6.887C18.2 16.63 15.645 18 12.24 18c-3.86 0-7-3.14-7-7s3.14-7 7-7c1.805 0 3.44.685 4.695 1.8l3.143-3.143C18.17 1.042 15.345 0 12.24 0 5.6 0 0 5.6 0 12.24s5.6 12.24 12.24 12.24c6.345 0 12.24-4.545 12.24-12.24 0-.815-.08-1.615-.22-2.395H12.24z"/>
                </svg>
                <span>{lang === 'bn' ? 'গুগল অ্যাডমিন লগইন' : 'Google Admin Login'}</span>
              </button>

              <p className="text-[10px] text-gray-400 text-center font-sans mt-2 leading-relaxed">
                {lang === 'bn' 
                  ? 'অ্যাডমিন প্যানেলের সকল তথ্য সরাসরি ডাটাবেজে সংরক্ষিত হচ্ছে।' 
                  : 'All admin panel operations are saved directly to the database.'}
              </p>
            </motion.form>
          </div>
        ) : (
          <div className="flex flex-grow overflow-hidden">
          
          {/* Sidebar Navigation */}
          <div className="w-48 sm:w-56 bg-[#041712] border-r border-[#0d5c46]/30 overflow-y-auto p-3 flex flex-col space-y-1">
            {tabsList.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setEditingItem(null);
                  setIsAdding(false);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg font-sans text-xs sm:text-sm font-medium transition-colors text-left cursor-pointer ${
                  activeTab === tab.id 
                    ? 'bg-[#e6b325] text-black font-bold' 
                    : 'text-gray-300 hover:bg-[#0d5c46]/20 hover:text-white'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Main Workspace */}
          <div className="flex-grow overflow-y-auto p-4 sm:p-8 bg-[#05221b]">
            
            {/* TABS CONTROLLER */}

            {/* TAB 1: WEBSITE SETTINGS */}
            {activeTab === 'settings' && (
              <form onSubmit={handleSettingsSave} className="space-y-6">
                <div className="border-b border-[#0d5c46]/20 pb-4 mb-4">
                  <h4 className="text-base font-display font-bold text-white">{lang === 'bn' ? 'গ্লোবাল সেটিংস এবং ব্রান্ডিং' : 'Global Website Branding Settings'}</h4>
                  <p className="text-xs text-gray-400">{lang === 'bn' ? 'এখানে পরিবর্তন করলে সাথে সাথেই সম্পূর্ণ ওয়েবসাইটের নাম, লোগো, ফোন এবং কালার আপডেট হবে।' : 'Modifying these fields dynamically updates footers, floating widgets, and names.'}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-300 font-bold">{lang === 'bn' ? 'কোম্পানির নাম (বাংলা)' : 'Company Name (Bangla)'}</label>
                    <input type="text" value={settingsForm.companyName} onChange={e => setSettingsForm({ ...settingsForm, companyName: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-300 font-bold">{lang === 'bn' ? 'কোম্পানির নাম (ইংরেজী)' : 'Company Name (English)'}</label>
                    <input type="text" value={settingsForm.companyNameEn} onChange={e => setSettingsForm({ ...settingsForm, companyNameEn: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-300 font-bold">{lang === 'bn' ? 'কোম্পানি ট্যাগলাইন (বাংলা)' : 'Tagline (Bangla)'}</label>
                    <input type="text" value={settingsForm.tagline} onChange={e => setSettingsForm({ ...settingsForm, tagline: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-300 font-bold">{lang === 'bn' ? 'কোম্পানি ট্যাগলাইন (ইংরেজী)' : 'Tagline (English)'}</label>
                    <input type="text" value={settingsForm.taglineEn} onChange={e => setSettingsForm({ ...settingsForm, taglineEn: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-300 font-bold">{lang === 'bn' ? 'যোগাযোগ মোবাইল' : 'Contact Phone'}</label>
                    <input type="text" value={settingsForm.contactPhone} onChange={e => setSettingsForm({ ...settingsForm, contactPhone: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white font-mono" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-300 font-bold">{lang === 'bn' ? 'হোয়াটসঅ্যাপ নম্বর' : 'WhatsApp Link'}</label>
                    <input type="text" value={settingsForm.whatsappNumber} onChange={e => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white font-mono" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-300 font-bold">{lang === 'bn' ? 'অফিস ইমেইল' : 'Official Email'}</label>
                    <input type="email" value={settingsForm.contactEmail} onChange={e => setSettingsForm({ ...settingsForm, contactEmail: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-gray-300 font-bold">{lang === 'bn' ? 'অফিস ঠিকানা (বাংলা)' : 'Office Address (Bangla)'}</label>
                  <input type="text" value={settingsForm.officeAddress} onChange={e => setSettingsForm({ ...settingsForm, officeAddress: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-300 font-bold">{lang === 'bn' ? 'গুগল ম্যাপ এমবেড কোড (URL)' : 'Google Maps Embed Url'}</label>
                    <input type="text" value={settingsForm.googleMapsEmbedUrl} onChange={e => setSettingsForm({ ...settingsForm, googleMapsEmbedUrl: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white font-mono" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-300 font-bold">{lang === 'bn' ? 'ফেসবুক মেসেঞ্জার লিংক' : 'Messenger Link'}</label>
                    <input type="text" value={settingsForm.messengerLink} onChange={e => setSettingsForm({ ...settingsForm, messengerLink: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white font-mono" />
                  </div>
                </div>

                {/* BRANDING MEDIA (LOGO & FAVICON) */}
                <div className="border-t border-[#0d5c46]/20 pt-4">
                  <h5 className="text-xs font-display font-extrabold text-[#e6b325] uppercase tracking-wider mb-3">
                    {lang === 'bn' ? 'ব্র্যান্ড মিডিয়া (লোগো ও ফেভিকন)' : 'Brand Media (Logo & Favicon)'}
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <ImageUploader 
                        value={settingsForm.logoUrl || ''} 
                        onChange={val => setSettingsForm({ ...settingsForm, logoUrl: val })} 
                        label={lang === 'bn' ? 'লোগো ইমেজ (Logo Image)' : 'Logo Image'}
                        placeholder="https://example.com/logo.png"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <ImageUploader 
                        value={settingsForm.faviconUrl || ''} 
                        onChange={val => setSettingsForm({ ...settingsForm, faviconUrl: val })} 
                        label={lang === 'bn' ? 'ফেভিকন ইমেজ (Favicon Image)' : 'Favicon Image'}
                        placeholder="https://example.com/favicon.ico"
                      />
                    </div>
                  </div>
                </div>

                {/* ADMIN CREDENTIALS */}
                <div className="border-t border-[#0d5c46]/20 pt-4">
                  <h5 className="text-xs font-display font-extrabold text-[#e6b325] uppercase tracking-wider mb-3">
                    {lang === 'bn' ? 'অ্যাডমিন প্যানেল অ্যাক্সেস সেটিংস' : 'Admin Panel Access Security'}
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-300 font-bold">{lang === 'bn' ? 'অ্যাডমিন ইউজারনেম / আইডি' : 'Admin Username / ID'}</label>
                      <input 
                        type="text" 
                        value={settingsForm.adminUsername || ''} 
                        onChange={e => setSettingsForm({ ...settingsForm, adminUsername: e.target.value })} 
                        placeholder="admin"
                        className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white font-mono" 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-300 font-bold">{lang === 'bn' ? 'অ্যাডমিন সিকিউরিটি পাসওয়ার্ড' : 'Admin Password'}</label>
                      <input 
                        type="text" 
                        value={settingsForm.adminPassword || ''} 
                        onChange={e => setSettingsForm({ ...settingsForm, adminPassword: e.target.value })} 
                        placeholder="admin123"
                        className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white font-mono" 
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#0d5c46]/20 pt-4 flex justify-end">
                  <button type="submit" className="flex items-center space-x-2 bg-[#0d5c46] hover:bg-[#0d5c46]/80 text-white border border-[#e6b325] px-6 py-2.5 rounded-full font-sans font-bold text-xs cursor-pointer shadow-lg">
                    <Save className="w-4 h-4 text-[#e6b325]" />
                    <span>{lang === 'bn' ? 'সেটিংস সংরক্ষণ করুন' : 'Save Config'}</span>
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: CONTACT MESSAGES LOGGER */}
            {activeTab === 'messages' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#0d5c46]/20 pb-4">
                  <div>
                    <h4 className="text-base font-display font-bold text-white">{lang === 'bn' ? 'গ্রাহকদের পরামর্শ বার্তা' : 'Client Inboxes'}</h4>
                    <p className="text-xs text-gray-400">{lang === 'bn' ? 'ওয়েবসাইটের যোগাযোগ ফর্ম থেকে জমাকৃত গ্রাহকদের বার্তা।' : 'Review and coordinate prospects logged directly from on-page forms.'}</p>
                  </div>
                  <button
                    onClick={exportMessagesToCSV}
                    className="flex items-center space-x-1.5 bg-[#e6b325] hover:bg-[#e6b325]/80 text-black px-4 py-2 rounded-full font-sans font-bold text-xs shadow-lg cursor-pointer shrink-0"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>{lang === 'bn' ? 'এক্সেল ফাইলে রপ্তানি করুন' : 'Export Excel (.csv)'}</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`border rounded-2xl p-5 text-left relative transition-all ${
                        msg.status === 'unread' 
                          ? 'bg-[#052920] border-[#e6b325]/50 shadow-md' 
                          : 'bg-[#041a14]/60 border-[#0d5c46]/30'
                      }`}
                    >
                      <span className={`absolute top-4 right-4 text-[9px] font-mono uppercase px-2 py-0.5 rounded-full ${
                        msg.status === 'unread' ? 'bg-amber-500/20 text-amber-300' : 'bg-gray-700 text-gray-400'
                      }`}>
                        {msg.status}
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase font-sans">{lang === 'bn' ? 'প্রেরক' : 'Prospect Name'}</p>
                          <p className="font-sans font-bold text-white text-sm">{msg.name}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase font-sans">{lang === 'bn' ? 'মোবাইল' : 'Phone'}</p>
                          <a href={`tel:${msg.phone}`} className="text-[#e6b325] hover:underline font-mono text-xs font-semibold">{msg.phone}</a>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase font-sans">{lang === 'bn' ? 'তারিখ' : 'Received date'}</p>
                          <p className="text-gray-300 text-xs font-mono">{msg.createdAt.slice(0, 10)} {msg.createdAt.slice(11, 16)}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-[10px] text-gray-400 uppercase font-sans">{lang === 'bn' ? 'বিষয়' : 'Subject'}</p>
                        <p className="text-white text-xs font-sans font-semibold">{msg.subject}</p>
                      </div>

                      <div className="mb-4 bg-[#041410] p-4 rounded-xl border border-[#0d5c46]/20">
                        <p className="text-xs text-gray-200 font-sans whitespace-pre-wrap">{msg.message}</p>
                      </div>

                      <div className="flex justify-end space-x-2 border-t border-[#0d5c46]/10 pt-3">
                        <button
                          onClick={() => toggleMessageStatus(msg.id, msg.status)}
                          className="flex items-center space-x-1 px-3 py-1 bg-[#0d5c46]/20 text-gray-300 hover:text-white rounded text-xs transition-colors"
                        >
                          <Check className="w-3.5 h-3.5 text-[#e6b325]" />
                          <span>{msg.status === 'unread' ? 'Mark Read' : 'Mark Unread'}</span>
                        </button>
                        <button
                          onClick={() => deleteItem('messages', msg.id)}
                          className="flex items-center space-x-1 px-3 py-1 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded text-xs transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}

                  {messages.length === 0 && (
                    <div className="text-center py-12 text-gray-400 font-sans text-sm">
                      {lang === 'bn' ? 'এখনো কোনো নতুন বার্তা নেই।' : 'No logged messages yet.'}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: SERVICES MANAGEMENT */}
            {activeTab === 'services' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#0d5c46]/20 pb-4">
                  <h4 className="text-base font-display font-bold text-white">{lang === 'bn' ? 'সেবাসমূহ ব্যবস্থাপন' : 'Manage Engineering Services'}</h4>
                  {!isAdding && !editingItem && (
                    <button
                      onClick={() => {
                        setEditingItem({ title: '', titleEn: '', description: '', descriptionEn: '', benefits: [], benefitsEn: [], iconName: 'Home', imageUrl: '' });
                        setIsAdding(true);
                      }}
                      className="flex items-center space-x-1 bg-[#e6b325] text-black px-4 py-1.5 rounded-full font-sans font-bold text-xs cursor-pointer shadow-lg"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{lang === 'bn' ? 'নতুন সার্ভিস যুক্ত করুন' : 'Add Service'}</span>
                    </button>
                  )}
                </div>

                {/* List services */}
                {!isAdding && !editingItem ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((ser) => (
                      <div key={ser.id} className="bg-[#041a14]/60 border border-[#0d5c46]/40 p-4 rounded-xl flex items-center justify-between text-left">
                        <div className="flex items-center space-x-3 overflow-hidden">
                          <img src={ser.imageUrl} alt={ser.title} className="w-12 h-12 rounded object-cover shrink-0" />
                          <div className="overflow-hidden">
                            <h5 className="font-display font-bold text-white text-sm truncate">{lang === 'bn' ? ser.title : ser.titleEn}</h5>
                            <p className="text-[10px] text-gray-400 truncate font-sans">{ser.id}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2 shrink-0 ml-4">
                          <button
                            onClick={() => setEditingItem({ ...ser })}
                            className="p-1.5 bg-[#0d5c46]/20 text-[#e6b325] rounded hover:bg-[#0d5c46]/30 transition-colors"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteItem('services', ser.id)}
                            className="p-1.5 bg-red-500/10 text-red-400 rounded hover:bg-red-500/20 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Add / Edit form
                  <form onSubmit={(e) => { e.preventDefault(); handleEntitySave('services', editingItem); }} className="space-y-4 text-left">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-gray-300 font-bold">সার্ভিস টাইটেল (বাংলা)</label>
                        <input type="text" required value={editingItem.title} onChange={e => setEditingItem({ ...editingItem, title: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-gray-300 font-bold">Service Title (English)</label>
                        <input type="text" required value={editingItem.titleEn} onChange={e => setEditingItem({ ...editingItem, titleEn: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-gray-300 font-bold">সার্ভিস ডেসক্রিপশন (বাংলা)</label>
                      <textarea required rows={3} value={editingItem.description} onChange={e => setEditingItem({ ...editingItem, description: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white resize-none" />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-xs text-gray-300 font-bold">Service Description (English)</label>
                      <textarea required rows={3} value={editingItem.descriptionEn} onChange={e => setEditingItem({ ...editingItem, descriptionEn: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white resize-none" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <ImageUploader 
                          value={editingItem.imageUrl || ''} 
                          onChange={val => setEditingItem({ ...editingItem, imageUrl: val })} 
                          label={lang === 'bn' ? 'সার্ভিস ছবি (Service Image)' : 'Service Image'}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-gray-300 font-bold">Lucide আইকন নাম (যেমন: Home, Layers, Cpu)</label>
                        <input type="text" required value={editingItem.iconName} onChange={e => setEditingItem({ ...editingItem, iconName: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white font-mono" />
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                      <button type="button" onClick={() => { setEditingItem(null); setIsAdding(false); }} className="px-4 py-2 bg-transparent text-gray-400 hover:text-white rounded text-xs">{lang === 'bn' ? 'বাতিল' : 'Cancel'}</button>
                      <button type="submit" className="px-5 py-2 bg-[#0d5c46] hover:bg-[#0d5c46]/80 text-white border border-[#e6b325] rounded-full text-xs font-bold">{lang === 'bn' ? 'সংরক্ষণ' : 'Save'}</button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* TAB 4: PROJECTS MANAGEMENT */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#0d5c46]/20 pb-4">
                  <h4 className="text-base font-display font-bold text-white">{lang === 'bn' ? 'প্রজেক্টসমূহ ব্যবস্থাপন' : 'Manage Portfolio Projects'}</h4>
                  {!isAdding && !editingItem && (
                    <button
                      onClick={() => {
                        setEditingItem({ title: '', titleEn: '', category: 'ডুপ্লেক্স', categoryEn: 'Duplex', description: '', descriptionEn: '', images: [], area: '', budget: '', completionDate: '', clientName: '', location: '', locationEn: '', beforeImageUrl: '', afterImageUrl: '' });
                        setIsAdding(true);
                      }}
                      className="flex items-center space-x-1 bg-[#e6b325] text-black px-4 py-1.5 rounded-full font-sans font-bold text-xs cursor-pointer shadow-lg"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{lang === 'bn' ? 'নতুন প্রজেক্ট যুক্ত করুন' : 'Add Project'}</span>
                    </button>
                  )}
                </div>

                {!isAdding && !editingItem ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.map((p) => (
                      <div key={p.id} className="bg-[#041a14]/60 border border-[#0d5c46]/40 p-4 rounded-xl flex items-center justify-between text-left">
                        <div className="flex items-center space-x-3 overflow-hidden">
                          <img src={p.images[0]} alt={p.title} className="w-12 h-12 rounded object-cover shrink-0" />
                          <div className="overflow-hidden">
                            <h5 className="font-display font-bold text-white text-sm truncate">{lang === 'bn' ? p.title : p.titleEn}</h5>
                            <span className="text-[9px] bg-[#e6b325]/20 text-[#e6b325] px-1.5 py-0.5 rounded uppercase font-bold">{p.categoryEn}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2 shrink-0 ml-4">
                          <button
                            onClick={() => setEditingItem({ ...p })}
                            className="p-1.5 bg-[#0d5c46]/20 text-[#e6b325] rounded hover:bg-[#0d5c46]/30 transition-colors"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteItem('projects', p.id)}
                            className="p-1.5 bg-red-500/10 text-red-400 rounded hover:bg-red-500/20 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); handleEntitySave('projects', editingItem); }} className="space-y-4 text-left">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-gray-300 font-bold">প্রজেক্ট নাম (বাংলা)</label>
                        <input type="text" required value={editingItem.title} onChange={e => setEditingItem({ ...editingItem, title: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-gray-300 font-bold">Project Name (English)</label>
                        <input type="text" required value={editingItem.titleEn} onChange={e => setEditingItem({ ...editingItem, titleEn: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-gray-300 font-bold">ক্যাটাগরি (বাংলা)</label>
                        <input type="text" required value={editingItem.category} onChange={e => setEditingItem({ ...editingItem, category: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-gray-300 font-bold">Category (English)</label>
                        <input type="text" required value={editingItem.categoryEn} onChange={e => setEditingItem({ ...editingItem, categoryEn: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-gray-300 font-bold">মোট আয়তন (যেমন: ৫,০০০ বর্গফুট)</label>
                        <input type="text" required value={editingItem.area} onChange={e => setEditingItem({ ...editingItem, area: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-gray-300 font-bold">বাজেট (যেমন: ২.৫ কোটি টাকা)</label>
                        <input type="text" required value={editingItem.budget} onChange={e => setEditingItem({ ...editingItem, budget: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-gray-300 font-bold">গ্রাহক নাম (যেমন: জনাব রহমান)</label>
                        <input type="text" required value={editingItem.clientName} onChange={e => setEditingItem({ ...editingItem, clientName: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-gray-300 font-bold">অবস্থান (বাংলা)</label>
                        <input type="text" required value={editingItem.location} onChange={e => setEditingItem({ ...editingItem, location: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-gray-300 font-bold">Location (English)</label>
                        <input type="text" required value={editingItem.locationEn} onChange={e => setEditingItem({ ...editingItem, locationEn: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <ImageUploader 
                          value={editingItem.beforeImageUrl || ''} 
                          onChange={val => setEditingItem({ ...editingItem, beforeImageUrl: val })} 
                          label={lang === 'bn' ? 'পূর্বে (Before) ইমেজ (ফাঁকা জমি/সাইট)' : 'Before Image (Empty Land/Site)'}
                        />
                      </div>
                      <div className="space-y-1">
                        <ImageUploader 
                          value={editingItem.afterImageUrl || ''} 
                          onChange={val => setEditingItem({ ...editingItem, afterImageUrl: val, images: [val] })} 
                          label={lang === 'bn' ? 'পরে (After) / মূল কভার ইমেজ' : 'After / Main Cover Image'}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-gray-300 font-bold">প্রজেক্ট ডেসক্রিপশন (বাংলা)</label>
                      <textarea required rows={3} value={editingItem.description} onChange={e => setEditingItem({ ...editingItem, description: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white resize-none" />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-gray-300 font-bold">Project Description (English)</label>
                      <textarea required rows={3} value={editingItem.descriptionEn} onChange={e => setEditingItem({ ...editingItem, descriptionEn: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white resize-none" />
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                      <button type="button" onClick={() => { setEditingItem(null); setIsAdding(false); }} className="px-4 py-2 bg-transparent text-gray-400 hover:text-white rounded text-xs">{lang === 'bn' ? 'বাতিল' : 'Cancel'}</button>
                      <button type="submit" className="px-5 py-2 bg-[#0d5c46] hover:bg-[#0d5c46]/80 text-white border border-[#e6b325] rounded-full text-xs font-bold">{lang === 'bn' ? 'সংরক্ষণ' : 'Save'}</button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* TAB 5: GALLERY PROGRESS */}
            {activeTab === 'gallery' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#0d5c46]/20 pb-4">
                  <h4 className="text-base font-display font-bold text-white">{lang === 'bn' ? 'সাইট গ্যালারি ব্যবস্থাপন' : 'Manage Progress Gallery'}</h4>
                  {!isAdding && !editingItem && (
                    <button
                      onClick={() => {
                        setEditingItem({ imageUrl: '', title: '', titleEn: '', category: 'নির্মাণাধীন' });
                        setIsAdding(true);
                      }}
                      className="flex items-center space-x-1 bg-[#e6b325] text-black px-4 py-1.5 rounded-full font-sans font-bold text-xs cursor-pointer shadow-lg"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{lang === 'bn' ? 'নতুন ছবি যুক্ত করুন' : 'Add Progress Photo'}</span>
                    </button>
                  )}
                </div>

                {!isAdding && !editingItem ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {gallery.map((g) => (
                      <div key={g.id} className="bg-[#041a14]/60 border border-[#0d5c46]/40 p-3 rounded-xl flex flex-col justify-between text-left relative">
                        <img src={g.imageUrl} alt={g.title} className="w-full h-32 object-cover rounded-lg mb-3" />
                        <div>
                          <span className="text-[8px] bg-[#e6b325]/20 text-[#e6b325] px-1.5 py-0.5 rounded font-bold uppercase">{g.category}</span>
                          <h5 className="font-display font-bold text-white text-xs mt-1.5 line-clamp-1">{lang === 'bn' ? g.title : g.titleEn}</h5>
                        </div>
                        <div className="flex justify-end space-x-2 mt-3 pt-2 border-t border-[#0d5c46]/10">
                          <button
                            onClick={() => setEditingItem({ ...g })}
                            className="p-1 bg-[#0d5c46]/20 text-[#e6b325] rounded hover:bg-[#0d5c46]/30 transition-colors"
                          >
                            <Edit className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => deleteItem('gallery', g.id)}
                            className="p-1 bg-red-500/10 text-red-400 rounded hover:bg-red-500/20 transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); handleEntitySave('gallery', editingItem); }} className="space-y-4 text-left">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-300 font-bold">ছবি শিরোনাম (বাংলা)</label>
                      <input type="text" required value={editingItem.title} onChange={e => setEditingItem({ ...editingItem, title: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white" />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-xs text-gray-300 font-bold">Photo Title (English)</label>
                      <input type="text" required value={editingItem.titleEn} onChange={e => setEditingItem({ ...editingItem, titleEn: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-gray-300 font-bold">ক্যাটাগরি (যেমন: সার্ভে, নির্মাণাধীন, ইন্টেরিয়র)</label>
                        <input type="text" required value={editingItem.category} onChange={e => setEditingItem({ ...editingItem, category: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white" />
                      </div>
                      <div className="space-y-1">
                        <ImageUploader 
                          value={editingItem.imageUrl || ''} 
                          onChange={val => setEditingItem({ ...editingItem, imageUrl: val })} 
                          label={lang === 'bn' ? 'গ্যালারি ছবি (Gallery Image)' : 'Gallery Image'}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                      <button type="button" onClick={() => { setEditingItem(null); setIsAdding(false); }} className="px-4 py-2 bg-transparent text-gray-400 hover:text-white rounded text-xs">{lang === 'bn' ? 'বাতিল' : 'Cancel'}</button>
                      <button type="submit" className="px-5 py-2 bg-[#0d5c46] hover:bg-[#0d5c46]/80 text-white border border-[#e6b325] rounded-full text-xs font-bold">{lang === 'bn' ? 'সংরক্ষণ' : 'Save'}</button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* TAB 6: TESTIMONIALS */}
            {activeTab === 'testimonials' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#0d5c46]/20 pb-4">
                  <h4 className="text-base font-display font-bold text-white">{lang === 'bn' ? 'গ্রাহকদের মতামত ব্যবস্থাপন' : 'Manage Testimonials'}</h4>
                  {!isAdding && !editingItem && (
                    <button
                      onClick={() => {
                        setEditingItem({ name: '', nameEn: '', designation: '', designationEn: '', review: '', reviewEn: '', rating: 5, photoUrl: '' });
                        setIsAdding(true);
                      }}
                      className="flex items-center space-x-1 bg-[#e6b325] text-black px-4 py-1.5 rounded-full font-sans font-bold text-xs cursor-pointer shadow-lg"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{lang === 'bn' ? 'নতুন রিভিউ যুক্ত করুন' : 'Add Review'}</span>
                    </button>
                  )}
                </div>

                {!isAdding && !editingItem ? (
                  <div className="space-y-3">
                    {testimonials.map((t) => (
                      <div key={t.id} className="bg-[#041a14]/60 border border-[#0d5c46]/40 p-4 rounded-xl flex items-center justify-between text-left">
                        <div className="flex items-center space-x-3 overflow-hidden">
                          <img src={t.photoUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"} alt={t.name} className="w-12 h-12 rounded-full object-cover shrink-0" />
                          <div className="overflow-hidden">
                            <h5 className="font-display font-bold text-white text-sm truncate">{lang === 'bn' ? t.name : t.nameEn}</h5>
                            <p className="text-[10px] text-[#e6b325] font-sans truncate">{lang === 'bn' ? t.designation : t.designationEn}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2 shrink-0 ml-4">
                          <button
                            onClick={() => setEditingItem({ ...t })}
                            className="p-1.5 bg-[#0d5c46]/20 text-[#e6b325] rounded hover:bg-[#0d5c46]/30 transition-colors"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteItem('testimonials', t.id)}
                            className="p-1.5 bg-red-500/10 text-red-400 rounded hover:bg-red-500/20 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); handleEntitySave('testimonials', editingItem); }} className="space-y-4 text-left">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-gray-300 font-bold">গ্রাহক নাম (বাংলা)</label>
                        <input type="text" required value={editingItem.name} onChange={e => setEditingItem({ ...editingItem, name: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-gray-300 font-bold">Client Name (English)</label>
                        <input type="text" required value={editingItem.nameEn} onChange={e => setEditingItem({ ...editingItem, nameEn: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-gray-300 font-bold">পদবী/পরিচয় (বাংলা)</label>
                        <input type="text" required value={editingItem.designation} onChange={e => setEditingItem({ ...editingItem, designation: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-gray-300 font-bold">Designation (English)</label>
                        <input type="text" required value={editingItem.designationEn} onChange={e => setEditingItem({ ...editingItem, designationEn: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-gray-300 font-bold">স্টার রেটিং (১ থেকে ৫)</label>
                        <input type="number" min={1} max={5} required value={editingItem.rating} onChange={e => setEditingItem({ ...editingItem, rating: Number(e.target.value) })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-gray-300 font-bold">প্রোফাইল ছবি URL</label>
                        <input type="text" value={editingItem.photoUrl} onChange={e => setEditingItem({ ...editingItem, photoUrl: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white font-mono" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-gray-300 font-bold">মতামত/রিভিউ (বাংলা)</label>
                      <textarea required rows={3} value={editingItem.review} onChange={e => setEditingItem({ ...editingItem, review: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white resize-none" />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-gray-300 font-bold">Review Description (English)</label>
                      <textarea required rows={3} value={editingItem.reviewEn} onChange={e => setEditingItem({ ...editingItem, reviewEn: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white resize-none" />
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                      <button type="button" onClick={() => { setEditingItem(null); setIsAdding(false); }} className="px-4 py-2 bg-transparent text-gray-400 hover:text-white rounded text-xs">{lang === 'bn' ? 'বাতিল' : 'Cancel'}</button>
                      <button type="submit" className="px-5 py-2 bg-[#0d5c46] hover:bg-[#0d5c46]/80 text-white border border-[#e6b325] rounded-full text-xs font-bold">{lang === 'bn' ? 'সংরক্ষণ' : 'Save'}</button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* TAB 7: BLOGS */}
            {activeTab === 'blogs' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#0d5c46]/20 pb-4">
                  <h4 className="text-base font-display font-bold text-white">{lang === 'bn' ? 'ব্লগ এবং টিপস ব্যবস্থাপন' : 'Manage Blog Articles'}</h4>
                  {!isAdding && !editingItem && (
                    <button
                      onClick={() => {
                        setEditingItem({ title: '', titleEn: '', category: 'টিপস', categoryEn: 'Tips', content: '', contentEn: '', imageUrl: '', author: 'ইঞ্জি: আমিনুল ইসলাম', authorEn: 'Engr. Aminul Islam', date: new Date().toLocaleDateString('bn-BD'), tags: [] });
                        setIsAdding(true);
                      }}
                      className="flex items-center space-x-1 bg-[#e6b325] text-black px-4 py-1.5 rounded-full font-sans font-bold text-xs cursor-pointer shadow-lg"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{lang === 'bn' ? 'নতুন ব্লগ যুক্ত করুন' : 'Add Blog'}</span>
                    </button>
                  )}
                </div>

                {!isAdding && !editingItem ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {blogs.map((b) => (
                      <div key={b.id} className="bg-[#041a14]/60 border border-[#0d5c46]/40 p-4 rounded-xl flex items-center justify-between text-left">
                        <div className="flex items-center space-x-3 overflow-hidden">
                          <img src={b.imageUrl} alt={b.title} className="w-12 h-12 rounded object-cover shrink-0" />
                          <div className="overflow-hidden">
                            <h5 className="font-display font-bold text-white text-sm truncate">{lang === 'bn' ? b.title : b.titleEn}</h5>
                            <span className="text-[8px] bg-[#e6b325]/20 text-[#e6b325] px-1.5 py-0.5 rounded font-bold uppercase">{b.categoryEn}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2 shrink-0 ml-4">
                          <button
                            onClick={() => setEditingItem({ ...b })}
                            className="p-1.5 bg-[#0d5c46]/20 text-[#e6b325] rounded hover:bg-[#0d5c46]/30 transition-colors"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteItem('blogs', b.id)}
                            className="p-1.5 bg-red-500/10 text-red-400 rounded hover:bg-red-500/20 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); handleEntitySave('blogs', editingItem); }} className="space-y-4 text-left">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-gray-300 font-bold">ব্লগ শিরোনাম (বাংলা)</label>
                        <input type="text" required value={editingItem.title} onChange={e => setEditingItem({ ...editingItem, title: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-gray-300 font-bold">Blog Title (English)</label>
                        <input type="text" required value={editingItem.titleEn} onChange={e => setEditingItem({ ...editingItem, titleEn: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-gray-300 font-bold">লেখক নাম</label>
                        <input type="text" required value={editingItem.author} onChange={e => setEditingItem({ ...editingItem, author: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-gray-300 font-bold">ক্যাটাগরি</label>
                        <input type="text" required value={editingItem.category} onChange={e => setEditingItem({ ...editingItem, category: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white" />
                      </div>
                      <div className="space-y-1">
                        <ImageUploader 
                          value={editingItem.imageUrl || ''} 
                          onChange={val => setEditingItem({ ...editingItem, imageUrl: val })} 
                          label={lang === 'bn' ? 'কভার ছবি (Cover Photo)' : 'Cover Photo'}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-gray-300 font-bold">ব্লগ বিস্তারিত কনটেন্ট (বাংলা)</label>
                      <textarea required rows={6} value={editingItem.content} onChange={e => setEditingItem({ ...editingItem, content: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white resize-none" />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-gray-300 font-bold">Blog Full Content (English)</label>
                      <textarea required rows={6} value={editingItem.contentEn} onChange={e => setEditingItem({ ...editingItem, contentEn: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white resize-none" />
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                      <button type="button" onClick={() => { setEditingItem(null); setIsAdding(false); }} className="px-4 py-2 bg-transparent text-gray-400 hover:text-white rounded text-xs">{lang === 'bn' ? 'বাতিল' : 'Cancel'}</button>
                      <button type="submit" className="px-5 py-2 bg-[#0d5c46] hover:bg-[#0d5c46]/80 text-white border border-[#e6b325] rounded-full text-xs font-bold">{lang === 'bn' ? 'সংরক্ষণ' : 'Save'}</button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* TAB 8: FAQS */}
            {activeTab === 'faqs' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#0d5c46]/20 pb-4">
                  <h4 className="text-base font-display font-bold text-white">{lang === 'bn' ? 'জিজ্ঞাসাসমূহ ব্যবস্থাপন' : 'Manage FAQ Accordions'}</h4>
                  {!isAdding && !editingItem && (
                    <button
                      onClick={() => {
                        setEditingItem({ question: '', questionEn: '', answer: '', answerEn: '' });
                        setIsAdding(true);
                      }}
                      className="flex items-center space-x-1 bg-[#e6b325] text-black px-4 py-1.5 rounded-full font-sans font-bold text-xs cursor-pointer shadow-lg"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{lang === 'bn' ? 'নতুন প্রশ্ন যুক্ত করুন' : 'Add FAQ'}</span>
                    </button>
                  )}
                </div>

                {!isAdding && !editingItem ? (
                  <div className="space-y-3">
                    {faqs.map((f) => (
                      <div key={f.id} className="bg-[#041a14]/60 border border-[#0d5c46]/40 p-4 rounded-xl flex items-center justify-between text-left">
                        <div className="overflow-hidden pr-4">
                          <h5 className="font-display font-bold text-white text-sm truncate">{lang === 'bn' ? f.question : f.questionEn}</h5>
                          <p className="text-[10px] text-gray-400 truncate font-sans">{lang === 'bn' ? f.answer : f.answerEn}</p>
                        </div>
                        <div className="flex space-x-2 shrink-0">
                          <button
                            onClick={() => setEditingItem({ ...f })}
                            className="p-1.5 bg-[#0d5c46]/20 text-[#e6b325] rounded hover:bg-[#0d5c46]/30 transition-colors"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteItem('faqs', f.id)}
                            className="p-1.5 bg-red-500/10 text-red-400 rounded hover:bg-red-500/20 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); handleEntitySave('faqs', editingItem); }} className="space-y-4 text-left">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-gray-300 font-bold">জিজ্ঞাসা প্রশ্ন (বাংলা)</label>
                        <input type="text" required value={editingItem.question} onChange={e => setEditingItem({ ...editingItem, question: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-gray-300 font-bold">FAQ Question (English)</label>
                        <input type="text" required value={editingItem.questionEn} onChange={e => setEditingItem({ ...editingItem, questionEn: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-gray-300 font-bold">উত্তর (বাংলা)</label>
                      <textarea required rows={4} value={editingItem.answer} onChange={e => setEditingItem({ ...editingItem, answer: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white resize-none" />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-gray-300 font-bold">FAQ Answer (English)</label>
                      <textarea required rows={4} value={editingItem.answerEn} onChange={e => setEditingItem({ ...editingItem, answerEn: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white resize-none" />
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                      <button type="button" onClick={() => { setEditingItem(null); setIsAdding(false); }} className="px-4 py-2 bg-transparent text-gray-400 hover:text-white rounded text-xs">{lang === 'bn' ? 'বাতিল' : 'Cancel'}</button>
                      <button type="submit" className="px-5 py-2 bg-[#0d5c46] hover:bg-[#0d5c46]/80 text-white border border-[#e6b325] rounded-full text-xs font-bold">{lang === 'bn' ? 'সংরক্ষণ' : 'Save'}</button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* TAB 9: TEAM MEMBERS */}
            {activeTab === 'team' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#0d5c46]/20 pb-4">
                  <h4 className="text-base font-display font-bold text-white">{lang === 'bn' ? 'প্রকৌশলী ও স্থপতি প্যানেল' : 'Manage Team Engineers'}</h4>
                  {!isAdding && !editingItem && (
                    <button
                      onClick={() => {
                        setEditingItem({ name: '', nameEn: '', designation: '', designationEn: '', photoUrl: '', socialFacebook: '#', socialLinkedin: '#' });
                        setIsAdding(true);
                      }}
                      className="flex items-center space-x-1 bg-[#e6b325] text-black px-4 py-1.5 rounded-full font-sans font-bold text-xs cursor-pointer shadow-lg"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{lang === 'bn' ? 'নতুন সদস্য যুক্ত করুন' : 'Add Team Member'}</span>
                    </button>
                  )}
                </div>

                {!isAdding && !editingItem ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {team.map((tm) => (
                      <div key={tm.id} className="bg-[#041a14]/60 border border-[#0d5c46]/40 p-4 rounded-xl flex items-center justify-between text-left">
                        <div className="flex items-center space-x-3 overflow-hidden">
                          <img src={tm.photoUrl} alt={tm.name} className="w-12 h-12 rounded-full object-cover shrink-0" />
                          <div className="overflow-hidden">
                            <h5 className="font-display font-bold text-white text-sm truncate">{lang === 'bn' ? tm.name : tm.nameEn}</h5>
                            <p className="text-[10px] text-gray-400 truncate font-sans">{lang === 'bn' ? tm.designation : tm.designationEn}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2 shrink-0 ml-4">
                          <button
                            onClick={() => setEditingItem({ ...tm })}
                            className="p-1.5 bg-[#0d5c46]/20 text-[#e6b325] rounded hover:bg-[#0d5c46]/30 transition-colors"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteItem('team', tm.id)}
                            className="p-1.5 bg-red-500/10 text-red-400 rounded hover:bg-red-500/20 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); handleEntitySave('team', editingItem); }} className="space-y-4 text-left">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-gray-300 font-bold">সদস্য নাম (বাংলা)</label>
                        <input type="text" required value={editingItem.name} onChange={e => setEditingItem({ ...editingItem, name: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-gray-300 font-bold">Member Name (English)</label>
                        <input type="text" required value={editingItem.nameEn} onChange={e => setEditingItem({ ...editingItem, nameEn: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-gray-300 font-bold">পদবী/ডিজাইন (বাংলা)</label>
                        <input type="text" required value={editingItem.designation} onChange={e => setEditingItem({ ...editingItem, designation: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-gray-300 font-bold">Designation (English)</label>
                        <input type="text" required value={editingItem.designationEn} onChange={e => setEditingItem({ ...editingItem, designationEn: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <ImageUploader 
                          value={editingItem.photoUrl || ''} 
                          onChange={val => setEditingItem({ ...editingItem, photoUrl: val })} 
                          label={lang === 'bn' ? 'প্রোফাইল ছবি (Profile Photo)' : 'Profile Photo'}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-gray-300 font-bold">Facebook লিংক</label>
                        <input type="text" value={editingItem.socialFacebook} onChange={e => setEditingItem({ ...editingItem, socialFacebook: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white font-mono" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-gray-300 font-bold">LinkedIn লিংক</label>
                        <input type="text" value={editingItem.socialLinkedin} onChange={e => setEditingItem({ ...editingItem, socialLinkedin: e.target.value })} className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl px-4 py-2 text-xs text-white font-mono" />
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                      <button type="button" onClick={() => { setEditingItem(null); setIsAdding(false); }} className="px-4 py-2 bg-transparent text-gray-400 hover:text-white rounded text-xs">{lang === 'bn' ? 'বাতিল' : 'Cancel'}</button>
                      <button type="submit" className="px-5 py-2 bg-[#0d5c46] hover:bg-[#0d5c46]/80 text-white border border-[#e6b325] rounded-full text-xs font-bold">{lang === 'bn' ? 'সংরক্ষণ' : 'Save'}</button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* TAB 10: BACKUP AND SYNC */}
            {activeTab === 'backup' && (
              <div className="space-y-6 text-left">
                <div className="border-b border-[#0d5c46]/20 pb-4">
                  <h4 className="text-base font-display font-bold text-white">{lang === 'bn' ? 'ডাটাবেজ ব্যাকআপ এবং পুনরুদ্ধার' : 'Database Backups & Cloud Restore'}</h4>
                  <p className="text-xs text-gray-400">{lang === 'bn' ? 'আপনার সকল প্রজেক্ট, ব্লগ, কন্সাল্টেশন সেটিংস নিরাপদ রাখতে একটি ব্যাকআপ ফাইল তৈরি করে রাখুন।' : 'Preserve entire services, projects, settings, and reviews in a single JSON schema.'}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                  {/* Backup Card */}
                  <div className="bg-[#041a14] border border-[#0d5c46]/40 p-6 rounded-2xl flex flex-col justify-between space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-[#e6b325]/10 text-[#e6b325] rounded-xl">
                        <DatabaseBackup className="w-6 h-6" />
                      </div>
                      <div>
                        <h5 className="font-display font-bold text-white text-sm">{lang === 'bn' ? 'সম্পূর্ণ ডাটাবেজ ব্যাকআপ' : 'Export DB Backup'}</h5>
                        <p className="text-[10px] text-gray-400 font-sans">{lang === 'bn' ? 'ব্যাকআপ ফাইলটি .json ফরম্যাটে সেভ হবে।' : 'Downloads single-file JSON package of database.'}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleBackupExport}
                      className="w-full bg-[#0d5c46] hover:bg-[#094131] text-white border border-[#e6b325] py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md"
                    >
                      {lang === 'bn' ? 'ডাউনলোড ব্যাকআপ' : 'Download JSON Backup'}
                    </button>
                  </div>

                  {/* Restore Card */}
                  <div className="bg-[#041a14] border border-[#0d5c46]/40 p-6 rounded-2xl flex flex-col justify-between space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-[#e6b325]/10 text-[#e6b325] rounded-xl">
                        <Database className="w-6 h-6" />
                      </div>
                      <div>
                        <h5 className="font-display font-bold text-white text-sm">{lang === 'bn' ? 'ব্যাকআপ ফাইল রিস্টোর' : 'Restore Cloud Backup'}</h5>
                        <p className="text-[10px] text-gray-400 font-sans">{lang === 'bn' ? 'ডাউনলোডকৃত ব্যাকআপ ফাইলটি আপলোড করুন।' : 'Overwrites collections based on your uploaded JSON file.'}</p>
                      </div>
                    </div>
                    <label className="w-full bg-transparent hover:bg-white/5 text-[#e6b325] border border-[#e6b325] py-2.5 rounded-xl text-xs font-bold text-center cursor-pointer transition-all block">
                      <span>{lang === 'bn' ? 'ফাইল সিলেক্ট করুন' : 'Select JSON File'}</span>
                      <input type="file" accept=".json" onChange={handleBackupRestore} className="hidden" />
                    </label>
                  </div>
                </div>

                <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 font-sans text-xs flex items-start space-x-2 mt-8">
                  <div className="shrink-0 mt-0.5 font-bold">⚠️ সতর্কীকরণ:</div>
                  <p>{lang === 'bn' ? 'রিস্টোর অপারেশন বর্তমান সকল ডাটা ওভাররাইট করবে। অনুগ্রহ করে সতর্কতা অবলম্বন করুন।' : 'Restoring a JSON file will synchronize and overwrite existing database schemas. Maintain caution.'}</p>
                </div>

                {/* Supabase Integration & Vercel Setup Guide */}
                <div className="mt-8 border-t border-[#0d5c46]/20 pt-6 space-y-4">
                  <div>
                    <h4 className="text-base font-display font-bold text-white flex items-center space-x-2">
                      <Database className="w-5 h-5 text-[#e6b325]" />
                      <span>{lang === 'bn' ? 'সুপাবেস (Supabase) এবং ভার্সেল (Vercel) সেটআপ গাইড' : 'Supabase & Vercel Setup Guide'}</span>
                    </h4>
                    <p className="text-xs text-gray-400 mt-1">
                      {lang === 'bn' 
                        ? 'আপনার সকল ডাটা সুপাবেস ডাটাবেজে সংরক্ষণ করতে এবং ভার্সেলে ওয়েবসাইট পাবলিশ করতে নিচের ধাপগুলো অনুসরণ করুন।' 
                        : 'Easily store all your data in Supabase and deploy your website to Vercel by following these simple steps.'}
                    </p>
                  </div>

                  <div className="bg-[#041a14] border border-[#0d5c46]/40 rounded-2xl p-5 space-y-4">
                    <div className="space-y-3 text-xs text-gray-300">
                      <p className="font-semibold text-[#e6b325]">{lang === 'bn' ? 'ধাপ ১: সুপাবেস ডাটাবেজ টেবিল তৈরি করুন' : 'Step 1: Create Supabase Tables'}</p>
                      <p>
                        {lang === 'bn' 
                          ? 'সুপাবেসে লগইন করে আপনার প্রজেক্টের "SQL Editor" এ যান। নিচের কোডটি কপি করে রান করলেই সব টেবিল নিজে থেকেই তৈরি হয়ে যাবে:' 
                          : 'Go to your Supabase project dashboard, open the "SQL Editor" tab, paste the SQL code below, and click Run:'}
                      </p>

                      <div className="relative bg-black/50 rounded-xl p-4 font-mono text-[10px] text-gray-300 overflow-x-auto max-h-48 border border-[#0d5c46]/20">
                        <pre>{SUPABASE_SQL_SCHEMA}</pre>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
                            showNotification(lang === 'bn' ? 'SQL স্ক্রিপ্ট কপি হয়েছে!' : 'SQL script copied!', 'success');
                          }}
                          className="absolute top-2 right-2 bg-[#0d5c46] hover:bg-[#094131] text-white px-3 py-1 rounded-md text-[10px] font-bold cursor-pointer transition-all"
                        >
                          {lang === 'bn' ? 'কপি করুন' : 'Copy'}
                        </button>
                      </div>

                      <p className="font-semibold text-[#e6b325] mt-4">{lang === 'bn' ? 'ধাপ ২: ভার্সেল (Vercel) এ এনভায়রনমেন্ট ভেরিয়েবল যুক্ত করুন' : 'Step 2: Add Environment Variables in Vercel'}</p>
                      <p>
                        {lang === 'bn' 
                          ? 'ভার্সেলে আপনার প্রজেক্টের Settings > Environment Variables এ গিয়ে নিচের দুটি ভেরিয়েবল সেট করুন:' 
                          : 'In your Vercel project, go to Settings > Environment Variables and configure these two variables:'}
                      </p>
                      <ul className="list-disc list-inside space-y-1 bg-black/20 p-3 rounded-xl border border-[#0d5c46]/10">
                        <li><strong>VITE_SUPABASE_URL</strong> = <span className="text-[#e6b325]">your-supabase-url</span></li>
                        <li><strong>VITE_SUPABASE_ANON_KEY</strong> = <span className="text-[#e6b325]">your-anon-key</span></li>
                      </ul>

                      <p className="text-gray-400">
                        {lang === 'bn'
                          ? '💡 এই ভেরিয়েবল দুটি সেট করার সাথে সাথে ওয়েবসাইটটি নিজে থেকেই ফায়ারস্টোরের বদলে সুপাবেস ডাটাবেজ ব্যবহার করা শুরু করবে!'
                          : '💡 Once these environment variables are set in Vercel, the app will automatically switch from Firestore to Supabase for saving and reading all data!'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      </div>

      {successPopup?.show && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#05221b] border-2 border-[#e6b325] rounded-3xl w-full max-w-sm p-6 text-center shadow-2xl relative overflow-hidden"
          >
            {/* Ambient styling circles */}
            <div className="absolute -top-12 -left-12 w-24 h-24 bg-[#e6b325]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-[#0d5c46]/20 rounded-full blur-2xl pointer-events-none" />

            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#0d5c46] to-[#041a14] border-2 border-[#e6b325] flex items-center justify-center mx-auto mb-4 text-[#e6b325] shadow-lg shadow-[#e6b325]/10">
              <Check className="w-8 h-8 animate-pulse stroke-[3px]" />
            </div>

            <h4 className="text-lg font-display font-black text-white mb-2">
              {lang === 'bn' ? 'সফল হয়েছে!' : 'Action Successful!'}
            </h4>

            <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed mb-6">
              {successPopup.message}
            </p>

            <button
              onClick={() => setSuccessPopup(null)}
              className="w-full bg-gradient-to-r from-[#e6b325] to-[#f3c647] hover:scale-[1.02] text-[#041a14] font-sans font-extrabold text-xs py-3 rounded-xl shadow-lg shadow-[#e6b325]/20 transition-all cursor-pointer"
            >
              {lang === 'bn' ? 'ঠিক আছে' : 'Awesome'}
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};
export default AdminPanel;
