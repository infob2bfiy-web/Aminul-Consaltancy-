import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { motion } from 'motion/react';
import { MapPin, Phone, MessageSquare, Mail, Clock, Send, ShieldCheck } from 'lucide-react';

export const Contact: React.FC = () => {
  const { lang, settings, submitContactForm } = useApp();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      alert(lang === 'bn' ? 'দয়া করে নাম, মোবাইল নম্বর এবং আপনার বার্তা লিখুন।' : 'Please enter your Name, Phone and Message.');
      return;
    }

    setSubmitting(true);
    const completed = await submitContactForm(
      formData.name,
      formData.phone,
      formData.email,
      formData.subject,
      formData.message
    );
    setSubmitting(false);

    if (completed) {
      setSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: ''
      });
      setTimeout(() => setSuccess(false), 8000);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#041a14] relative overflow-hidden">
      
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0d5c46] to-transparent" />
      <div className="absolute top-1/2 right-10 w-96 h-96 rounded-full bg-[#e6b325]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h3 className="text-xs uppercase tracking-widest text-[#e6b325] font-display font-bold">
            {lang === 'bn' ? 'যোগাযোগ ও বুকিং' : 'Contact & Booking'}
          </h3>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            {lang === 'bn' ? 'আমাদের সাথে আলোচনা করুন' : 'Request Free Consultation'}
          </h2>
          <div className="w-16 h-1 bg-[#e6b325] mx-auto rounded-full" />
          <p className="text-gray-300 font-sans text-sm sm:text-base">
            {lang === 'bn' ? (
              "আপনার প্রজেক্টের সঠিক পরিকল্পনা ও খরচের হিসেব পেতে আজই আমাদের অভিজ্ঞ প্রকৌশলীদের সাথে ফ্রি কন্সাল্টেশন সেশন বুক করুন।"
            ) : (
              "Reach out to book a dedicated physical site review, raw material estimation forecast, or discuss custom duplex floor maps."
            )}
          </p>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left: Office details */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#05221b] to-[#041a14] border border-[#0d5c46]/40 rounded-3xl p-6 sm:p-10 text-left flex flex-col justify-between shadow-xl">
            
            <div className="space-y-8">
              <h4 className="text-xl font-display font-bold text-white tracking-tight">
                {lang === 'bn' ? 'অফিস ঠিকানা ও যোগাযোগ' : 'Head Office Details'}
              </h4>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-[#e6b325]/10 text-[#e6b325] rounded-xl shrink-0 mt-1">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-display font-bold text-sm text-gray-300 uppercase tracking-wider">{lang === 'bn' ? 'আমাদের প্রধান অফিস' : 'Office Address'}</h5>
                    <p className="text-white font-sans text-xs sm:text-sm leading-relaxed mt-1">{lang === 'bn' ? settings.officeAddress : settings.officeAddressEn}</p>
                  </div>
                </div>

                {/* Mobile / Call */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-[#e6b325]/10 text-[#e6b325] rounded-xl shrink-0 mt-1">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-display font-bold text-sm text-gray-300 uppercase tracking-wider">{lang === 'bn' ? 'মোবাইল নম্বর' : 'Phone Call'}</h5>
                    <a href={`tel:${settings.contactPhone}`} className="text-[#e6b325] hover:underline font-mono text-xs sm:text-sm block mt-1">{settings.contactPhone}</a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-[#e6b325]/10 text-[#e6b325] rounded-xl shrink-0 mt-1">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-display font-bold text-sm text-gray-300 uppercase tracking-wider">{lang === 'bn' ? 'হোয়াটসঅ্যাপ' : 'WhatsApp'}</h5>
                    <a href={`https://wa.me/${settings.whatsappNumber.replace(/[^\d]/g, '')}`} target="_blank" rel="noreferrer" className="text-green-400 hover:underline font-mono text-xs sm:text-sm block mt-1">{settings.whatsappNumber}</a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-[#e6b325]/10 text-[#e6b325] rounded-xl shrink-0 mt-1">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-display font-bold text-sm text-gray-300 uppercase tracking-wider">{lang === 'bn' ? 'ইমেইল অ্যাড্রেস' : 'Official Email'}</h5>
                    <a href={`mailto:${settings.contactEmail}`} className="text-white hover:underline font-sans text-xs sm:text-sm block mt-1">{settings.contactEmail}</a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-[#e6b325]/10 text-[#e6b325] rounded-xl shrink-0 mt-1">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-display font-bold text-sm text-gray-300 uppercase tracking-wider">{lang === 'bn' ? 'অফিস সময়সূচী' : 'Working Hours'}</h5>
                    <p className="text-white font-sans text-xs sm:text-sm block mt-1">{lang === 'bn' ? settings.workingHours : settings.workingHoursEn}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick trust message */}
            <div className="pt-8 border-t border-[#0d5c46]/20 mt-8 text-xs text-gray-400 font-sans flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-[#e6b325] shrink-0" />
              <span>{lang === 'bn' ? 'আপনার তথ্য সম্পূর্ণ গোপন ও সুরক্ষিত থাকবে।' : 'Your data will remain completely secure and confidential.'}</span>
            </div>

          </div>

          {/* Right: Interactive Contact form */}
          <div className="lg:col-span-7 bg-[#05221b]/80 border-2 border-[#0d5c46]/40 rounded-3xl p-6 sm:p-10 text-left shadow-xl flex flex-col justify-between">
            <form onSubmit={handleFormSubmit} className="space-y-5">
              <h4 className="text-xl font-display font-bold text-white tracking-tight mb-2">
                {lang === 'bn' ? 'আমাদের চিঠি লিখুন' : 'Send An Online Message'}
              </h4>

              {success && (
                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 font-sans text-xs sm:text-sm flex items-center space-x-2 animate-in fade-in">
                  <ShieldCheck className="w-5 h-5 text-green-400 shrink-0" />
                  <div>
                    <p className="font-bold">{lang === 'bn' ? 'বার্তা সফলভাবে পাঠানো হয়েছে!' : 'Message Sent Successfully!'}</p>
                    <p className="text-xs text-gray-300 mt-0.5">
                      {lang === 'bn' ? 'আমাদের কাস্টমার কেয়ার প্রতিনিধি ২৪ ঘণ্টার মধ্যে যোগাযোগ করবেন।' : 'Our customer care desk will reach out to you within 24 business hours.'}
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-display font-bold text-gray-300">{lang === 'bn' ? 'আপনার নাম' : 'Full Name'} <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    name="name"
                    required
                    maxLength={100}
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={lang === 'bn' ? 'যেমন: জনাব হাবিবুর রহমান' : 'e.g. Mr. Habibur Rahman'}
                    className="w-full bg-[#041410] border border-[#0d5c46]/60 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#e6b325] transition-colors"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-display font-bold text-gray-300">{lang === 'bn' ? 'মোবাইল নম্বর' : 'Phone Number'} <span className="text-rose-500">*</span></label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    maxLength={20}
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={lang === 'bn' ? 'যেমন: +৮৮০১৭১২-৩৪৫৬৭৮' : 'e.g. +8801712-345678'}
                    className="w-full bg-[#041410] border border-[#0d5c46]/60 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#e6b325] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Email */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-display font-bold text-gray-300">{lang === 'bn' ? 'ইমেইল অ্যাড্রেস' : 'Email Address'}</label>
                  <input
                    type="email"
                    name="email"
                    maxLength={100}
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={lang === 'bn' ? 'যেমন: email@example.com' : 'e.g. email@example.com'}
                    className="w-full bg-[#041410] border border-[#0d5c46]/60 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#e6b325] transition-colors"
                  />
                </div>

                {/* Subject */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-display font-bold text-gray-300">{lang === 'bn' ? 'বিষয়' : 'Subject'}</label>
                  <input
                    type="text"
                    name="subject"
                    maxLength={150}
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder={lang === 'bn' ? 'যেমন: ডুপ্লেক্স বাড়ির নকশা কন্সাল্টেশন' : 'e.g. Duplex Villa Floor Planning'}
                    className="w-full bg-[#041410] border border-[#0d5c46]/60 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#e6b325] transition-colors"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-display font-bold text-gray-300">{lang === 'bn' ? 'আপনার বিস্তারিত বার্তা' : 'Message details'} <span className="text-rose-500">*</span></label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  maxLength={1000}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={lang === 'bn' ? 'আপনার জমি কত কাঠা, কি ধরণের ভবন করতে চান বা সেবার ধরণ বিস্তারিত লিখুন...' : 'Write down your land size, desired building stories, or any soil investigation query...'}
                  className="w-full bg-[#041410] border border-[#0d5c46]/60 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#e6b325] transition-colors resize-none"
                />
              </div>

              {/* Submit CTA button */}
              <div className="pt-2 text-right">
                <button
                  type="submit"
                  disabled={submitting}
                  className="group flex items-center justify-center space-x-2 bg-[#0d5c46] hover:bg-[#084131] text-white border border-[#e6b325] disabled:bg-gray-700 disabled:border-gray-600 disabled:text-gray-400 px-7 py-3 rounded-full font-sans font-bold text-xs cursor-pointer shadow-lg tracking-wider"
                >
                  <Send className="w-3.5 h-3.5 text-[#e6b325] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  <span>{submitting ? (lang === 'bn' ? 'পাঠানো হচ্ছে...' : 'Sending...') : (lang === 'bn' ? 'অনুরোধ পাঠান' : 'Submit Consultation Request')}</span>
                </button>
              </div>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
