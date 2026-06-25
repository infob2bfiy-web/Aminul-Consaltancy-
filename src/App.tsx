import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './AppContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Projects } from './components/Projects';
import { Statistics } from './components/Statistics';
import { Gallery } from './components/Gallery';
import { BlogComponent } from './components/Blog';
import { FAQ } from './components/FAQ';
import { Team } from './components/Team';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { AdminPanel } from './components/AdminPanel';
import { HardHat, Loader2, Sparkles } from 'lucide-react';

function MainAppContent() {
  const { loading, notification, lang } = useApp();
  const [showAdmin, setShowAdmin] = useState(false);

  // Auto detect /admin, #admin, or ?admin in URL to open admin panel
  useEffect(() => {
    const checkUrlForAdmin = () => {
      const isPathAdmin = window.location.pathname.toLowerCase() === '/admin' || 
                          window.location.pathname.toLowerCase() === '/admin/';
      const isHashAdmin = window.location.hash.toLowerCase() === '#admin';
      const isQueryAdmin = window.location.search.toLowerCase().includes('admin');
      
      if (isPathAdmin || isHashAdmin || isQueryAdmin) {
        setShowAdmin(true);
      }
    };

    // Run check on mount
    checkUrlForAdmin();

    // Listen for hash changes or popstate events
    window.addEventListener('hashchange', checkUrlForAdmin);
    window.addEventListener('popstate', checkUrlForAdmin);
    
    // Fallback polling for the sandbox iframe environment
    const timer = setInterval(checkUrlForAdmin, 1000);

    return () => {
      window.removeEventListener('hashchange', checkUrlForAdmin);
      window.removeEventListener('popstate', checkUrlForAdmin);
      clearInterval(timer);
    };
  }, []);

  const handleCloseAdmin = () => {
    setShowAdmin(false);
    // Clear the hash, query, or path to avoid immediately re-triggering the 1s auto-detect timer
    if (window.location.hash.toLowerCase() === '#admin') {
      window.location.hash = '';
    }
    if (window.location.search.toLowerCase().includes('admin')) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.delete('admin');
      const newSearch = searchParams.toString();
      window.history.pushState(null, '', window.location.pathname + (newSearch ? '?' + newSearch : ''));
    }
    if (window.location.pathname.toLowerCase() === '/admin' || window.location.pathname.toLowerCase() === '/admin/') {
      window.history.pushState(null, '', '/');
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#041a14] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-[#e6b325] animate-spin" />
        <p className="text-gray-300 font-sans text-xs uppercase tracking-widest animate-pulse">
          {lang === 'bn' ? 'ডাটাবেজ কানেক্ট করা হচ্ছে...' : 'Initializing Aminul Engineers Core...'}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#041a14] min-h-screen text-gray-300 relative select-none scroll-smooth">
      
      {/* Dynamic Client Notifications bar */}
      {notification && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#e6b325] text-black font-display font-extrabold text-xs sm:text-sm px-6 py-3 rounded-full shadow-2xl flex items-center space-x-2 animate-bounce">
          <Sparkles className="w-4 h-4" />
          <span>{notification.message}</span>
        </div>
      )}

      {/* Corporate Header Nav */}
      <Header onOpenAdmin={() => setShowAdmin(true)} />

      {/* Hero stage */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Services Section */}
      <Services />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Projects Portfolio */}
      <Projects />

      {/* Live Statistics Counter */}
      <Statistics />

      {/* Construction Progress Gallery */}
      <Gallery />

      {/* FAQ Accordion */}
      <FAQ />

      {/* Professional Engineers Board */}
      <Team />

      {/* Educational Blog Tips */}
      <BlogComponent />

      {/* Contact & Consultation forms */}
      <Contact />

      {/* Corporate footer maps integration */}
      <Footer />

      {/* Float Actions and Call details */}
      <FloatingActions />

      {/* Admin Panel control screen */}
      {showAdmin && (
        <AdminPanel onClose={handleCloseAdmin} />
      )}

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
