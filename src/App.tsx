/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { ServicesSection } from "./components/ServicesSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { ReviewsSection } from "./components/ReviewsSection";
import { GallerySection } from "./components/GallerySection";
import { FAQSection } from "./components/FAQSection";
import { BlogSection } from "./components/BlogSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { FloatingActions } from "./components/FloatingActions";
import { ConsultationModal } from "./components/ConsultationModal";
import { ArrowLeft, Key } from "lucide-react";

// Lazy-load the heavy AdminDashboard component to optimize initial bundle size & loading speeds.
const AdminDashboard = React.lazy(() => import("./components/AdminDashboard").then(m => ({ default: m.AdminDashboard })));

function AppContent() {
  const { data, lang, isAdmin } = useApp();
  const [activeSection, setActiveSection] = useState("home");

  // Dynamically apply faviconUrl
  useEffect(() => {
    if (data?.settings?.faviconUrl) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "shortcut icon";
        document.head.appendChild(link);
      }
      link.href = data.settings.faviconUrl;
    }
  }, [data?.settings?.faviconUrl]);

  // Multi-section scroll observer to auto-highlight header links on scroll
  useEffect(() => {
    if (activeSection === "admin") return;

    const sections = ["home", "about", "services", "projects", "reviews", "gallery", "faq", "blog", "contact"];
    
    const handleScroll = () => {
      const scrollPos = window.scrollY + 160;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  const handleNavigate = (sectionId: string) => {
    if (sectionId === "admin") {
      setActiveSection("admin");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setActiveSection(sectionId);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const yOffset = -70; // Header margin clearance
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-[#03140F] text-white selection:bg-[#E6B325] selection:text-black">
      
      {/* 1. ADMIN PANEL MODE VIEW */}
      {activeSection === "admin" ? (
        <div className="animate-fadeIn">
          {/* Top Quick Return Navigator Bar */}
          <div className="bg-[#0b3c2e] border-b border-[#E6B325]/30 sticky top-0 z-50 px-4 py-3 shadow flex justify-between items-center">
            <button
              onClick={() => handleNavigate("home")}
              className="flex items-center space-x-2 text-xs sm:text-sm font-bold text-[#E6B325] hover:text-white transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>
                {lang === "bn" ? "← পাবলিক ওয়েবসাইট (হোম পেইজ)" : "← Back to Public Website (Home)"}
              </span>
            </button>

            <span className="text-[10px] sm:text-xs font-mono text-gray-300">
              {lang === "bn" ? "অ্যাডমিন প্যানেল" : "Secure System Administrator Room"}
            </span>
          </div>

          <React.Suspense fallback={
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 space-y-4">
              <div className="w-10 h-10 border-4 border-[#E6B325]/20 border-t-[#E6B325] rounded-full animate-spin"></div>
              <p className="text-xs font-sans text-gray-300">
                {lang === "bn" ? "অ্যাডমিন ড্যাশবোর্ড লোড হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন..." : "Loading Admin Dashboard, please wait..."}
              </p>
            </div>
          }>
            <AdminDashboard />
          </React.Suspense>
        </div>
      ) : (
        /* 2. PUBLIC MULTI-SECTION HOMEPAGE VIEW */
        <div className="animate-fadeIn pb-20 md:pb-0">
          <Header onNavigate={handleNavigate} currentActiveSection={activeSection} />
          <HeroSection onNavigate={handleNavigate} />
          <AboutSection />
          <ServicesSection />
          <ProjectsSection />
          <ReviewsSection />
          <GallerySection />
          <FAQSection />
          <BlogSection />
          <ContactSection />
          <Footer onNavigate={handleNavigate} />
          
          {/* Sticky leads actions & Overlays */}
          <FloatingActions />
          <ConsultationModal />
        </div>
      )}

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
