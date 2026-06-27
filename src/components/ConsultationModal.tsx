import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { X, Send, CheckCircle2, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const ConsultationModal: React.FC = () => {
  const { showConsultationModal, setShowConsultationModal, lang, submitMessage } = useApp();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [details, setDetails] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!showConsultationModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !details.trim()) {
      alert(lang === "bn" ? "দয়া করে প্রয়োজনীয় ফিল্ডগুলো পূরণ করুন" : "Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      submitMessage({
        name,
        phone,
        email,
        subject: topic || "Free Popup Consultation Request",
        message: details
      });

      setIsSubmitting(false);
      setSuccess(true);

      // Clear
      setName("");
      setPhone("");
      setEmail("");
      setTopic("");
      setDetails("");

      setTimeout(() => {
        setSuccess(false);
        setShowConsultationModal(false);
      }, 3000);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      
      {/* Black backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowConsultationModal(false)}
        className="absolute inset-0 bg-black/85 backdrop-blur-sm cursor-pointer"
      ></motion.div>

      {/* Modal Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-[#0b3c2e] border-2 border-[#E6B325]/40 rounded-2xl max-w-md w-full p-6 relative z-10 shadow-2xl text-white font-sans"
      >
        {/* Close Button */}
        <button
          onClick={() => setShowConsultationModal(false)}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/10 text-white cursor-pointer transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 bg-[#E6B325]/15 rounded-full flex items-center justify-center text-[#E6B325] mx-auto">
            <PhoneCall className="w-6 h-6 animate-pulse" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold tracking-tight">
            {lang === "bn" ? "ফ্রি কনসালটেশন ক্যোয়ারী" : "Free Consultation Request"}
          </h3>
          <p className="text-xs text-gray-300">
            {lang === "bn" ? "আপনার তথ্যগুলো দিন, আমাদের আর্কিটেক্ট দ্রুত যোগাযোগ করবে।" : "Submit details. Our structural engineers will call you."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
          
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-emerald-950 border border-emerald-500 rounded p-2.5 text-center text-emerald-400"
              >
                <CheckCircle2 className="w-4 h-4 inline-block mr-1.5 shrink-0" />
                <strong>{lang === "bn" ? "প্রেরণ করা হয়েছে!" : "Successfully requested!"}</strong>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-1">
            <label className="text-gray-300 uppercase block font-bold text-[10px]">Your Name (প্রয়োজনীয়)</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={lang === "bn" ? "উদা: শাহেদ কবির" : "e.g., Shahed Kabir"}
              className="w-full bg-[#03140f] border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-[#E6B325]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-gray-300 uppercase block font-bold text-[10px]">Phone Number (প্রয়োজনীয়)</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="017xxxxxxxx"
              className="w-full bg-[#03140f] border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-[#E6B325]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-gray-300 uppercase block font-bold text-[10px]">Email Address (ঐচ্ছিক)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="shahed@gmail.com"
              className="w-full bg-[#03140f] border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-[#E6B325]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-gray-300 uppercase block font-bold text-[10px]">Topic of Interest</label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-[#03140f] border border-white/10 rounded px-2.5 py-2 text-white focus:outline-none focus:border-[#E6B325]"
            >
              <option value="">{lang === "bn" ? "নির্বাচন করুন" : "Select Topic"}</option>
              <option value="Duplex Design">{lang === "bn" ? "ডুপ্লেক্স ড্রয়িং ডিজাইন" : "Duplex Design"}</option>
              <option value="Multi-storey Apartment">{lang === "bn" ? "বহুতল অ্যাপার্টমেন্ট লেআউট" : "Multi-storey Apartment"}</option>
              <option value="Soil testing & Survey">{lang === "bn" ? "ডিজিটাল সয়েল টেস্ট" : "Soil testing & Topo survey"}</option>
              <option value="Civil supervision">{lang === "bn" ? "কনস্ট্রাকশন সুপারভিশন" : "Civil Supervision"}</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-gray-300 uppercase block font-bold text-[10px]">Specifications (প্রয়োজনীয়)</label>
            <textarea
              rows={3}
              required
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder={lang === "bn" ? "আমার ৪ কাঠা জমিতে ৩ তলা বাড়ি তৈরির পরিকল্পনা আছে..." : "I have a 4 katha plot in Sylhet..."}
              className="w-full bg-[#03140f] border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-[#E6B325] font-sans"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#E6B325] hover:bg-[#CD9B13] text-black font-bold py-2 px-4 rounded transition cursor-pointer flex items-center justify-center space-x-1"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSubmitting ? "Submitting..." : "Submit Inquiry"}</span>
          </button>

        </form>
      </motion.div>

    </div>
  );
};
