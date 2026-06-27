import React, { createContext, useContext, useState, useEffect } from "react";
import { AppData, CompanySettings, ServiceItem, ProjectItem, TestimonialItem, BlogItem, FaqItem, TeamMember, ContactMessage, Statistics } from "../types";
import { initialAppData } from "../defaultData";
import { encryptData, decryptData } from "../utils/security";
import { isSupabaseConfigured, fetchSiteDataFromSupabase, saveSiteDataToSupabase } from "../utils/supabaseClient";

interface AppContextProps {
  data: AppData;
  lang: "bn" | "en";
  setLang: (lang: "bn" | "en") => void;
  isAdmin: boolean;
  loginAdmin: (password: string, email: string) => boolean;
  logoutAdmin: () => void;
  adminEmail: string;
  updateAdminCredentials: (email: string, pass: string) => boolean;
  twoFactorSetup: { enabled: boolean; secret: string };
  toggleTwoFactor: () => void;
  
  // Supabase integrations
  supabaseConfigured: boolean;
  supabaseSyncStatus: "idle" | "syncing" | "success" | "error";
  syncWithSupabase: () => Promise<boolean>;
  
  // Custom interactive setters
  updateSettings: (settings: Partial<CompanySettings>) => void;
  updateStats: (stats: Partial<Statistics>) => void;
  
  // Manage services
  addService: (srv: Omit<ServiceItem, "id">) => void;
  updateService: (id: string, srv: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;

  // Manage projects
  addProject: (proj: Omit<ProjectItem, "id">) => void;
  updateProject: (id: string, proj: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;

  // Manage testimonials
  addTestimonial: (test: Omit<TestimonialItem, "id">) => void;
  updateTestimonial: (id: string, test: Partial<TestimonialItem>) => void;
  deleteTestimonial: (id: string) => void;

  // Manage blogs
  addBlog: (blog: Omit<BlogItem, "id">) => void;
  updateBlog: (id: string, blog: Partial<BlogItem>) => void;
  deleteBlog: (id: string) => void;

  // Manage FAQs
  addFaq: (faq: Omit<FaqItem, "id">) => void;
  updateFaq: (id: string, faq: Partial<FaqItem>) => void;
  deleteFaq: (id: string) => void;

  // Manage Team
  addTeamMember: (member: Omit<TeamMember, "id">) => void;
  updateTeamMember: (id: string, member: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;

  // Messages handling
  submitMessage: (msg: Omit<ContactMessage, "id" | "date" | "status">) => void;
  markMessageRead: (id: string) => void;
  deleteMessage: (id: string) => void;

  // System management
  importBackup: (backupJson: string) => boolean;
  resetToDefault: () => void;
  showConsultationModal: boolean;
  setShowConsultationModal: (show: boolean) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

const LOCAL_STORAGE_KEY = "aminul_consultancy_data_v1";
const ADMIN_EMAIL_KEY = "aminul_admin_email";
const ADMIN_PASS_KEY = "aminul_admin_pass";
const ADMIN_2FA_KEY = "aminul_admin_2fa";

// Robust self-healing migration to eliminate any duplicate React list keys
function sanitizeAppData(loaded: any): AppData {
  if (!loaded || typeof loaded !== "object") return initialAppData;

  const sanitizeList = <T extends { id: string }>(list: T[], prefix: string): T[] => {
    if (!Array.isArray(list)) return [];
    const seen = new Set<string>();
    return list.map((item, idx) => {
      let id = item?.id;
      if (!id || typeof id !== "string" || seen.has(id)) {
        id = `${prefix}_${Date.now()}_${idx}_${Math.random().toString(36).substring(2, 9)}`;
      }
      seen.add(id);
      return { ...item, id };
    });
  };

  return {
    ...initialAppData,
    ...loaded,
    settings: loaded.settings ? { ...initialAppData.settings, ...loaded.settings } : initialAppData.settings,
    stats: loaded.stats ? { ...initialAppData.stats, ...loaded.stats } : initialAppData.stats,
    services: sanitizeList(loaded.services || [], "srv"),
    projects: sanitizeList(loaded.projects || [], "proj"),
    testimonials: sanitizeList(loaded.testimonials || [], "test"),
    blogs: sanitizeList(loaded.blogs || [], "blog"),
    faqs: sanitizeList(loaded.faqs || [], "faq"),
    team: sanitizeList(loaded.team || [], "team"),
    messages: sanitizeList(loaded.messages || [], "msg"),
  };
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AppData>(initialAppData);
  const [lang, setLang] = useState<"bn" | "en">("bn");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [adminEmail, setAdminEmail] = useState<string>("admin");
  const [adminPassword, setAdminPassword] = useState<string>("admin1");
  const [twoFactorSetup, setTwoFactorSetup] = useState<{ enabled: boolean; secret: string }>({
    enabled: false,
    secret: "AMINUL-AUTH-6E0E-443D-8A7C"
  });
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [supabaseSyncStatus, setSupabaseSyncStatus] = useState<"idle" | "syncing" | "success" | "error">("idle");

  // Force manual sync to Supabase helper
  const syncWithSupabase = async (payload: AppData = data): Promise<boolean> => {
    if (!isSupabaseConfigured) return false;
    setSupabaseSyncStatus("syncing");
    try {
      const ok = await saveSiteDataToSupabase(payload);
      if (ok) {
        setSupabaseSyncStatus("success");
        setTimeout(() => setSupabaseSyncStatus("idle"), 3000);
        return true;
      } else {
        setSupabaseSyncStatus("error");
        setTimeout(() => setSupabaseSyncStatus("idle"), 3000);
        return false;
      }
    } catch (err) {
      console.error("Supabase manual sync failed:", err);
      setSupabaseSyncStatus("error");
      setTimeout(() => setSupabaseSyncStatus("idle"), 3000);
      return false;
    }
  };

  // Load from Supabase with fallback to LocalStorage, plus self-healing duplicate keys check
  useEffect(() => {
    const loadData = async () => {
      let loadedFromSupabase = false;
      if (isSupabaseConfigured) {
        console.log("Supabase configured, loading data...");
        setSupabaseSyncStatus("syncing");
        const dbData = await fetchSiteDataFromSupabase();
        if (dbData) {
          const sanitized = sanitizeAppData(dbData);
          setData(sanitized);
          loadedFromSupabase = true;
          setSupabaseSyncStatus("success");
          setTimeout(() => setSupabaseSyncStatus("idle"), 3000);
          console.log("Loaded successfully from Supabase");
        } else {
          setSupabaseSyncStatus("error");
          setTimeout(() => setSupabaseSyncStatus("idle"), 3000);
          console.log("No Supabase data. Loading LocalStorage...");
        }
      }

      if (!loadedFromSupabase) {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
          try {
            let parsed: any = null;
            if (saved.trim().startsWith("{") || saved.trim().startsWith("[")) {
              // Cleartext legacy data
              parsed = JSON.parse(saved);
            } else {
              // Encrypted secure data
              const decrypted = decryptData(saved);
              if (decrypted) {
                parsed = JSON.parse(decrypted);
              } else {
                parsed = JSON.parse(saved);
              }
            }

            if (parsed) {
              const sanitized = sanitizeAppData(parsed);
              setData(sanitized);

              // If changes were made to sanitize keys, write back to local storage immediately
              if (JSON.stringify(parsed) !== JSON.stringify(sanitized)) {
                console.warn("Self-healing system: Cleaned duplicate or invalid list keys in AppData state.");
                setTimeout(() => {
                  try {
                    const encryptedString = encryptData(JSON.stringify(sanitized));
                    localStorage.setItem(LOCAL_STORAGE_KEY, encryptedString);
                  } catch (err) {
                    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sanitized));
                  }
                }, 50);
              }

              // Seed Supabase if it's newly configured
              if (isSupabaseConfigured) {
                console.log("Seeding Supabase with local data...");
                await saveSiteDataToSupabase(sanitized);
              }
            }
          } catch (e) {
            console.error("Failed to parse saved database state", e);
          }
        } else if (isSupabaseConfigured) {
          // Both empty, seed Supabase with default initialAppData
          console.log("Seeding Supabase with initial data...");
          await saveSiteDataToSupabase(initialAppData);
        }
      }
    };

    loadData();

    const savedEmail = localStorage.getItem(ADMIN_EMAIL_KEY);
    const savedPass = localStorage.getItem(ADMIN_PASS_KEY);
    if (savedEmail) {
      try {
        const decryptedEmail = decryptData(savedEmail);
        setAdminEmail(decryptedEmail || savedEmail);
      } catch {
        setAdminEmail(savedEmail);
      }
    }
    if (savedPass) {
      try {
        const decryptedPass = decryptData(savedPass);
        setAdminPassword(decryptedPass || savedPass);
      } catch {
        setAdminPassword(savedPass);
      }
    }

    const saved2FA = localStorage.getItem(ADMIN_2FA_KEY);
    if (saved2FA) {
      try {
        if (saved2FA.trim().startsWith("{")) {
          setTwoFactorSetup(JSON.parse(saved2FA));
        } else {
          const decrypted2FA = decryptData(saved2FA);
          if (decrypted2FA) {
            setTwoFactorSetup(JSON.parse(decrypted2FA));
          } else {
            setTwoFactorSetup(JSON.parse(saved2FA));
          }
        }
      } catch (e) {
        console.error("Failed to parse 2FA info", e);
      }
    }
  }, []);

  // Save utility with robust client-side encryption and Supabase sync
  const saveToLocal = (updated: AppData) => {
    setData(updated);
    try {
      const encryptedString = encryptData(JSON.stringify(updated));
      localStorage.setItem(LOCAL_STORAGE_KEY, encryptedString);
    } catch (e) {
      console.error("Failed to encrypt and save state", e);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    }

    if (isSupabaseConfigured) {
      setSupabaseSyncStatus("syncing");
      saveSiteDataToSupabase(updated).then((ok) => {
        if (ok) {
          setSupabaseSyncStatus("success");
          setTimeout(() => setSupabaseSyncStatus("idle"), 2000);
        } else {
          setSupabaseSyncStatus("error");
          setTimeout(() => setSupabaseSyncStatus("idle"), 2000);
        }
      });
    }
  };

  // Admin login actions
  const loginAdmin = (email: string, pass: string): boolean => {
    if (email.trim().toLowerCase() === adminEmail.trim().toLowerCase() && pass === adminPassword) {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
  };

  const updateAdminCredentials = (email: string, pass: string): boolean => {
    if (email.trim() && pass.trim()) {
      setAdminEmail(email.trim());
      setAdminPassword(pass.trim());
      
      // Encrypt credentials before saving to local storage
      const encryptedEmail = encryptData(email.trim());
      const encryptedPass = encryptData(pass.trim());
      
      localStorage.setItem(ADMIN_EMAIL_KEY, encryptedEmail);
      localStorage.setItem(ADMIN_PASS_KEY, encryptedPass);
      return true;
    }
    return false;
  };

  const toggleTwoFactor = () => {
    const nextVal = { ...twoFactorSetup, enabled: !twoFactorSetup.enabled };
    setTwoFactorSetup(nextVal);
    
    // Encrypt 2FA configuration state
    try {
      const encrypted2FA = encryptData(JSON.stringify(nextVal));
      localStorage.setItem(ADMIN_2FA_KEY, encrypted2FA);
    } catch {
      localStorage.setItem(ADMIN_2FA_KEY, JSON.stringify(nextVal));
    }
  };

  // General configuration
  const updateSettings = (settings: Partial<CompanySettings>) => {
    const updated = {
      ...data,
      settings: { ...data.settings, ...settings }
    };
    saveToLocal(updated);
  };

  const updateStats = (stats: Partial<Statistics>) => {
    const updated = {
      ...data,
      stats: { ...data.stats, ...stats }
    };
    saveToLocal(updated);
  };

  // Service CRUD
  const addService = (srv: Omit<ServiceItem, "id">) => {
    const newSrv: ServiceItem = {
      ...srv,
      id: "srv_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9)
    };
    const updated = {
      ...data,
      services: [...data.services, newSrv]
    };
    saveToLocal(updated);
  };

  const updateService = (id: string, srv: Partial<ServiceItem>) => {
    const updated = {
      ...data,
      services: data.services.map((s) => (s.id === id ? { ...s, ...srv } : s))
    };
    saveToLocal(updated);
  };

  const deleteService = (id: string) => {
    const updated = {
      ...data,
      services: data.services.filter((s) => s.id !== id)
    };
    saveToLocal(updated);
  };

  // Projects CRUD
  const addProject = (proj: Omit<ProjectItem, "id">) => {
    const newProj: ProjectItem = {
      ...proj,
      id: "proj_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9)
    };
    const updated = {
      ...data,
      projects: [...data.projects, newProj]
    };
    saveToLocal(updated);
  };

  const updateProject = (id: string, proj: Partial<ProjectItem>) => {
    const updated = {
      ...data,
      projects: data.projects.map((p) => (p.id === id ? { ...p, ...proj } : p))
    };
    saveToLocal(updated);
  };

  const deleteProject = (id: string) => {
    const updated = {
      ...data,
      projects: data.projects.filter((p) => p.id !== id)
    };
    saveToLocal(updated);
  };

  // Testimonials CRUD
  const addTestimonial = (test: Omit<TestimonialItem, "id">) => {
    const newTest: TestimonialItem = {
      ...test,
      id: "test_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9)
    };
    const updated = {
      ...data,
      testimonials: [...data.testimonials, newTest]
    };
    saveToLocal(updated);
  };

  const updateTestimonial = (id: string, test: Partial<TestimonialItem>) => {
    const updated = {
      ...data,
      testimonials: data.testimonials.map((t) => (t.id === id ? { ...t, ...test } : t))
    };
    saveToLocal(updated);
  };

  const deleteTestimonial = (id: string) => {
    const updated = {
      ...data,
      testimonials: data.testimonials.filter((t) => t.id !== id)
    };
    saveToLocal(updated);
  };

  // Blogs CRUD
  const addBlog = (blog: Omit<BlogItem, "id">) => {
    const newBlog: BlogItem = {
      ...blog,
      id: "blog_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9)
    };
    const updated = {
      ...data,
      blogs: [...data.blogs, newBlog]
    };
    saveToLocal(updated);
  };

  const updateBlog = (id: string, blog: Partial<BlogItem>) => {
    const updated = {
      ...data,
      blogs: data.blogs.map((b) => (b.id === id ? { ...b, ...blog } : b))
    };
    saveToLocal(updated);
  };

  const deleteBlog = (id: string) => {
    const updated = {
      ...data,
      blogs: data.blogs.filter((b) => b.id !== id)
    };
    saveToLocal(updated);
  };

  // FAQs CRUD
  const addFaq = (faq: Omit<FaqItem, "id">) => {
    const newFaq: FaqItem = {
      ...faq,
      id: "faq_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9)
    };
    const updated = {
      ...data,
      faqs: [...data.faqs, newFaq]
    };
    saveToLocal(updated);
  };

  const updateFaq = (id: string, faq: Partial<FaqItem>) => {
    const updated = {
      ...data,
      faqs: data.faqs.map((f) => (f.id === id ? { ...f, ...faq } : f))
    };
    saveToLocal(updated);
  };

  const deleteFaq = (id: string) => {
    const updated = {
      ...data,
      faqs: data.faqs.filter((f) => f.id !== id)
    };
    saveToLocal(updated);
  };

  // Team CRUD
  const addTeamMember = (member: Omit<TeamMember, "id">) => {
    const newMember: TeamMember = {
      ...member,
      id: "team_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9)
    };
    const updated = {
      ...data,
      team: [...data.team, newMember]
    };
    saveToLocal(updated);
  };

  const updateTeamMember = (id: string, member: Partial<TeamMember>) => {
    const updated = {
      ...data,
      team: data.team.map((t) => (t.id === id ? { ...t, ...member } : t))
    };
    saveToLocal(updated);
  };

  const deleteTeamMember = (id: string) => {
    const updated = {
      ...data,
      team: data.team.filter((t) => t.id !== id)
    };
    saveToLocal(updated);
  };

  // Contact inbox handling
  const submitMessage = (msg: Omit<ContactMessage, "id" | "date" | "status">) => {
    const newMsg: ContactMessage = {
      ...msg,
      id: "msg_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9),
      date: new Date().toISOString(),
      status: "unread"
    };
    const updated = {
      ...data,
      messages: [newMsg, ...data.messages]
    };
    saveToLocal(updated);
  };

  const markMessageRead = (id: string) => {
    const updated = {
      ...data,
      messages: data.messages.map((m) => (m.id === id ? { ...m, status: "read" as const } : m))
    };
    saveToLocal(updated);
  };

  const deleteMessage = (id: string) => {
    const updated = {
      ...data,
      messages: data.messages.filter((m) => m.id !== id)
    };
    saveToLocal(updated);
  };

  // System actions
  const importBackup = (backupJson: string): boolean => {
    try {
      const parsed = JSON.parse(backupJson);
      if (parsed.settings && Array.isArray(parsed.services) && Array.isArray(parsed.projects)) {
        const sanitized = sanitizeAppData(parsed);
        saveToLocal(sanitized);
        return true;
      }
    } catch (e) {
      console.error("Failed to parse backup string during restore", e);
    }
    return false;
  };

  const resetToDefault = () => {
    if (window.confirm("Are you sure you want to restore the official Aminul Consultancy default content? This will reset all current manual edits.")) {
      saveToLocal(initialAppData);
    }
  };

  return (
    <AppContext.Provider
      value={{
        data,
        lang,
        setLang,
        isAdmin,
        loginAdmin,
        logoutAdmin,
        adminEmail,
        updateAdminCredentials,
        twoFactorSetup,
        toggleTwoFactor,
        supabaseConfigured: isSupabaseConfigured,
        supabaseSyncStatus,
        syncWithSupabase,
        updateSettings,
        updateStats,
        addService,
        updateService,
        deleteService,
        addProject,
        updateProject,
        deleteProject,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        addBlog,
        updateBlog,
        deleteBlog,
        addFaq,
        updateFaq,
        deleteFaq,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        submitMessage,
        markMessageRead,
        deleteMessage,
        importBackup,
        resetToDefault,
        showConsultationModal,
        setShowConsultationModal
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
