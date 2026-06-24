import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, auth, handleFirestoreError, OperationType } from './firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  addDoc, 
  deleteDoc,
  onSnapshot, 
  orderBy, 
  query 
} from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { supabase, isSupabaseConfigured, safeJson } from './supabaseClient';
import { Settings, Service, Project, GalleryItem, Testimonial, Blog, FAQ, TeamMember, ContactMessage } from './types';
import { 
  initialSettings, 
  initialServices, 
  initialProjects, 
  initialGallery, 
  initialTestimonials, 
  initialBlogs, 
  initialFaqs, 
  initialTeam 
} from './initialData';

interface AppContextType {
  lang: 'bn' | 'en';
  setLang: (lang: 'bn' | 'en') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  settings: Settings;
  services: Service[];
  projects: Project[];
  gallery: GalleryItem[];
  testimonials: Testimonial[];
  blogs: Blog[];
  faqs: FAQ[];
  team: TeamMember[];
  messages: ContactMessage[];
  
  loading: boolean;
  user: User | null;
  isAdmin: boolean;
  notification: { message: string; type: 'success' | 'error' } | null;
  showNotification: (message: string, type: 'success' | 'error') => void;
  
  submitContactForm: (name: string, phone: string, email: string, subject: string, message: string) => Promise<boolean>;
  refreshAllData: () => Promise<void>;
  adminLogin: (usernameInput: string, passwordInput: string) => boolean;
  adminLogout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<'bn' | 'en'>('bn');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [services, setServices] = useState<Service[]>(initialServices);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [gallery, setGallery] = useState<GalleryItem[]>(initialGallery);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [faqs, setFaqs] = useState<FAQ[]>(initialFaqs);
  const [team, setTeam] = useState<TeamMember[]>(initialTeam);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [customAdmin, setCustomAdmin] = useState(() => {
    return localStorage.getItem('isAdminLoggedIn') === 'true';
  });
  const [googleAdmin, setGoogleAdmin] = useState(false);
  const isAdmin = customAdmin || googleAdmin;

  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  // Seeding function if Firestore is empty or needs service synchronization
  const seedDatabaseIfEmpty = async () => {
    try {
      const settingsRef = doc(db, 'settings', 'config');
      const settingsSnap = await getDoc(settingsRef);
      
      if (!settingsSnap.exists()) {
        console.log('Database seems empty. Seeding initial data...');
        
        // Seed settings
        await setDoc(settingsRef, initialSettings);
        
        // Seed services
        for (const service of initialServices) {
          await setDoc(doc(db, 'services', service.id), service);
        }
        
        // Seed projects
        for (const project of initialProjects) {
          await setDoc(doc(db, 'projects', project.id), project);
        }
        
        // Seed gallery
        for (const item of initialGallery) {
          await setDoc(doc(db, 'gallery', item.id), item);
        }
        
        // Seed testimonials
        for (const test of initialTestimonials) {
          await setDoc(doc(db, 'testimonials', test.id), test);
        }
        
        // Seed blogs
        for (const blog of initialBlogs) {
          await setDoc(doc(db, 'blogs', blog.id), blog);
        }
        
        // Seed FAQs
        for (const faq of initialFaqs) {
          await setDoc(doc(db, 'faqs', faq.id), faq);
        }
        
        // Seed Team
        for (const member of initialTeam) {
          await setDoc(doc(db, 'team', member.id), member);
        }
        
        console.log('Seeding completed successfully!');
      } else {
        // Sync services collection to match initialServices in initialData.ts
        console.log('Database already exists. Synchronizing services to latest list...');
        const servicesSnap = await getDocs(collection(db, 'services'));
        const dbServiceIds = servicesSnap.docs.map(doc => doc.id);
        const initialServiceIds = initialServices.map(s => s.id);

        // 1. Delete any services in Firestore that are not in initialServices
        for (const docId of dbServiceIds) {
          if (!initialServiceIds.includes(docId)) {
            console.log(`Deleting obsolete service: ${docId}`);
            await deleteDoc(doc(db, 'services', docId));
          }
        }

        // 2. Insert or update all initialServices
        for (const service of initialServices) {
          await setDoc(doc(db, 'services', service.id), service);
        }
        console.log('Services synchronized successfully!');
      }
    } catch (err) {
      console.error('Error seeding database:', err);
      handleFirestoreError(err, OperationType.GET, 'settings/config');
    }
  };

  // Helper function to fetch all data from Supabase
  const fetchFromSupabase = async () => {
    if (!supabase) return;
    try {
      // 1. Settings
      try {
        const { data: settingsData } = await supabase.from('settings').select('*').eq('id', 'config').maybeSingle();
        if (settingsData) {
          setSettings(settingsData as Settings);
        } else {
          // Attempt seeding settings to Supabase
          await supabase.from('settings').insert({ ...initialSettings, id: 'config' });
          setSettings(initialSettings);
        }
      } catch (err) {
        console.warn("Supabase load settings error, table might not exist yet:", err);
      }

      // 2. Services
      try {
        const { data: servicesData } = await supabase.from('services').select('*');
        if (servicesData && servicesData.length > 0) {
          const list = servicesData.map(item => ({
            ...item,
            benefits: safeJson(item.benefits),
            benefitsEn: safeJson(item.benefitsEn)
          }));
          setServices(list as Service[]);
        } else if (servicesData) {
          // Attempt seeding services to Supabase
          for (const s of initialServices) {
            await supabase.from('services').insert({
              ...s,
              benefits: s.benefits,
              benefitsEn: s.benefitsEn
            });
          }
          setServices(initialServices);
        }
      } catch (err) {
        console.warn("Supabase load services error:", err);
      }

      // 3. Projects
      try {
        const { data: projectsData } = await supabase.from('projects').select('*');
        if (projectsData && projectsData.length > 0) {
          const list = projectsData.map(item => ({
            ...item,
            images: safeJson(item.images)
          }));
          setProjects(list as Project[]);
        } else if (projectsData) {
          // Attempt seeding projects to Supabase
          for (const p of initialProjects) {
            await supabase.from('projects').insert({
              ...p,
              images: p.images
            });
          }
          setProjects(initialProjects);
        }
      } catch (err) {
        console.warn("Supabase load projects error:", err);
      }

      // 4. Gallery
      try {
        const { data: galleryData } = await supabase.from('gallery').select('*');
        if (galleryData && galleryData.length > 0) {
          setGallery(galleryData as GalleryItem[]);
        } else if (galleryData) {
          for (const item of initialGallery) {
            await supabase.from('gallery').insert(item);
          }
          setGallery(initialGallery);
        }
      } catch (err) {
        console.warn("Supabase load gallery error:", err);
      }

      // 5. Testimonials
      try {
        const { data: testimonialsData } = await supabase.from('testimonials').select('*');
        if (testimonialsData && testimonialsData.length > 0) {
          setTestimonials(testimonialsData as Testimonial[]);
        } else if (testimonialsData) {
          for (const t of initialTestimonials) {
            await supabase.from('testimonials').insert(t);
          }
          setTestimonials(initialTestimonials);
        }
      } catch (err) {
        console.warn("Supabase load testimonials error:", err);
      }

      // 6. Blogs
      try {
        const { data: blogsData } = await supabase.from('blogs').select('*');
        if (blogsData && blogsData.length > 0) {
          const list = blogsData.map(item => ({
            ...item,
            tags: safeJson(item.tags)
          }));
          setBlogs(list as Blog[]);
        } else if (blogsData) {
          for (const b of initialBlogs) {
            await supabase.from('blogs').insert({
              ...b,
              tags: b.tags
            });
          }
          setBlogs(initialBlogs);
        }
      } catch (err) {
        console.warn("Supabase load blogs error:", err);
      }

      // 7. FAQs
      try {
        const { data: faqsData } = await supabase.from('faqs').select('*');
        if (faqsData && faqsData.length > 0) {
          setFaqs(faqsData as FAQ[]);
        } else if (faqsData) {
          for (const f of initialFaqs) {
            await supabase.from('faqs').insert(f);
          }
          setFaqs(initialFaqs);
        }
      } catch (err) {
        console.warn("Supabase load faqs error:", err);
      }

      // 8. Team
      try {
        const { data: teamData } = await supabase.from('team').select('*');
        if (teamData && teamData.length > 0) {
          setTeam(teamData as TeamMember[]);
        } else if (teamData) {
          for (const t of initialTeam) {
            await supabase.from('team').insert(t);
          }
          setTeam(initialTeam);
        }
      } catch (err) {
        console.warn("Supabase load team error:", err);
      }

      // 9. Messages
      try {
        const { data: messagesData } = await supabase.from('messages').select('*').order('createdAt', { ascending: false });
        if (messagesData) {
          setMessages(messagesData as ContactMessage[]);
        }
      } catch (err) {
        console.warn("Supabase load messages error:", err);
      }

    } catch (err) {
      console.error("General Supabase fetch error:", err);
    }
  };

  // Synchronize Firestore collections with standard Real-time or Get queries
  const fetchAllData = async () => {
    setLoading(true);
    
    // Switch completely to Supabase if config is set
    if (isSupabaseConfigured && supabase) {
      console.log('Supabase config detected. Using Supabase as the primary database...');
      await fetchFromSupabase();
      setLoading(false);
      return;
    }

    try {
      // Seed first (non-blocking in case of permission issues)
      try {
        await seedDatabaseIfEmpty();
      } catch (seedErr) {
        console.error('Non-blocking seeding error:', seedErr);
      }

      // Read settings config
      onSnapshot(doc(db, 'settings', 'config'), (docSnap) => {
        if (docSnap.exists()) {
          setSettings(docSnap.data() as Settings);
        }
      }, (error) => {
        handleFirestoreError(error, OperationType.GET, 'settings/config');
      });

      // Read services
      onSnapshot(collection(db, 'services'), (snap) => {
        const list: Service[] = [];
        snap.forEach(d => list.push({ ...d.data(), id: d.id } as Service));
        setServices(list.length > 0 ? list : initialServices);
      }, (error) => {
        handleFirestoreError(error, OperationType.GET, 'services');
      });

      // Read projects
      onSnapshot(collection(db, 'projects'), (snap) => {
        const list: Project[] = [];
        snap.forEach(d => list.push({ ...d.data(), id: d.id } as Project));
        setProjects(list.length > 0 ? list : initialProjects);
      }, (error) => {
        handleFirestoreError(error, OperationType.GET, 'projects');
      });

      // Read gallery
      onSnapshot(collection(db, 'gallery'), (snap) => {
        const list: GalleryItem[] = [];
        snap.forEach(d => list.push({ ...d.data(), id: d.id } as GalleryItem));
        setGallery(list.length > 0 ? list : initialGallery);
      }, (error) => {
        handleFirestoreError(error, OperationType.GET, 'gallery');
      });

      // Read testimonials
      onSnapshot(collection(db, 'testimonials'), (snap) => {
        const list: Testimonial[] = [];
        snap.forEach(d => list.push({ ...d.data(), id: d.id } as Testimonial));
        setTestimonials(list.length > 0 ? list : initialTestimonials);
      }, (error) => {
        handleFirestoreError(error, OperationType.GET, 'testimonials');
      });

      // Read blogs
      onSnapshot(collection(db, 'blogs'), (snap) => {
        const list: Blog[] = [];
        snap.forEach(d => list.push({ ...d.data(), id: d.id } as Blog));
        setBlogs(list.length > 0 ? list : initialBlogs);
      }, (error) => {
        handleFirestoreError(error, OperationType.GET, 'blogs');
      });

      // Read FAQs
      onSnapshot(collection(db, 'faqs'), (snap) => {
        const list: FAQ[] = [];
        snap.forEach(d => list.push({ ...d.data(), id: d.id } as FAQ));
        setFaqs(list.length > 0 ? list : initialFaqs);
      }, (error) => {
        handleFirestoreError(error, OperationType.GET, 'faqs');
      });

      // Read Team
      onSnapshot(collection(db, 'team'), (snap) => {
        const list: TeamMember[] = [];
        snap.forEach(d => list.push({ ...d.data(), id: d.id } as TeamMember));
        setTeam(list.length > 0 ? list : initialTeam);
      }, (error) => {
        handleFirestoreError(error, OperationType.GET, 'team');
      });

    } catch (err) {
      console.error("Error setting up listeners", err);
    } finally {
      setLoading(false);
    }
  };

  // Auth changed listener
  useEffect(() => {
    fetchAllData();

    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Enforce admin check
        const isUserAdmin = currentUser.email === "hasanmdrakib193@gmail.com";
        setGoogleAdmin(isUserAdmin);
      } else {
        setGoogleAdmin(false);
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  // Listen to messages in real-time if admin
  useEffect(() => {
    if (isAdmin) {
      if (isSupabaseConfigured && supabase) {
        // Periodic polling for Supabase messages
        const loadSupabaseMessages = async () => {
          try {
            const { data } = await supabase.from('messages').select('*').order('createdAt', { ascending: false });
            if (data) {
              setMessages(data as ContactMessage[]);
            }
          } catch (err) {
            console.warn("Error fetching Supabase messages:", err);
          }
        };
        loadSupabaseMessages();
        const intervalId = setInterval(loadSupabaseMessages, 10000);
        return () => clearInterval(intervalId);
      } else {
        const messagesQuery = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
        const unsubscribeMessages = onSnapshot(messagesQuery, (snap) => {
          const list: ContactMessage[] = [];
          snap.forEach(d => {
            list.push({ ...d.data(), id: d.id } as ContactMessage);
          });
          setMessages(list);
        }, (error) => {
          handleFirestoreError(error, OperationType.LIST, 'messages');
        });
        return () => unsubscribeMessages();
      }
    } else {
      setMessages([]);
    }
  }, [isAdmin]);

  // Dynamically update favicon if settings has faviconUrl
  useEffect(() => {
    if (settings.faviconUrl) {
      const link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
      if (link) {
        link.href = settings.faviconUrl;
      } else {
        const newLink = document.createElement('link');
        newLink.rel = 'icon';
        newLink.href = settings.faviconUrl;
        document.head.appendChild(newLink);
      }
    }
  }, [settings.faviconUrl]);

  // Submit Contact Form
  const submitContactForm = async (name: string, phone: string, email: string, subject: string, message: string): Promise<boolean> => {
    try {
      const msgId = 'msg-' + Date.now();
      const payload: ContactMessage = {
        id: msgId,
        name,
        phone,
        email: email || '',
        subject: subject || 'General Consultation Request',
        message,
        status: 'unread',
        createdAt: new Date().toISOString()
      };
      
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.from('messages').insert({
          id: msgId,
          name,
          phone,
          email: email || '',
          subject: subject || 'General Consultation Request',
          message,
          status: 'unread',
          createdAt: payload.createdAt
        });
        if (error) throw error;
      } else {
        await setDoc(doc(db, 'messages', msgId), payload);
      }

      showNotification(
        lang === 'bn' ? 'আপনার বার্তা সফলভাবে গৃহীত হয়েছে! আমরা শীঘ্রই যোগাযোগ করব।' : 'Your message has been sent successfully! We will contact you soon.', 
        'success'
      );
      return true;
    } catch (error) {
      showNotification(
        lang === 'bn' ? 'বার্তা পাঠাতে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।' : 'Failed to send message. Please try again.', 
        'error'
      );
      if (!isSupabaseConfigured) {
        handleFirestoreError(error, OperationType.CREATE, 'messages');
      } else {
        console.error("Supabase send message error:", error);
      }
      return false;
    }
  };

  const adminLogin = (usernameInput: string, passwordInput: string): boolean => {
    const correctUsername = settings.adminUsername || 'admin';
    const correctPassword = settings.adminPassword || 'admin123';
    if (usernameInput === correctUsername && passwordInput === correctPassword) {
      setCustomAdmin(true);
      localStorage.setItem('isAdminLoggedIn', 'true');
      showNotification(
        lang === 'bn' ? 'অ্যাডমিন প্যানেলে সফলভাবে লগইন হয়েছে!' : 'Logged into Admin Panel successfully!',
        'success'
      );
      return true;
    }
    showNotification(
      lang === 'bn' ? 'ভুল ইউজারনেম অথবা পাসওয়ার্ড!' : 'Incorrect username or password!',
      'error'
    );
    return false;
  };

  const adminLogout = () => {
    setCustomAdmin(false);
    localStorage.removeItem('isAdminLoggedIn');
    showNotification(
      lang === 'bn' ? 'অ্যাডমিন প্যানেল থেকে লগআউট করা হয়েছে।' : 'Logged out of Admin Panel.',
      'success'
    );
  };

  const refreshAllData = async () => {
    await fetchAllData();
  };

  return (
    <AppContext.Provider value={{
      lang,
      setLang,
      searchQuery,
      setSearchQuery,
      settings,
      services,
      projects,
      gallery,
      testimonials,
      blogs,
      faqs,
      team,
      messages,
      loading,
      user,
      isAdmin,
      notification,
      showNotification,
      submitContactForm,
      refreshAllData,
      adminLogin,
      adminLogout
    }}>
      {children}
    </AppContext.Provider>
  );
};
