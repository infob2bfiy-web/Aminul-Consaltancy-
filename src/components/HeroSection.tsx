import React from "react";
import { useApp } from "../context/AppContext";
import { motion } from "motion/react";
import { ArrowRight, Compass, Users, Award, ShieldCheck } from "lucide-react";

export const HeroSection: React.FC<{ onNavigate: (sectionId: string) => void }> = ({ onNavigate }) => {
  const { data, lang } = useApp();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-gradient-to-br from-[#042018] via-[#0D5C46] to-[#03140F]"
    >
      {/* Structural Drafting Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(230,179,37,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(230,179,37,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-60"></div>
      
      {/* Abstract Blueprint Circles & Lights */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-[#E6B325]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/10 right-1/10 w-80 h-80 bg-[#0D5C46]/40 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Subtly rotated drafting angle lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="10%" x2="100%" y2="90%" stroke="#E6B325" strokeWidth="0.5" strokeDasharray="5,5" />
          <line x1="100%" y1="10%" x2="0" y2="90%" stroke="#E6B325" strokeWidth="0.5" strokeDasharray="5,5" />
          <circle cx="50%" cy="50%" r="200" fill="none" stroke="#0D5C46" strokeWidth="1" />
          <circle cx="50%" cy="50%" r="300" fill="none" stroke="#E6B325" strokeWidth="0.5" strokeDasharray="10,10" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="col-span-1 lg:col-span-7 text-left space-y-6">
            
            {/* Trusted Tag */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-black/40 border border-[#E6B325]/40 rounded-full py-1.5 px-4"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E6B325] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E6B325]"></span>
              </span>
              <span className="text-xs font-semibold text-gray-200 tracking-wide uppercase">
                {lang === "bn" ? "১০০% বিশ্বস্ত ও অনুমোদিত ইঞ্জিনিয়ারিং ফার্ম" : "100% Trusted & Certified Engineering Firm"}
              </span>
            </motion.div>

            {/* Main Title with Dual Language toggle capability */}
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight"
            >
              {lang === "bn" ? (
                <>
                  আপনার স্বপ্নের প্রজেক্ট, <br />
                  আমাদের <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E6B325] to-[#FFD563]">দক্ষ হাতে</span>
                </>
              ) : (
                <>
                  Your Dream Project, <br />
                  In Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E6B325] to-[#FFD563]">Expert Hands</span>
                </>
              )}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed font-light"
            >
              {lang === "bn" ? (
                <>
                  <span className="text-[#E6B325] font-semibold">বিশ্বস্ত কনসালটেন্সি ও ইঞ্জিনিয়ারিং সেবা।</span> আমরা আপনার জমির সঠিক উপযোগিতা বিশ্লেষণ করে দৃষ্টিনন্দন আর্কিটেকচারাল নকশা, মজবুত স্ট্রাকচারাল সলিউশন এবং অনুমোদিত নিয়মনীতি মেনে আধুনিক ভবন নির্মাণ সেবা দিয়ে থাকি।
                </>
              ) : (
                <>
                  <span className="text-[#E6B325] font-semibold">Reliable Consulting & Engineering Services.</span> We analyze your plot potential and deliver gorgeous architectural masterplans, BNBC compliant structural analysis, soil logs, and premium turnkey construction.
                </>
              )}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 pt-3"
            >
              <button
                onClick={() => onNavigate("contact")}
                className="flex items-center justify-center space-x-2.5 bg-gradient-to-r from-[#E6B325] to-[#CD9B13] hover:from-[#CD9B13] hover:to-[#B38600] text-black font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>{lang === "bn" ? "যোগাযোগ করুন" : "Get In Touch"}</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => onNavigate("projects")}
                className="flex items-center justify-center space-x-2.5 bg-black/40 hover:bg-black/60 text-white font-medium py-3 px-8 rounded-lg border border-white/20 hover:border-[#E6B325] transition-all duration-200 cursor-pointer"
              >
                <span>{lang === "bn" ? "আমাদের কাজ দেখুন" : "View Portfolio"}</span>
              </button>
            </motion.div>

          </div>

          {/* Right Image/Model Column */}
          <div className="col-span-1 lg:col-span-5 relative flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative w-full max-w-md aspect-square rounded-2xl overflow-visible"
            >
              {/* Core Image container representing premium modern engineering */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#E6B325]/20 to-transparent p-0.5 shadow-2xl">
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-emerald-950">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                    alt="Aminul Duplex Render"
                    className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle tint */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#042018]/90 via-transparent to-transparent"></div>
                  
                  {/* Building overlay graphic */}
                  <div className="absolute bottom-4 left-4 right-4 bg-black/75 backdrop-blur-sm border border-[#E6B325]/30 rounded-lg p-3">
                    <p className="text-[10px] text-[#E6B325] font-bold uppercase tracking-wider">
                      {lang === "bn" ? "চলমান গ্র্যান্ড ডুপ্লেক্স প্রজেক্ট" : "Ongoing Grand Duplex Project"}
                    </p>
                    <h3 className="text-white text-xs font-semibold">
                      {lang === "bn" ? "উপশহর থ্রি-ডি মডেল লাক্সারি ড্রয়িং" : "Upashahar 3D Luxury Model Dwelling"}
                    </h3>
                  </div>
                </div>
              </div>

              {/* FLOATING STATS BADGES */}
              
              {/* Badge 1: Projects */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -left-6 top-1/4 bg-[#0A3D2F]/95 border border-[#E6B325]/40 rounded-xl p-3 shadow-lg flex items-center space-x-3 backdrop-blur-md"
              >
                <div className="w-9 h-9 rounded-lg bg-[#E6B325]/10 flex items-center justify-center text-[#E6B325]">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg font-extrabold text-white leading-none">
                    {lang === "bn" ? data.stats.projectsBn : data.stats.projectsEn}
                  </div>
                  <div className="text-[10px] text-gray-300 font-medium">
                    {lang === "bn" ? "সম্পন্ন প্রজেক্ট" : "Completed Projects"}
                  </div>
                </div>
              </motion.div>

              {/* Badge 2: Experts */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="absolute -right-6 bottom-1/4 bg-[#0A3D2F]/95 border border-[#E6B325]/40 rounded-xl p-3 shadow-lg flex items-center space-x-3 backdrop-blur-md"
              >
                <div className="w-9 h-9 rounded-lg bg-[#E6B325]/10 flex items-center justify-center text-[#E6B325]">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg font-extrabold text-white leading-none">
                    {lang === "bn" ? data.stats.engineersBn : data.stats.engineersEn}
                  </div>
                  <div className="text-[10px] text-gray-300 font-medium">
                    {lang === "bn" ? "অভিজ্ঞ প্রকৌশলী" : "Expert Engineers"}
                  </div>
                </div>
              </motion.div>

              {/* Badge 3: Satisfaction */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="absolute -bottom-6 left-1/4 bg-gradient-to-r from-[#E6B325] to-[#B38600] text-black rounded-lg py-2 px-4 shadow-lg flex items-center space-x-2"
              >
                <Award className="w-4 h-4 text-black shrink-0" />
                <span className="text-xs font-bold whitespace-nowrap">
                  {lang === "bn" ? "৯৮% বিশ্বস্ততা ও সন্তুষ্টি" : "98% Customer Trust Rate"}
                </span>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
