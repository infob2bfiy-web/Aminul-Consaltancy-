import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageSquare, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const ContactSection: React.FC = () => {
  const { data, lang, submitMessage } = useApp();
  
  // Form States
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Newsletter State
  const [newsEmail, setNewsEmail] = useState("");
  const [newsSuccess, setNewsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Simple Field Validations
    if (!name.trim()) {
      setErrorMsg(lang === "bn" ? "আপনার নাম পূরণ করুন" : "Please fill in your name");
      return;
    }
    if (!phone.trim()) {
      setErrorMsg(lang === "bn" ? "আপনার মোবাইল নম্বরটি দিন" : "Please provide your mobile number");
      return;
    }
    if (!subject.trim()) {
      setErrorMsg(lang === "bn" ? "যোগাযোগের বিষয় নির্বাচন করুন বা লিখুন" : "Please enter a subject");
      return;
    }
    if (!message.trim()) {
      setErrorMsg(lang === "bn" ? "আপনার বার্তাটি লিখুন" : "Please write your message body");
      return;
    }

    setIsSubmitting(true);

    // Simulate short server submission delay
    setTimeout(() => {
      submitMessage({
        name,
        phone,
        email,
        subject,
        message
      });

      setIsSubmitting(false);
      setSuccess(true);
      
      // Clear fields
      setName("");
      setPhone("");
      setEmail("");
      setSubject("");
      setMessage("");

      // Dismiss success alert after 5s
      setTimeout(() => setSuccess(false), 5000);
    }, 1000);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsEmail.trim()) return;
    setNewsSuccess(true);
    setNewsEmail("");
    setTimeout(() => setNewsSuccess(false), 5000);
  };

  return (
    <section id="contact" className="py-20 bg-[#06241D] text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#E6B325]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#E6B325] text-xs font-bold uppercase tracking-widest block mb-2">
            {lang === "bn" ? "যোগাযোগ করুন" : "Connect With Us"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            {lang === "bn" ? "আপনার প্রজেক্টের সঠিক রূপরেখা তৈরি করুন" : "Let's Construct Your Future"}
          </h2>
          <div className="w-20 h-1 bg-[#E6B325] mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-gray-300 text-sm sm:text-base leading-relaxed">
            {lang === "bn" ? (
              "আমাদের প্রকৌশলী ও স্থপতি দল আপনার সমস্যা শুনতে প্রস্তুত। ড্রয়িং অনুমোদন, সয়েল টেস্ট বা প্রজেক্ট সুপারভিশনের জন্য আজই মেসেজ দিন।"
            ) : (
              "We provide custom estimates, code approvals, civil masonry audits, and turnkeys. Drop us your location criteria and project expectations."
            )}
          </p>
        </div>

        {/* Contact Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-stretch">
          
          {/* Left Column: Coordinates & Embedded Google Maps (5 Columns) */}
          <div className="col-span-1 lg:col-span-5 space-y-6 flex flex-col justify-between">
            
            <div className="bg-[#0b3c2e] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
              <h3 className="text-lg sm:text-xl font-bold text-white border-b border-white/10 pb-3">
                {lang === "bn" ? "অফিস ঠিকানা ও কন্টাক্ট" : "Office Location & Contact"}
              </h3>

              <div className="space-y-4">
                
                <div className="flex items-start space-x-3.5">
                  <div className="p-2 bg-[#042018] rounded-lg text-[#E6B325] shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase tracking-wider">
                      {lang === "bn" ? "প্রধান কার্যালয়" : "HEAD OFFICE"}
                    </span>
                    <p className="text-sm text-gray-200 mt-0.5 leading-relaxed">
                      {data.settings.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2 bg-[#042018] rounded-lg text-[#E6B325] shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase tracking-wider">
                      {lang === "bn" ? "হটলাইন নম্বর" : "HOTLINE PHONE"}
                    </span>
                    <p className="text-sm text-[#E6B325] font-bold mt-0.5">
                      {data.settings.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2 bg-[#042018] rounded-lg text-[#E6B325] shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase tracking-wider">
                      {lang === "bn" ? "ইমেইল করুন" : "EMAIL ADDRESS"}
                    </span>
                    <p className="text-sm text-gray-200 mt-0.5">
                      {data.settings.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2 bg-[#042018] rounded-lg text-[#E6B325] shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase tracking-wider">
                      {lang === "bn" ? "অফিস সময়" : "WORKING HOURS"}
                    </span>
                    <p className="text-sm text-gray-200 mt-0.5">
                      {data.settings.workingHours}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="h-56 sm:h-64 rounded-2xl overflow-hidden border-2 border-white/10 shadow bg-emerald-950">
              <iframe
                src={data.settings.googleMapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                title="Aminul Engineers Head Office Location"
              ></iframe>
            </div>

          </div>

          {/* Right Column: Contact Form with State saving (7 Columns) */}
          <div className="col-span-1 lg:col-span-7 bg-[#0b3c2e] border-2 border-[#E6B325]/20 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
            
            <h3 className="text-lg sm:text-xl font-bold text-white border-b border-white/10 pb-3 flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-[#E6B325]" />
              <span>{lang === "bn" ? "ফ্রি কনসালটেশন ক্যোয়ারী ফর্ম" : "Inquire Free Engineering Consultation"}</span>
            </h3>

            {/* Form Box */}
            <form onSubmit={handleSubmit} className="space-y-4 mt-5">
              
              {/* Notifications panel */}
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-emerald-950 border-2 border-emerald-500 text-emerald-300 rounded-lg p-3.5 flex items-start space-x-2.5 text-xs sm:text-sm font-sans"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong>
                        {lang === "bn" ? "ধন্যবাদ! বার্তাটি সফলভাবে প্রেরণ করা হয়েছে।" : "Thank you! Inquiry logged successfully."}
                      </strong>
                      <p className="text-[11px] text-emerald-400 mt-0.5">
                        {lang === "bn"
                          ? "আমাদের কাস্টমার কেয়ার ও স্ট্রাকচার টিম খুব দ্রুত আপনার মোবাইল নাম্বারে যোগাযোগ করবে।"
                          : "Our lead engineers will check your specs and phone you shortly."}
                      </p>
                    </div>
                  </motion.div>
                )}

                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-red-950 border-2 border-red-500 text-red-300 rounded-lg p-3 flex items-center space-x-2 text-xs font-sans"
                  >
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{errorMsg}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wide">
                    {lang === "bn" ? "আপনার নাম (অবশ্যই)" : "Your Full Name (Required)"}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={lang === "bn" ? "উদা: রফিকুল ইসলাম" : "e.g. Rafiqul Islam"}
                    className="w-full bg-[#042018] border border-white/10 rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-[#E6B325] text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wide">
                    {lang === "bn" ? "মোবাইল নম্বর (অবশ্যই)" : "Mobile Phone (Required)"}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={lang === "bn" ? "উদা: ০১৭xxxxxxxx" : "e.g. 017xxxxxxxx"}
                    className="w-full bg-[#042018] border border-white/10 rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-[#E6B325] text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wide">
                    {lang === "bn" ? "ইমেইল এড্রেস (ঐচ্ছিক)" : "Email Address (Optional)"}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rafiq@example.com"
                    className="w-full bg-[#042018] border border-white/10 rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-[#E6B325] text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wide">
                    {lang === "bn" ? "সার্ভিস বিষয়" : "Inquiry Core Topic"}
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-[#042018] border border-white/10 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-[#E6B325] text-sm"
                  >
                    <option value="">{lang === "bn" ? "বিষয় সিলেক্ট করুন" : "Select Topic"}</option>
                    <option value="Architectural Planning">{lang === "bn" ? "আর্কিটেকচারাল প্ল্যানিং" : "Architectural Planning"}</option>
                    <option value="Structural Layout">{lang === "bn" ? "ভূমিকম্প সহনশীল স্ট্রাকচার ডিজাইন" : "Seismic Structural Layout"}</option>
                    <option value="Soil test / Geo survey">{lang === "bn" ? "ডিজিটাল সার্ভে ও সয়েল টেস্ট" : "Soil test / Topo survey"}</option>
                    <option value="Turnkey Construction">{lang === "bn" ? "ভবন নির্মাণ ও সশরীরে সুপারভিশন" : "Turnkey Building supervision"}</option>
                    <option value="Other Consultation">{lang === "bn" ? "অন্যান্য পরামর্শ" : "Other Consultation"}</option>
                  </select>
                </div>

              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wide">
                  {lang === "bn" ? "প্রজেক্টের বিবরণ / জমির আকার ও তলা সংখ্যা" : "Detailed Specifications & Land Area"}
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    lang === "bn"
                      ? "আমার ৩ কাঠা জমি আছে সিলেটে, ৫ তলা বাড়ির ড্রয়িং ও সয়েল টেস্ট কত খরচ পরবে?"
                      : "I have 3 katha plot in Sylhet. What are estimates for a G+4 storey approval?"
                  }
                  className="w-full bg-[#042018] border border-white/10 rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-[#E6B325] text-sm font-sans"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#E6B325] hover:bg-[#CD9B13] text-black font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition flex items-center justify-center space-x-2 transform active:scale-95 disabled:opacity-50 cursor-pointer text-sm"
              >
                <Send className="w-4 h-4" />
                <span>
                  {isSubmitting
                    ? (lang === "bn" ? "প্রেরণ করা হচ্ছে..." : "Sending Message...")
                    : (lang === "bn" ? "বার্তা প্রেরণ করুন" : "Submit Consultation Request")}
                </span>
              </button>

            </form>
          </div>

        </div>

        {/* Newsletter Subscription Block */}
        <div className="bg-[#0b3c2e] border border-white/10 rounded-2xl p-6 sm:p-10 text-center max-w-4xl mx-auto shadow-lg relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#E6B325]/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <h4 className="text-lg sm:text-xl font-bold text-[#E6B325]">
              {lang === "bn" ? "আমাদের সাপ্তাহিক কনস্ট্রাকশন টিপস ব্লগ সাবস্ক্রাইব করুন" : "Subscribe to Weekly Civil Tips & Code Updates"}
            </h4>
            <p className="text-xs text-gray-300 font-sans leading-relaxed">
              {lang === "bn"
                ? "নতুন নিয়মে বাড়ি তৈরির আইনি জটিলতা এড়াতে এবং স্টিল-সিমেন্টের বর্তমান বাজারদরের আপডেট পেতে আপনার ইমেইলটি সাবমিট করুন।"
                : "Join over 140+ smart Bangladeshi land buyers who receive cost-reducing architectural guidelines twice a month directly to inbox."}
            </p>

            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 pt-2">
              <input
                type="email"
                required
                value={newsEmail}
                onChange={(e) => setNewsEmail(e.target.value)}
                placeholder="rafiq@gmail.com"
                className="flex-grow bg-[#042018] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#E6B325] text-xs sm:text-sm"
              />
              <button
                type="submit"
                className="bg-[#E6B325] hover:bg-[#CD9B13] text-black font-bold py-2.5 px-6 rounded-lg transition text-xs sm:text-sm cursor-pointer shrink-0"
              >
                {lang === "bn" ? "সাবস্ক্রাইব করুন" : "Join Newsletter"}
              </button>
            </form>

            <AnimatePresence>
              {newsSuccess && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-emerald-400 font-bold"
                >
                  🎉 {lang === "bn" ? "সফলভাবে যুক্ত হয়েছেন! নিয়মিত আপডেট পাবেন।" : "Successfully subscribed! Welcome aboard."}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
};
