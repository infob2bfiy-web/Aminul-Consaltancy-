import React from "react";
import { useApp } from "../context/AppContext";
import { Compass, Facebook, Linkedin, Youtube, ArrowRight, MapPin, Phone, Mail } from "lucide-react";

export const Footer: React.FC<{ onNavigate: (sectionId: string) => void }> = ({ onNavigate }) => {
  const { data, lang } = useApp();

  return (
    <footer className="bg-[#03140F] text-white border-t border-[#E6B325]/20 font-sans relative overflow-hidden">
      
      {/* Blueprint Grid graphic decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(230,179,37,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(230,179,37,0.01)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand block (5 Columns) */}
          <div className="col-span-1 lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate("home")}>
              {data.settings.logoUrl ? (
                <img
                  src={data.settings.logoUrl}
                  alt="Logo"
                  className="w-10 h-10 object-contain rounded-lg bg-white/10 p-0.5 shadow-md"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-[#E6B325] text-[#0D5C46] flex items-center justify-center font-black shadow-md">
                  <Compass className="w-6 h-6 animate-spin-slow" />
                </div>
              )}
              <h3 className="text-lg font-extrabold tracking-tight">
                {data.settings.name.split(" ")[0]} <span className="text-[#E6B325]">{data.settings.name.split(" ").slice(1).join(" ")}</span>
              </h3>
            </div>
            
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
              {lang === "bn"
                ? "আমরা স্বপ্ন বুনন করি নকশায় আর তা বাস্তবে রূপান্তর করি সুদক্ষ প্রকৌশলে। উন্নত স্থাপত্যশৈলী ও কাঠামোগত নিরাপত্তা নিশ্চিত করে আপনার বাড়ি নির্মাণের বিশ্বস্ত সহযোগী।"
                : "Aminul Consultancy & Engineers delivers robust structures compliant to seismic criteria. We help draft plans, conduct surveys, and construct turnkey duplexes across Bangladesh."}
            </p>

            {/* Social media connections */}
            <div className="flex space-x-3.5 pt-2">
              {data.settings.facebookUrl && (
                <a
                  href={data.settings.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-[#0b3c2e] hover:bg-[#E6B325] hover:text-black text-[#E6B325] transition flex items-center justify-center border border-white/10"
                  aria-label="Facebook Profile"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {data.settings.linkedinUrl && (
                <a
                  href={data.settings.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-[#0b3c2e] hover:bg-[#E6B325] hover:text-black text-[#E6B325] transition flex items-center justify-center border border-white/10"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {data.settings.youtubeUrl && (
                <a
                  href={data.settings.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-[#0b3c2e] hover:bg-[#E6B325] hover:text-black text-[#E6B325] transition flex items-center justify-center border border-white/10"
                  aria-label="YouTube Channel"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick links block (3 Columns) */}
          <div className="col-span-1 lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#E6B325] border-b border-white/10 pb-2">
              {lang === "bn" ? "জরুরি লিংক সমূহ" : "Quick Navigation"}
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-xs text-gray-300">
              {[
                { id: "home", labelBn: "হোম", labelEn: "Home" },
                { id: "about", labelBn: "আমাদের সম্পর্কে", labelEn: "About Us" },
                { id: "services", labelBn: "সার্ভিস সমূহ", labelEn: "Our Services" },
                { id: "projects", labelBn: "প্রজেক্ট সমূহ", labelEn: "Our Portfolio" },
                { id: "gallery", labelBn: "ছবি গ্যালারি", labelEn: "Work Gallery" },
                { id: "reviews", labelBn: "ক্লায়েন্ট রিভিউ", labelEn: "Reviews" },
                { id: "faq", labelBn: "জিজ্ঞাসা", labelEn: "Faq Portal" },
                { id: "blog", labelBn: "আর্টিকেল", labelEn: "Blog Tips" },
                { id: "contact", labelBn: "যোগাযোগ", labelEn: "Contact Us" }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="hover:text-[#E6B325] transition flex items-center space-x-1 cursor-pointer text-left py-1"
                  >
                    <ArrowRight className="w-3 h-3 text-[#E6B325]" />
                    <span>{lang === "bn" ? link.labelBn : link.labelEn}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services short block (2 Columns) */}
          <div className="col-span-1 lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#E6B325] border-b border-white/10 pb-2">
              {lang === "bn" ? "আমাদের সেবাসমূহ" : "Key Offerings"}
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li>
                <button onClick={() => onNavigate("services")} className="hover:text-[#E6B325] cursor-pointer text-left">
                  {lang === "bn" ? "আর্কিটেকচারাল ডিজাইন" : "Architectural Design"}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("services")} className="hover:text-[#E6B325] cursor-pointer text-left">
                  {lang === "bn" ? "ভূমিকম্প সহনশীল স্ট্রাকচার" : "BNBC Structural Framing"}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("services")} className="hover:text-[#E6B325] cursor-pointer text-left">
                  {lang === "bn" ? "ডিজিটাল সয়েল ও সার্ভে" : "Digital Topo & Soil Lab"}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("services")} className="hover:text-[#E6B325] cursor-pointer text-left">
                  {lang === "bn" ? "নির্মাণ কাজের তদারকি" : "turnkey Civil Inspections"}
                </button>
              </li>
            </ul>
          </div>

          {/* Quick info contacts (3 Columns) */}
          <div className="col-span-1 lg:col-span-3 space-y-4 text-xs text-gray-300">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#E6B325] border-b border-white/10 pb-2">
              {lang === "bn" ? "সরাসরি যোগাযোগ" : "Direct Hotline"}
            </h4>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#E6B325] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{data.settings.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#E6B325] shrink-0" />
                <span className="font-bold text-[#E6B325]">{data.settings.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#E6B325] shrink-0" />
                <span>{data.settings.email}</span>
              </div>
            </div>
          </div>

        </div>

        {/* copyright and credit block */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 font-light">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} {data.settings.name}. All Rights Reserved.
          </p>
          <p className="text-center sm:text-right mt-2 sm:mt-0">
            {lang === "bn"
              ? "ডিজাইন ও ডেভেলপমেন্টে আমিনুল কনসালটেন্সি এন্ড ইঞ্জিনিয়ার্স লিমিটেড"
              : "Developed by Aminul Consultancy & Engineers"}
          </p>
        </div>

      </div>
    </footer>
  );
};
