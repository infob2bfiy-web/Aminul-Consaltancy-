import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { motion } from "motion/react";
import { CheckCircle2, ShieldAlert, Target, Heart, Eye, Award, MessageSquare } from "lucide-react";

export const AboutSection: React.FC = () => {
  const { data, lang } = useApp();
  const [activeTab, setActiveTab] = useState<"mission" | "vision" | "values">("mission");

  const valuesList = [
    {
      titleBn: "সততা ও স্বচ্ছতা",
      titleEn: "Integrity & Transparency",
      descBn: "নির্মাণ সামগ্রীর প্রাক্কলন থেকে শুরু করে কাজের প্রতিটি ধাপে আমরা শতভাগ স্বচ্ছতা বজায় রাখি। কোনো লুকানো চার্জ নেই।",
      descEn: "We maintain 100% honesty from billing to aggregate selection. No hidden surprises."
    },
    {
      titleBn: "নিরাপত্তা ও মান নিয়ন্ত্রণ",
      titleEn: "Safety & Strict Quality Control",
      descBn: "বিএনবিসি নিয়মনীতি কঠোরভাবে অনুসরণ করে আমরা প্রতিটি স্থাপনার সর্বোচ্চ কাঠামোগত নিরাপত্তা নিশ্চিত করি।",
      descEn: "We abide strictly by the BNBC building codes to verify earthquake safety limits."
    },
    {
      titleBn: "সময়মতো কাজ হস্তান্তর",
      titleEn: "On-Time Phase Handovers",
      descBn: "আমরা নির্ধারিত সময়ের মধ্যে ড্রয়িং ডিজাইন প্রদান এবং ভবন নির্মাণের প্রতিটি ধাপ নিখুঁতভাবে শেষ করতে প্রতিজ্ঞাবদ্ধ।",
      descEn: "We execute phase milestones promptly so clients avoid structural loan interest delays."
    }
  ];

  const timelineSteps = [
    { year: "২০১৮", titleBn: "যাত্রা শুরু", titleEn: "Company Established", descBn: "২ জন দক্ষ প্রকৌশলী নিয়ে আমাদের কনসালটেন্সির শুভ সূচনা।", descEn: "Bootstrapped with 2 passion-driven civil engineers." },
    { year: "২০২০", titleBn: "প্রথম বহুতল ভবন", titleEn: "First Multi-Story Layout", descBn: "ঢাকায় প্রথম জি+৫ তলা বিশিষ্ট আবাসিক ড্রয়িং এর সফল রাজউক অনুমোদন ও নির্মাণ।", descEn: "Designed and successfully approved G+5 structural building in Dhaka." },
    { year: "২০২২", titleBn: "সারাদেশে সেবা সম্প্রসারণ", titleEn: "Nationwide Expansion", descBn: "সিলেট, চট্টগ্রাম ও কুমিল্লায় আমাদের সার্ভে ও কনস্ট্রাকশন সেবা বিস্তৃত করি।", descEn: "Broadened geo-survey and duplex construction to Sylhet and Chittagong." },
    { year: "২০২৬", titleBn: "৫০+ সফল প্রজেক্ট", titleEn: "50+ Structural Landmarks", descBn: "বর্তমানে বিশ্বস্ততার সাথে ৫০টিরও বেশি আধুনিক ভবন ও শতভাগ নির্ভুল সয়েল টেস্ট সম্পন্ন।", descEn: "Celebrating over 50 completed residential and commercial masterpieces." }
  ];

  return (
    <section id="about" className="py-20 bg-[#06241D] text-white overflow-hidden relative">
      {/* Subtly placed decorative engineer graph grid lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E6B325]/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#E6B325] text-xs font-bold uppercase tracking-widest block mb-2">
            {lang === "bn" ? "আমাদের সম্পর্কে জানুন" : "Discover Our Identity"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            {lang === "bn" ? "নির্ভরতা ও গুণগত মানের ৮ বছর" : "8 Years of Trust & Engineering Excellence"}
          </h2>
          <div className="w-20 h-1 bg-[#E6B325] mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-gray-300 text-sm sm:text-base leading-relaxed">
            {lang === "bn" ? (
              "আমিনুল কনসালটেন্সি ও ইঞ্জিনিয়ার্স বাংলাদেশে নির্ভরযোগ্য ও দক্ষ আর্কিটেকচারাল এবং স্ট্রাকচারাল ডিজাইন ফার্ম হিসেবে পরিচিত। আমরা স্বপ্ন বুনন করি নকশায় আর তা বাস্তবে রূপান্তর করি সুদক্ষ প্রকৌশলে।"
            ) : (
              "Aminul Consultancy & Engineers is a highly trusted consultancy and structural engineering brand in Bangladesh. We weave your housing dreams into elegant blueprints and build them via flawless civil execution."
            )}
          </p>
        </div>

        {/* Dynamic Interactive Focus Tabs: Mission, Vision, Values */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          <div className="col-span-1 lg:col-span-5 space-y-6">
            <div className="bg-[#0A3D2F] border border-white/10 rounded-xl p-2 flex space-x-1">
              <button
                onClick={() => setActiveTab("mission")}
                className={`flex-1 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold transition duration-200 cursor-pointer ${
                  activeTab === "mission" ? "bg-[#E6B325] text-black" : "text-gray-300 hover:bg-white/5"
                }`}
              >
                {lang === "bn" ? "আমাদের মিশন" : "Our Mission"}
              </button>
              <button
                onClick={() => setActiveTab("vision")}
                className={`flex-1 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold transition duration-200 cursor-pointer ${
                  activeTab === "vision" ? "bg-[#E6B325] text-black" : "text-gray-300 hover:bg-white/5"
                }`}
              >
                {lang === "bn" ? "আমাদের ভিশন" : "Our Vision"}
              </button>
              <button
                onClick={() => setActiveTab("values")}
                className={`flex-1 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold transition duration-200 cursor-pointer ${
                  activeTab === "values" ? "bg-[#E6B325] text-black" : "text-gray-300 hover:bg-white/5"
                }`}
              >
                {lang === "bn" ? "আমাদের মূল্যবোধ" : "Core Values"}
              </button>
            </div>

            <div className="bg-[#093529] border border-white/5 rounded-xl p-6 min-h-[250px] flex flex-col justify-center">
              {activeTab === "mission" && (
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-[#E6B325]/15 flex items-center justify-center text-[#E6B325]">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {lang === "bn" ? "গ্রাহকের সন্তুষ্টি ও স্থায়ী নিরাপত্তা" : "Empowering Client Trust & Durability"}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {lang === "bn" ? (
                      "আমাদের প্রধান মিশন হলো সাশ্রয়ী বাজেটে আন্তর্জাতিক মানের স্ট্রাকচারাল ডিজাইন ও নিখুঁত প্ল্যানিংয়ের মাধ্যমে প্রতিটি প্রজেক্টকে শতভাগ সুরক্ষিত এবং নান্দনিকভাবে দৃষ্টিনন্দন করে তোলা।"
                    ) : (
                      "Our primary mission is to engineer high-fidelity structural blueprints and safety-compliant duplex planning at optimal budgets, prioritizing safety, transparency and client visual criteria."
                    )}
                  </p>
                </div>
              )}

              {activeTab === "vision" && (
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-[#E6B325]/15 flex items-center justify-center text-[#E6B325]">
                    <Eye className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {lang === "bn" ? "স্মার্ট বাংলাদেশের গ্রিন আর্কিটেকচার" : "Pioneering Eco-Sustainable Architecture"}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {lang === "bn" ? (
                      "আমরা এমন একটি পরিবেশবান্ধব ও আধুনিক বাংলাদেশ গড়ার ভিশন রাখি যেখানে প্রতিটি আবাসিক ও বাণিজ্যিক স্থাপনা হবে আধুনিক প্রযুক্তিনির্ভর এবং সর্বোচ্চ প্রাকৃতিক শক্তি-সাশ্রয়ী।"
                    ) : (
                      "We envision a smart Bangladesh defined by robust sustainable architecture. We strive to be the benchmark firm for earthquake-resilient structures and eco-optimized building configurations."
                    )}
                  </p>
                </div>
              )}

              {activeTab === "values" && (
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-[#E6B325]/15 flex items-center justify-center text-[#E6B325]">
                    <Heart className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-[#E6B325] uppercase tracking-wider">
                    {lang === "bn" ? "আমরা যে নীতিতে বিশ্বাসী" : "Our Ethical Directives"}
                  </h4>
                  <ul className="space-y-2.5 text-sm text-gray-300">
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-[#E6B325] shrink-0 mt-0.5" />
                      <span>{lang === "bn" ? "নিখুঁত কোড ও নিয়মনীতি মেনে চলা" : "Strict compliance to national engineering codes"}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-[#E6B325] shrink-0 mt-0.5" />
                      <span>{lang === "bn" ? "নির্মাণ ব্যয়ের সাশ্রয়ী ও বিজ্ঞানসম্মত হিসাব" : "Value engineering to lower wasteful billing factors"}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-[#E6B325] shrink-0 mt-0.5" />
                      <span>{lang === "bn" ? "গ্রাহকের স্বপ্নকে সর্বোচ্চ অগ্রাধিকার দেওয়া" : "Adapting structural forms to fulfill family spaces"}</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* CEO Message Center with visual prestige card */}
          <div className="col-span-1 lg:col-span-7 bg-[#0A3D2F]/70 border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-center">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden bg-emerald-900 border-2 border-[#E6B325] shrink-0 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80"
                alt="CEO Engr. Aminul Islam"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-[#E6B325]">
                <MessageSquare className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  {lang === "bn" ? "ব্যবস্থাপনা পরিচালকের বার্তা" : "CEO'S STRATEGIC MESSAGE"}
                </span>
              </div>
              <blockquote className="text-gray-200 text-sm italic leading-relaxed">
                {lang === "bn" ? (
                  "\"একটি স্বপ্নের বাড়ি নির্মাণে মানুষের সারা জীবনের সঞ্চয় জড়িত থাকে। আমরা সেই আবেগের মূল্য বুঝি। প্রতিটি রড, সিমেন্ট এবং ফ্লোর প্ল্যান এমনভাবে ডিজাইন করি যাতে আপনার পরিবার থাকে সম্পূর্ণ নিরাপদ এবং প্রশান্তিতে। আমরা ব্যবসায়ের চেয়ে বিশ্বাস অর্জনে বিশ্বাসী।\""
                ) : (
                  "\"A family house is built with a lifetime's hard-earned savings. We respect that profound emotion. Every column calculation and ventilation draft is engineered to render peak security and aesthetic peace. We build relations, not just structures.\""
                )}
              </blockquote>
              <div>
                <h4 className="text-base font-bold text-white">
                  {lang === "bn" ? "ইঞ্জি: আমিনুল ইসলাম" : "Engr. Aminul Islam"}
                </h4>
                <p className="text-xs text-gray-400">
                  {lang === "bn" ? "প্রতিষ্ঠাতা ও প্রধান স্ট্রাকচারাল ইঞ্জিনিয়ার, বিএসসি সিভিল (আইইউটি)" : "Founder & Principal Structural Consultant, BSc Civil (IUT)"}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Experience Timeline Grid */}
        <div className="mb-20">
          <h3 className="text-xl font-bold text-[#E6B325] mb-8 text-center sm:text-left">
            {lang === "bn" ? "আমাদের সফলতার টাইমলাইন" : "Our Milestones & Progression"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Horizontal connection line for desktop */}
            <div className="hidden md:block absolute top-[28px] left-[15%] right-[15%] h-0.5 bg-white/10 z-0"></div>
            
            {timelineSteps.map((step, idx) => (
              <div key={idx} className="bg-[#0A3D2F]/40 border border-white/5 rounded-xl p-5 relative z-10 hover:border-[#E6B325]/40 transition duration-300">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-extrabold text-[#E6B325]">{step.year}</span>
                  <div className="w-6 h-6 rounded-full bg-[#06241D] border border-[#E6B325] flex items-center justify-center text-[10px] text-[#E6B325] font-bold">
                    {idx + 1}
                  </div>
                </div>
                <h4 className="text-sm font-bold text-white mb-2">
                  {lang === "bn" ? step.titleBn : step.titleEn}
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {lang === "bn" ? step.descBn : step.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Static Counter blocks */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-[#093226] border border-[#E6B325]/20 rounded-2xl p-6 sm:p-8 text-center shadow-xl">
          
          <div className="space-y-2">
            <div className="text-3xl sm:text-4xl font-black text-[#E6B325] tracking-tight">
              {lang === "bn" ? data.stats.projectsBn : data.stats.projectsEn}
            </div>
            <div className="text-xs sm:text-sm text-gray-200 uppercase font-semibold">
              {lang === "bn" ? "সম্পন্ন প্রজেক্ট" : "Completed Projects"}
            </div>
          </div>

          <div className="space-y-2 border-l border-white/10">
            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {lang === "bn" ? data.stats.clientsBn : data.stats.clientsEn}
            </div>
            <div className="text-xs sm:text-sm text-gray-200 uppercase font-semibold">
              {lang === "bn" ? "সন্তুষ্ট গ্রাহক" : "Happy Clients"}
            </div>
          </div>

          <div className="space-y-2 border-l border-white/10">
            <div className="text-3xl sm:text-4xl font-black text-[#E6B325] tracking-tight">
              {lang === "bn" ? data.stats.engineersBn : data.stats.engineersEn}
            </div>
            <div className="text-xs sm:text-sm text-gray-200 uppercase font-semibold">
              {lang === "bn" ? "প্রকৌশলী ও স্থপতি" : "Architects & Engineers"}
            </div>
          </div>

          <div className="space-y-2 border-l border-white/10">
            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {lang === "bn" ? data.stats.experienceBn : data.stats.experienceEn}
            </div>
            <div className="text-xs sm:text-sm text-gray-200 uppercase font-semibold">
              {lang === "bn" ? "বছরের অভিজ্ঞতা" : "Years Experience"}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
