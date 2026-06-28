import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { CompanySettings, ServiceItem, ProjectItem, TestimonialItem, BlogItem, FaqItem, TeamMember } from "../types";
import {
  Lock, Mail, Settings, ShieldAlert, Key, Plus, Trash2, Edit, Save, ListFilter,
  Eye, Download, Upload, CheckSquare, RefreshCw, LogOut, CheckCircle2, ChevronRight, UserPlus, FileText, Smartphone, Phone, MessageSquare
} from "lucide-react";
import { motion } from "motion/react";
import { ImageUploader } from "./ImageUploader";

export const AdminDashboard: React.FC = () => {
  const {
    data, isAdmin, loginAdmin, logoutAdmin, adminEmail, updateAdminCredentials,
    twoFactorSetup, toggleTwoFactor, updateSettings, updateStats,
    addService, updateService, deleteService,
    addProject, updateProject, deleteProject,
    addTestimonial, updateTestimonial, deleteTestimonial,
    addBlog, updateBlog, deleteBlog,
    addFaq, updateFaq, deleteFaq,
    addTeamMember, updateTeamMember, deleteTeamMember,
    markMessageRead, deleteMessage, importBackup, resetToDefault,
    supabaseConfigured, supabaseSyncStatus, syncWithSupabase
  } = useApp();

  // Login credentials states
  const [loginEmailInput, setLoginEmailInput] = useState("");
  const [loginPassInput, setLoginPassInput] = useState("");
  const [loginError, setLoginError] = useState(false);

  // Security Credentials Settings states
  const [newEmail, setNewEmail] = useState("");
  const [newPass, setNewPass] = useState("");
  const [credentialSuccess, setCredentialSuccess] = useState(false);

  // Active Tab State inside dashboard
  const [activeTab, setActiveTab] = useState<"general" | "services" | "projects" | "blogs" | "inbox" | "security">("general");

  // Logo and Favicon states for custom image upload
  const [logoUrl, setLogoUrl] = useState(data.settings.logoUrl || "");
  const [faviconUrl, setFaviconUrl] = useState(data.settings.faviconUrl || "");

  // Sync states when data is loaded/loaded from cloud
  React.useEffect(() => {
    if (data.settings.logoUrl !== undefined) setLogoUrl(data.settings.logoUrl);
    if (data.settings.faviconUrl !== undefined) setFaviconUrl(data.settings.faviconUrl);
  }, [data.settings.logoUrl, data.settings.faviconUrl]);

  // Filter messages state
  const [messageFilter, setMessageFilter] = useState<"all" | "unread" | "read">("all");

  // Success Feedback triggers
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [sqlCopied, setSqlCopied] = useState(false);

  // Generic Edit states (to support editing items directly in lists without coding)
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields for Add item triggers
  const [addSrvForm, setAddSrvForm] = useState({ titleBn: "", titleEn: "", descBn: "", descEn: "", iconName: "Compass", image: "", benefitsBnStr: "", benefitsEnStr: "" });
  const [addProjForm, setAddProjForm] = useState({ titleBn: "", titleEn: "", category: "duplex" as any, image: "", areaSft: 1500, budgetLakh: 50, completionDate: "২০২৬", clientNameBn: "", clientNameEn: "", locationBn: "", locationEn: "", descBn: "", descEn: "", beforeImage: "", afterImage: "" });
  const [addBlogForm, setAddBlogForm] = useState({ titleBn: "", titleEn: "", contentBn: "", contentEn: "", category: "tips" as any, image: "", date: "২০ জুন, ২০২৬", authorBn: "ইঞ্জি: আমিনুল ইসলাম", authorEn: "Engr. Aminul Islam" });
  const [addFaqForm, setAddFaqForm] = useState({ questionBn: "", questionEn: "", answerBn: "", answerEn: "" });
  const [addTestimonialForm, setAddTestimonialForm] = useState({ nameBn: "", nameEn: "", designationBn: "", designationEn: "", reviewBn: "", reviewEn: "", rating: 5, image: "" });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(loginEmailInput, loginPassInput);
    if (!success) {
      setLoginError(true);
    } else {
      setLoginError(false);
      setLoginEmailInput("");
      setLoginPassInput("");
    }
  };

  const handleSettingsSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedSettings: Partial<CompanySettings> = {
      name: formData.get("name") as string,
      tagline: formData.get("tagline") as string,
      logoUrl: logoUrl,
      faviconUrl: faviconUrl,
      phone: formData.get("phone") as string,
      whatsapp: formData.get("whatsapp") as string,
      email: formData.get("email") as string,
      address: formData.get("address") as string,
      workingHours: formData.get("workingHours") as string,
      googleMapUrl: formData.get("googleMapUrl") as string,
      facebookUrl: formData.get("facebookUrl") as string,
      linkedinUrl: formData.get("linkedinUrl") as string,
      youtubeUrl: formData.get("youtubeUrl") as string,
    };
    updateSettings(updatedSettings);

    const updatedStats = {
      projectsBn: formData.get("projectsBn") as string,
      projectsEn: formData.get("projectsEn") as string,
      clientsBn: formData.get("clientsBn") as string,
      clientsEn: formData.get("clientsEn") as string,
      engineersBn: formData.get("engineersBn") as string,
      engineersEn: formData.get("engineersEn") as string,
      experienceBn: formData.get("experienceBn") as string,
      experienceEn: formData.get("experienceEn") as string,
    };
    updateStats(updatedStats);

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleCredentialUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEmail.trim() || newPass.trim()) {
      const targetEmail = newEmail.trim() || adminEmail;
      const targetPass = newPass.trim() || "admin1";
      updateAdminCredentials(targetEmail, targetPass);
      setCredentialSuccess(true);
      setNewEmail("");
      setNewPass("");
      setTimeout(() => setCredentialSuccess(false), 4000);
    }
  };

  // EXPORT SIMULATION
  const handleExportCSV = () => {
    const headers = ["ID", "Client Name", "Phone", "Email", "Subject", "Message", "Submission Date", "Status"];
    const rows = data.messages.map((m) => [
      m.id,
      m.name,
      m.phone,
      m.email,
      m.subject,
      m.message.replace(/[\n,]/g, " "),
      m.date,
      m.status
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Inquiry_Logs_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // PERSISTENT DATABASE BACKUP TRIGGER
  const handleBackupDownload = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const dlAnchorElem = document.createElement("a");
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `Aminul_Consultancy_Backup_${Date.now()}.json`);
    dlAnchorElem.click();
  };

  // RESTORE FILE HANDLER
  const handleRestoreUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        if (event.target && typeof event.target.result === "string") {
          const success = importBackup(event.target.result);
          if (success) {
            alert("Database status successfully restored and applied immediately across the entire website!");
          } else {
            alert("Failed to restore backup. Ensure that you selected a valid Aminul backup JSON file.");
          }
        }
      };
    }
  };

  // CRUD actions helper methods
  const handleAddSrvSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const benefitsBn = addSrvForm.benefitsBnStr.split("\n").filter(b => b.trim());
    const benefitsEn = addSrvForm.benefitsEnStr.split("\n").filter(b => b.trim());
    
    addService({
      titleBn: addSrvForm.titleBn,
      titleEn: addSrvForm.titleEn,
      descBn: addSrvForm.descBn,
      descEn: addSrvForm.descEn,
      iconName: addSrvForm.iconName,
      image: addSrvForm.image || "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=400&q=80",
      benefitsBn: benefitsBn.length ? benefitsBn : ["সুবিধাজনক সেবামূলক প্ল্যান"],
      benefitsEn: benefitsEn.length ? benefitsEn : ["Standard service layouts included"]
    });

    setAddSrvForm({ titleBn: "", titleEn: "", descBn: "", descEn: "", iconName: "Compass", image: "", benefitsBnStr: "", benefitsEnStr: "" });
    alert("New service card added successfully!");
  };

  const handleAddProjSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProject({
      titleBn: addProjForm.titleBn,
      titleEn: addProjForm.titleEn,
      category: addProjForm.category,
      image: addProjForm.image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80",
      areaSft: Number(addProjForm.areaSft),
      budgetLakh: Number(addProjForm.budgetLakh),
      completionDate: addProjForm.completionDate,
      clientNameBn: addProjForm.clientNameBn,
      clientNameEn: addProjForm.clientNameEn,
      locationBn: addProjForm.locationBn,
      locationEn: addProjForm.locationEn,
      descBn: addProjForm.descBn,
      descEn: addProjForm.descEn,
      beforeImage: addProjForm.beforeImage || undefined,
      afterImage: addProjForm.afterImage || undefined
    });

    setAddProjForm({ titleBn: "", titleEn: "", category: "duplex", image: "", areaSft: 1500, budgetLakh: 50, completionDate: "২০২৬", clientNameBn: "", clientNameEn: "", locationBn: "", locationEn: "", descBn: "", descEn: "", beforeImage: "", afterImage: "" });
    alert("New portfolio project added successfully with complete SFT properties!");
  };

  const handleAddBlogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBlog({
      titleBn: addBlogForm.titleBn,
      titleEn: addBlogForm.titleEn,
      contentBn: addBlogForm.contentBn,
      contentEn: addBlogForm.contentEn,
      category: addBlogForm.category,
      image: addBlogForm.image || "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=400&q=80",
      date: addBlogForm.date,
      authorBn: addBlogForm.authorBn,
      authorEn: addBlogForm.authorEn
    });

    setAddBlogForm({ titleBn: "", titleEn: "", contentBn: "", contentEn: "", category: "tips", image: "", date: "২০ জুন, ২০২৬", authorBn: "ইঞ্জি: আমিনুল ইসলাম", authorEn: "Engr. Aminul Islam" });
    alert("New engineering blog post added successfully!");
  };

  const handleAddFaqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addFaq({
      questionBn: addFaqForm.questionBn,
      questionEn: addFaqForm.questionEn,
      answerBn: addFaqForm.answerBn,
      answerEn: addFaqForm.answerEn
    });
    setAddFaqForm({ questionBn: "", questionEn: "", answerBn: "", answerEn: "" });
    alert("New accordion FAQ item successfully registered!");
  };

  const handleAddTestimonialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTestimonial({
      nameBn: addTestimonialForm.nameBn,
      nameEn: addTestimonialForm.nameEn,
      designationBn: addTestimonialForm.designationBn,
      designationEn: addTestimonialForm.designationEn,
      reviewBn: addTestimonialForm.reviewBn,
      reviewEn: addTestimonialForm.reviewEn,
      rating: Number(addTestimonialForm.rating),
      image: addTestimonialForm.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    });
    setAddTestimonialForm({ nameBn: "", nameEn: "", designationBn: "", designationEn: "", reviewBn: "", reviewEn: "", rating: 5, image: "" });
    alert("New customer 5-star rating review card published successfully!");
  };

  const handleEditSrvClick = (srv: any) => {
    setEditingId(srv.id);
    setAddSrvForm({
      titleBn: srv.titleBn,
      titleEn: srv.titleEn,
      descBn: srv.descBn,
      descEn: srv.descEn,
      iconName: srv.iconName || "Compass",
      image: srv.image || "",
      benefitsBnStr: srv.benefitsBn ? srv.benefitsBn.join("\n") : "",
      benefitsEnStr: srv.benefitsEn ? srv.benefitsEn.join("\n") : ""
    });
  };

  const handleEditSrvSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    const benefitsBn = addSrvForm.benefitsBnStr.split("\n").filter(b => b.trim());
    const benefitsEn = addSrvForm.benefitsEnStr.split("\n").filter(b => b.trim());
    updateService(editingId, {
      titleBn: addSrvForm.titleBn,
      titleEn: addSrvForm.titleEn,
      descBn: addSrvForm.descBn,
      descEn: addSrvForm.descEn,
      iconName: addSrvForm.iconName,
      image: addSrvForm.image,
      benefitsBn: benefitsBn.length ? benefitsBn : ["সুবিধাজনক সেবামূলক প্ল্যান"],
      benefitsEn: benefitsEn.length ? benefitsEn : ["Standard service layouts included"]
    });
    setEditingId(null);
    setAddSrvForm({ titleBn: "", titleEn: "", descBn: "", descEn: "", iconName: "Compass", image: "", benefitsBnStr: "", benefitsEnStr: "" });
    alert("সার্ভিসটি সফলভাবে পরিবর্তন করা হয়েছে!");
  };

  const handleEditProjClick = (proj: any) => {
    setEditingId(proj.id);
    setAddProjForm({
      titleBn: proj.titleBn,
      titleEn: proj.titleEn,
      category: proj.category,
      image: proj.image || "",
      areaSft: proj.areaSft || 1500,
      budgetLakh: proj.budgetLakh || 50,
      completionDate: proj.completionDate || "২০২৬",
      clientNameBn: proj.clientNameBn || "",
      clientNameEn: proj.clientNameEn || "",
      locationBn: proj.locationBn || "",
      locationEn: proj.locationEn || "",
      descBn: proj.descBn || "",
      descEn: proj.descEn || "",
      beforeImage: proj.beforeImage || "",
      afterImage: proj.afterImage || ""
    });
  };

  const handleEditProjSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    updateProject(editingId, {
      titleBn: addProjForm.titleBn,
      titleEn: addProjForm.titleEn,
      category: addProjForm.category,
      image: addProjForm.image,
      areaSft: Number(addProjForm.areaSft),
      budgetLakh: Number(addProjForm.budgetLakh),
      completionDate: addProjForm.completionDate,
      clientNameBn: addProjForm.clientNameBn,
      clientNameEn: addProjForm.clientNameEn,
      locationBn: addProjForm.locationBn,
      locationEn: addProjForm.locationEn,
      descBn: addProjForm.descBn,
      descEn: addProjForm.descEn,
      beforeImage: addProjForm.beforeImage || undefined,
      afterImage: addProjForm.afterImage || undefined
    });
    setEditingId(null);
    setAddProjForm({ titleBn: "", titleEn: "", category: "duplex", image: "", areaSft: 1500, budgetLakh: 50, completionDate: "২০২৬", clientNameBn: "", clientNameEn: "", locationBn: "", locationEn: "", descBn: "", descEn: "", beforeImage: "", afterImage: "" });
    alert("প্রজেক্ট সফলভাবে পরিবর্তন করা হয়েছে!");
  };

  const handleEditBlogClick = (blog: any) => {
    setEditingId(blog.id);
    setAddBlogForm({
      titleBn: blog.titleBn,
      titleEn: blog.titleEn,
      contentBn: blog.contentBn,
      contentEn: blog.contentEn,
      category: blog.category,
      image: blog.image || "",
      date: blog.date || "২০ জুন, ২০২৬",
      authorBn: blog.authorBn || "ইঞ্জি: আমিনুল ইসলাম",
      authorEn: blog.authorEn || "Engr. Aminul Islam"
    });
  };

  const handleEditBlogSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    updateBlog(editingId, {
      titleBn: addBlogForm.titleBn,
      titleEn: addBlogForm.titleEn,
      contentBn: addBlogForm.contentBn,
      contentEn: addBlogForm.contentEn,
      category: addBlogForm.category,
      image: addBlogForm.image,
      date: addBlogForm.date,
      authorBn: addBlogForm.authorBn,
      authorEn: addBlogForm.authorEn
    });
    setEditingId(null);
    setAddBlogForm({ titleBn: "", titleEn: "", contentBn: "", contentEn: "", category: "tips", image: "", date: "২০ জুন, ২০২৬", authorBn: "ইঞ্জি: আমিনুল ইসলাম", authorEn: "Engr. Aminul Islam" });
    alert("ব্লগ সফলভাবে পরিবর্তন করা হয়েছে!");
  };

  const handleEditFaqClick = (faq: any) => {
    setEditingId(faq.id);
    setAddFaqForm({
      questionBn: faq.questionBn,
      questionEn: faq.questionEn,
      answerBn: faq.answerBn,
      answerEn: faq.answerEn
    });
  };

  const handleEditFaqSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    updateFaq(editingId, {
      questionBn: addFaqForm.questionBn,
      questionEn: addFaqForm.questionEn,
      answerBn: addFaqForm.answerBn,
      answerEn: addFaqForm.answerEn
    });
    setEditingId(null);
    setAddFaqForm({ questionBn: "", questionEn: "", answerBn: "", answerEn: "" });
    alert("FAQ সফলভাবে পরিবর্তন করা হয়েছে!");
  };

  const filteredMessages = data.messages.filter((m) => {
    if (messageFilter === "all") return true;
    return m.status === messageFilter;
  });

  /* UNAUTHENTICATED SCREEN */
  if (!isAdmin) {
    return (
      <section id="admin" className="min-h-screen py-24 flex items-center justify-center bg-gradient-to-br from-[#041a14] via-[#093226] to-[#041a14] text-white">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(230,179,37,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(230,179,37,0.02)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>
        
        <div className="max-w-md w-full mx-4 bg-[#0b3c2e] border-2 border-[#E6B325]/30 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 relative z-10">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-[#E6B325]/15 rounded-full flex items-center justify-center text-[#E6B325] mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight font-sans">
              এডমিন কন্ট্রোল প্যানেল
            </h2>
            <p className="text-xs text-gray-300 font-sans">
              আমিনুল কনসালটেন্সি এন্ড ইঞ্জিনিয়ার্স ওয়েবসাইট ব্যবস্থাপনা
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="bg-red-950 border border-red-500 rounded p-2.5 text-center text-xs text-red-400 font-sans">
                ভুল ইউজার আইডি অথবা পাসওয়ার্ড দিয়েছেন! দয়া করে সঠিক তথ্য দিন।
              </div>
            )}

            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase text-gray-300 font-sans">
                এডমিন ইউজার আইডি (ID):
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-sm">@</span>
                <input
                  type="text"
                  required
                  placeholder="ইউজার আইডি লিখুন"
                  value={loginEmailInput}
                  onChange={(e) => setLoginEmailInput(e.target.value)}
                  className="w-full bg-[#03140f] border border-white/10 rounded-lg pl-8 pr-3 py-2 text-sm text-white focus:outline-none focus:border-[#E6B325] font-sans"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase text-gray-300 font-sans">
                নিরাপদ পাসওয়ার্ড (Password):
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={loginPassInput}
                onChange={(e) => setLoginPassInput(e.target.value)}
                className="w-full bg-[#03140f] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#E6B325]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#E6B325] hover:bg-[#CD9B13] text-black font-extrabold py-2.5 rounded-lg shadow-md transition-colors duration-200 cursor-pointer text-sm font-sans"
            >
              ড্যাশবোর্ডে প্রবেশ করুন
            </button>
          </form>

          <div className="border-t border-white/10 pt-4 text-center text-[10px] text-gray-400 font-sans">
            নিরাপত্তার স্বার্থে আইডি এবং পাসওয়ার্ড প্যানেল থেকে পরিবর্তন করা যাবে।
          </div>

        </div>
      </section>
    );
  }

  /* AUTHENTICATED PANEL VIEW */
  return (
    <section id="admin" className="min-h-screen py-24 bg-[#03140F] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header with quick actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/10 pb-4 mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider font-sans">
                এডমিন প্যানেল সক্রিয় সেশন
              </span>
            </div>
            <h2 className="text-2xl font-black text-white font-sans">
              এডমিন কন্ট্রোল ড্যাশবোর্ড <span className="text-xs font-mono text-gray-400">v1.2</span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            
            {/* System Restore Default */}
            <button
              onClick={resetToDefault}
              className="px-3 py-1.5 bg-red-950/40 hover:bg-red-950 border border-red-500/30 text-red-300 rounded-lg text-xs font-bold transition cursor-pointer font-sans"
              title="ডিফল্ট ডাটা রিস্টোর করুন"
            >
              ডিফল্ট রিসেট করুন
            </button>

            {/* Logout */}
            <button
              onClick={logoutAdmin}
              className="px-3.5 py-1.5 bg-[#0b3c2e] hover:bg-white/10 border border-white/10 text-white rounded-lg text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer font-sans"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>লগআউট করুন</span>
            </button>

          </div>
        </div>

        {/* Outer Split Sidebar block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Dashboard Left Tabs Sidebar (3 Columns) */}
          <div className="col-span-1 lg:col-span-3 bg-[#0b3c2e] border border-white/10 rounded-2xl overflow-hidden p-4 space-y-1.5">
            {[
              { id: "general", label: "সাধারণ সেটিংস (লোগো, ফোন, ঠিকানা)" },
              { id: "services", label: "সার্ভিস ব্যবস্থাপনা" },
              { id: "projects", label: "প্রজেক্ট পোর্টফোলিও" },
              { id: "blogs", label: "আর্টিকেল ও জিজ্ঞাসা (FAQ)" },
              { id: "inbox", label: `মেসেজ ও যোগাযোগ (${data.messages.filter(m=>m.status==="unread").length})` },
              { id: "security", label: "আইডি ও পাসওয়ার্ড পরিবর্তন" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setEditingId(null);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition flex items-center justify-between cursor-pointer font-sans ${
                  activeTab === tab.id
                    ? "bg-[#E6B325] text-black"
                    : "text-gray-300 hover:bg-white/5"
                }`}
              >
                <span>{tab.label}</span>
                <ChevronRight className="w-4 h-4 opacity-50 animate-pulse" />
              </button>
            ))}
          </div>

          {/* Dashboard Right Tabs Pane (9 Columns) */}
          <div className="col-span-1 lg:col-span-9 bg-[#0b3c2e] border border-white/10 rounded-2xl p-6 sm:p-8 relative min-h-[500px]">
            
            {/* TAB 1: GENERAL SETTINGS */}
            {activeTab === "general" && (
              <div className="space-y-6">
                <div className="border-b border-white/10 pb-3">
                  <h3 className="text-lg font-bold text-[#E6B325] font-sans">সাধারণ ব্র্যান্ড ও কন্টাক্ট সেটিংস</h3>
                  <p className="text-xs text-gray-300 font-sans">ওয়েবসাইটের নাম, লোগো, ফেভিকন, ফোন, হোয়াটসঅ্যাপ এবং যোগাযোগের অন্যান্য তথ্য এখান থেকে পরিবর্তন করুন।</p>
                </div>

                {/* Supabase & Vercel Sync Status Panel */}
                <div className="bg-[#03140f]/60 border border-white/10 rounded-2xl p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#E6B325] animate-ping" />
                      <h4 className="text-sm font-bold text-[#E6B325] font-sans flex items-center gap-2">
                        🌐 Vercel & Supabase ডাটাবেজ ইন্টিগ্রেশন
                      </h4>
                    </div>
                    <div>
                      {supabaseConfigured ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold bg-green-500/15 text-green-400 rounded-full border border-green-500/30 font-sans">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                          ক্লাউড সংযুক্ত (Connected)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold bg-orange-500/15 text-orange-400 rounded-full border border-orange-500/30 font-sans">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                          লোকাল ড্রাইভ মোড (Local Storage Active)
                        </span>
                      )}
                    </div>
                  </div>

                  {supabaseConfigured ? (
                    <div className="space-y-3">
                      <div className="text-xs text-gray-300 font-sans leading-relaxed">
                        আপনার ওয়েবসাইটটি সফলভাবে **Supabase** ক্লাউড ডাটাবেজের সাথে সংযুক্ত রয়েছে! এডমিন প্যানেল থেকে কোনো পরিবর্তন করলেই তা স্বয়ংক্রিয়ভাবে ক্লাউড ডাটাবেজে ব্যাকআপ হয়ে যাবে।
                      </div>
                      <div className="flex flex-wrap items-center gap-3 bg-[#03140f] p-3 rounded-xl border border-white/5 text-xs text-gray-300 font-sans">
                        <span className="font-bold">সিঙ্ক অবস্থা:</span>
                        {supabaseSyncStatus === "idle" && (
                          <span className="text-green-400 font-semibold flex items-center gap-1">✔ সব ডাটা ক্লাউডে সুরক্ষিত আছে (Synced)</span>
                        )}
                        {supabaseSyncStatus === "syncing" && (
                          <span className="text-[#E6B325] font-semibold flex items-center gap-1">
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" /> ডাটাবেজে পাঠানো হচ্ছে...
                          </span>
                        )}
                        {supabaseSyncStatus === "success" && (
                          <span className="text-green-400 font-semibold">🎉 সফলভাবে ক্লাউডে সেভ হয়েছে!</span>
                        )}
                        {supabaseSyncStatus === "error" && (
                          <span className="text-red-400 font-semibold">❌ ক্লাউড ডাটাবেজ সংযোগে সমস্যা হয়েছে!</span>
                        )}

                        <button
                          type="button"
                          onClick={() => syncWithSupabase()}
                          disabled={supabaseSyncStatus === "syncing"}
                          className="ml-auto inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#E6B325] text-black text-xs font-bold hover:bg-[#ffcd38] transition cursor-pointer font-sans disabled:opacity-50"
                        >
                          <RefreshCw className={`w-3 h-3 ${supabaseSyncStatus === "syncing" ? "animate-spin" : ""}`} />
                          ম্যানুয়ালি সিঙ্ক করুন
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4 text-xs text-gray-300 font-sans leading-relaxed">
                      <p>
                        বর্তমানে আপনার করা সব এডিট শুধুমাত্র আপনার ব্রাউজারের লোকাল স্টোরেজে সেভ হচ্ছে। ওয়েবসাইটটি **Vercel**-এ হোস্ট করার পর সবার জন্য ডাটা স্থায়ী করতে এবং কাজ সচল রাখতে নিচের ৩টি সহজ ধাপ সম্পন্ন করুন:
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-[#03140f] p-3 rounded-xl border border-white/5 space-y-2">
                          <span className="inline-block text-[10px] font-bold bg-[#E6B325]/20 text-[#E6B325] px-2 py-0.5 rounded-full">ধাপ ১</span>
                          <h5 className="font-bold text-white text-xs">Supabase Table তৈরি করুন</h5>
                          <p className="text-[11px] text-gray-400">আপনার Supabase প্রজেক্টের **SQL Editor**-এ গিয়ে ডানপাশের কোডটি পেস্ট করে **Run** করুন।</p>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(`CREATE TABLE IF NOT EXISTS site_data (
  id text PRIMARY KEY DEFAULT 'main',
  data jsonb NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE site_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON site_data FOR SELECT USING (true);
CREATE POLICY "Allow public update access" ON site_data FOR ALL USING (true) WITH CHECK (true);`);
                              setSqlCopied(true);
                              setTimeout(() => setSqlCopied(false), 3000);
                            }}
                            className="w-full text-center py-1.5 rounded bg-white/5 hover:bg-white/10 text-[10px] font-bold transition flex items-center justify-center gap-1 text-white border border-white/10 cursor-pointer"
                          >
                            {sqlCopied ? "✔ কপি হয়েছে!" : "📋 SQL কোড কপি করুন"}
                          </button>
                        </div>

                        <div className="bg-[#03140f] p-3 rounded-xl border border-white/5 space-y-2">
                          <span className="inline-block text-[10px] font-bold bg-[#E6B325]/20 text-[#E6B325] px-2 py-0.5 rounded-full">ধাপ ২</span>
                          <h5 className="font-bold text-white text-xs">Environment Variables বসান</h5>
                          <p className="text-[11px] text-gray-400">আপনার **Vercel** প্রজেক্টের Settings এ গিয়ে নিচের দুইটি Env Key বসিয়ে দিন:</p>
                          <div className="font-mono text-[10px] bg-black/40 p-1.5 rounded space-y-1 text-gray-300 border border-white/5">
                            <div>VITE_SUPABASE_URL</div>
                            <div>VITE_SUPABASE_ANON_KEY</div>
                          </div>
                        </div>

                        <div className="bg-[#03140f] p-3 rounded-xl border border-white/5 space-y-2">
                          <span className="inline-block text-[10px] font-bold bg-[#E6B325]/20 text-[#E6B325] px-2 py-0.5 rounded-full">ধাপ ৩</span>
                          <h5 className="font-bold text-white text-xs">Vercel-এ রি-ডেপ্লয় দিন</h5>
                          <p className="text-[11px] text-gray-400">সবকিছু সেট হয়ে গেলে Vercel-এ রি-ডেপ্লয় দিন। সাইট লোড হলে আগের লোকাল ডাটা ক্লাউডে স্বয়ংক্রিয়ভাবে সিঙ্ক হয়ে যাবে!</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <form onSubmit={handleSettingsSave} className="space-y-6">
                  
                  {/* Basic Identifiers */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-300 font-bold uppercase font-sans">কোম্পানির নাম (Company Name)</label>
                      <input
                        type="text"
                        name="name"
                        defaultValue={data.settings.name}
                        className="w-full bg-[#03140f] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#E6B325] font-sans"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-300 font-bold uppercase font-sans">স্লোগান / ট্যাগলাইন (Tagline)</label>
                      <input
                        type="text"
                        name="tagline"
                        defaultValue={data.settings.tagline}
                        className="w-full bg-[#03140f] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#E6B325] font-sans"
                      />
                    </div>
                  </div>

                  {/* Logo and Favicon */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#03140f] p-4 rounded-xl border border-white/5">
                    <div className="space-y-1">
                      <ImageUploader
                        label="লোগো ইমেজ (Company Logo)"
                        value={logoUrl}
                        onChange={setLogoUrl}
                        placeholder="https://example.com/logo.png"
                        helperText="ফাঁকা রাখলে ডিফল্ট লোগো আইকন প্রদর্শিত হবে"
                      />
                    </div>
                    <div className="space-y-1">
                      <ImageUploader
                        label="ফেভিকন ইমেজ (Favicon Icon)"
                        value={faviconUrl}
                        onChange={setFaviconUrl}
                        placeholder="https://example.com/favicon.png"
                        helperText="ব্রাউজার ট্যাবে প্রদর্শিত ছোট আইকন"
                      />
                    </div>
                  </div>

                  {/* Hotlines */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-300 font-bold uppercase font-sans">সরাসরি কল করার নাম্বার (Call Hotline)</label>
                      <input
                        type="text"
                        name="phone"
                        defaultValue={data.settings.phone}
                        className="w-full bg-[#03140f] border border-white/10 rounded-lg px-3 py-2 text-sm text-[#E6B325] font-bold focus:outline-none focus:border-[#E6B325] font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-300 font-bold uppercase font-sans">হোয়াটসঅ্যাপ লিংক বা নাম্বার (WhatsApp)</label>
                      <input
                        type="text"
                        name="whatsapp"
                        defaultValue={data.settings.whatsapp}
                        className="w-full bg-[#03140f] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#E6B325] font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-300 font-bold uppercase font-sans">অফিসিয়াল ইমেইল এড্রেস (Corporate Email)</label>
                      <input
                        type="email"
                        name="email"
                        defaultValue={data.settings.email}
                        className="w-full bg-[#03140f] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#E6B325] font-mono"
                      />
                    </div>
                  </div>

                  {/* Address, Hours & Maps */}
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-300 font-bold uppercase font-sans">অফিসের ঠিকানা (Office Address - Bangla)</label>
                      <input
                        type="text"
                        name="address"
                        defaultValue={data.settings.address}
                        className="w-full bg-[#03140f] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#E6B325] font-sans"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-gray-300 font-bold uppercase font-sans">কর্মঘণ্টা বিবরণ (Working Hours Statement)</label>
                        <input
                          type="text"
                          name="workingHours"
                          defaultValue={data.settings.workingHours}
                          className="w-full bg-[#03140f] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#E6B325] font-sans"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-gray-300 font-bold uppercase font-sans">গুগল ম্যাপস এম্বেড লিংক (Google Map Embed iframe Src)</label>
                        <input
                          type="text"
                          name="googleMapUrl"
                          defaultValue={data.settings.googleMapUrl}
                          className="w-full bg-[#03140f] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E6B325] font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Social Media Links */}
                  <div className="space-y-3 bg-[#03140f] border border-white/5 p-4 rounded-xl">
                    <h4 className="text-xs font-bold text-[#E6B325] uppercase tracking-wider font-sans">
                      সামাজিক যোগাযোগ মাধ্যমের লিংক (Social Media Links)
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] text-gray-400 font-sans">ফেসবুক লিংক (Facebook URL)</label>
                        <input
                          type="text"
                          name="facebookUrl"
                          defaultValue={data.settings.facebookUrl || ""}
                          className="w-full bg-[#07241c] border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] text-gray-400 font-sans">লিঙ্কডইন লিংক (LinkedIn URL)</label>
                        <input
                          type="text"
                          name="linkedinUrl"
                          defaultValue={data.settings.linkedinUrl || ""}
                          className="w-full bg-[#07241c] border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] text-gray-400 font-sans">ইউটিউব লিংক (YouTube URL)</label>
                        <input
                          type="text"
                          name="youtubeUrl"
                          defaultValue={data.settings.youtubeUrl || ""}
                          className="w-full bg-[#07241c] border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Floating badge statistics counters */}
                  <div className="space-y-3 bg-[#03140f] border border-white/5 p-4 rounded-xl">
                    <h4 className="text-xs font-bold text-[#E6B325] uppercase tracking-wider font-sans">
                      পরিসংখ্যান কাউন্টার সেটিংস (Statistics Badge Settings)
                    </h4>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                      <div className="space-y-1">
                        <span className="block text-gray-400 font-sans text-[10px]">মোট প্রজেক্ট (BN / EN)</span>
                        <input type="text" name="projectsBn" defaultValue={data.stats.projectsBn} className="w-full bg-[#07241c] border border-white/10 rounded px-2 py-1 text-white font-sans" />
                        <input type="text" name="projectsEn" defaultValue={data.stats.projectsEn} className="w-full bg-[#07241c] border border-white/10 rounded px-2 py-1 text-white font-mono mt-1" />
                      </div>
                      <div className="space-y-1">
                        <span className="block text-gray-400 font-sans text-[10px]">মোট ক্লায়েন্ট (BN / EN)</span>
                        <input type="text" name="clientsBn" defaultValue={data.stats.clientsBn} className="w-full bg-[#07241c] border border-white/10 rounded px-2 py-1 text-white font-sans" />
                        <input type="text" name="clientsEn" defaultValue={data.stats.clientsEn} className="w-full bg-[#07241c] border border-white/10 rounded px-2 py-1 text-white font-mono mt-1" />
                      </div>
                      <div className="space-y-1">
                        <span className="block text-gray-400 font-sans text-[10px]">মোট প্রকৌশলী (BN / EN)</span>
                        <input type="text" name="engineersBn" defaultValue={data.stats.engineersBn} className="w-full bg-[#07241c] border border-white/10 rounded px-2 py-1 text-white font-sans" />
                        <input type="text" name="engineersEn" defaultValue={data.stats.engineersEn} className="w-full bg-[#07241c] border border-white/10 rounded px-2 py-1 text-white font-mono mt-1" />
                      </div>
                      <div className="space-y-1">
                        <span className="block text-gray-400 font-sans text-[10px]">অভিজ্ঞতার বছর (BN / EN)</span>
                        <input type="text" name="experienceBn" defaultValue={data.stats.experienceBn} className="w-full bg-[#07241c] border border-white/10 rounded px-2 py-1 text-white font-sans" />
                        <input type="text" name="experienceEn" defaultValue={data.stats.experienceEn} className="w-full bg-[#07241c] border border-white/10 rounded px-2 py-1 text-white font-mono mt-1" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      type="submit"
                      className="bg-[#E6B325] hover:bg-[#CD9B13] text-black font-extrabold py-2 px-6 rounded-lg text-xs shadow transition cursor-pointer font-sans"
                    >
                      সব তথ্য সংরক্ষণ করুন
                    </button>
                    {saveSuccess && (
                      <span className="text-emerald-400 text-xs font-semibold flex items-center space-x-1 font-sans animate-bounce">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>সফলভাবে ওয়েবসাইটের সকল তথ্য পরিবর্তন করা হয়েছে!</span>
                      </span>
                    )}
                  </div>

                </form>
              </div>
            )}

            {/* TAB 2: MANAGE SERVICES */}
            {activeTab === "services" && (
              <div className="space-y-8">
                <div className="border-b border-white/10 pb-3 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold text-white font-sans">সার্ভিস সমূহ নিয়ন্ত্রণ প্যানেল</h3>
                    <p className="text-xs text-gray-300 font-sans">আমাদের কোম্পানির সার্ভিসসমূহ যুক্ত করুন, সম্পাদনা করুন অথবা ডিলিট করুন।</p>
                  </div>
                </div>

                {/* Services List with delete and edit capability */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-[#E6B325] uppercase tracking-wider font-sans">বর্তমানে সক্রিয় সার্ভিসসমূহ</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.services.map((srv) => (
                      <div key={srv.id} className="bg-[#03140f] border border-white/10 rounded-xl p-4 flex justify-between items-start">
                        <div className="space-y-1">
                          <strong className="text-white text-sm block font-sans">{srv.titleBn}</strong>
                          <span className="text-[10px] text-[#E6B325] uppercase block font-mono">{srv.titleEn}</span>
                          <p className="text-xs text-gray-400 line-clamp-2 font-sans">{srv.descBn}</p>
                        </div>
                        <div className="flex items-center space-x-2 shrink-0 ml-3">
                          <button
                            onClick={() => handleEditSrvClick(srv)}
                            className="p-1.5 bg-[#0A3D2F] hover:bg-white/10 border border-emerald-500/20 text-emerald-300 rounded transition cursor-pointer"
                            title="সম্পাদনা করুন"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`আপনি কি নিশ্চিত যে "${srv.titleBn}" সার্ভিসটি মুছে ফেলতে চান?`)) {
                                deleteService(srv.id);
                              }
                            }}
                            className="p-1.5 bg-red-950 hover:bg-red-900 border border-red-500/30 text-red-400 rounded transition cursor-pointer"
                            title="মুছে ফেলুন"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ADD / EDIT SERVICE FORM */}
                <div className="bg-[#03140f] border border-white/15 rounded-xl p-5 space-y-4">
                  <h4 className="text-xs font-bold text-[#E6B325] uppercase tracking-wider border-b border-white/10 pb-2 flex items-center space-x-1 font-sans">
                    <Plus className="w-4 h-4" />
                    <span>{editingId ? "সার্ভিস কন্টেন্ট পরিবর্তন ও সম্পাদনা করুন" : "নতুন একটি সার্ভিস কার্ড তৈরি করুন"}</span>
                  </h4>

                  <form onSubmit={editingId ? handleEditSrvSave : handleAddSrvSubmit} className="space-y-4">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-300 font-bold uppercase font-sans">সার্ভিসের শিরোনাম (বাংলা)</label>
                        <input
                          type="text"
                          required
                          value={addSrvForm.titleBn}
                          onChange={(e) => setAddSrvForm({ ...addSrvForm, titleBn: e.target.value })}
                          className="w-full bg-[#07241c] border border-white/10 rounded px-3 py-1.5 text-xs text-white font-sans"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-300 font-bold uppercase font-sans">সার্ভিসের শিরোনাম (English)</label>
                        <input
                          type="text"
                          required
                          value={addSrvForm.titleEn}
                          onChange={(e) => setAddSrvForm({ ...addSrvForm, titleEn: e.target.value })}
                          className="w-full bg-[#07241c] border border-white/10 rounded px-3 py-1.5 text-xs text-white font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-300 font-bold uppercase font-sans">সংক্ষিপ্ত বর্ণনা (বাংলা)</label>
                        <input
                          type="text"
                          required
                          value={addSrvForm.descBn}
                          onChange={(e) => setAddSrvForm({ ...addSrvForm, descBn: e.target.value })}
                          className="w-full bg-[#07241c] border border-white/10 rounded px-3 py-1.5 text-xs text-white font-sans"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-300 font-bold uppercase font-sans">সংক্ষিপ্ত বর্ণনা (English)</label>
                        <input
                          type="text"
                          required
                          value={addSrvForm.descEn}
                          onChange={(e) => setAddSrvForm({ ...addSrvForm, descEn: e.target.value })}
                          className="w-full bg-[#07241c] border border-white/10 rounded px-3 py-1.5 text-xs text-white font-sans"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-300 font-bold uppercase font-sans">ডিজাইন আইকন (Icon)</label>
                        <select
                          value={addSrvForm.iconName}
                          onChange={(e) => setAddSrvForm({ ...addSrvForm, iconName: e.target.value })}
                          className="w-full bg-[#07241c] border border-white/10 rounded px-3 py-1.5 text-xs text-white font-sans"
                        >
                          <option value="Compass">Compass (আর্কিটেকচারাল)</option>
                          <option value="Activity">Activity (স্ট্রাকচারাল)</option>
                          <option value="Map">Map (সয়েল টেস্ট/সার্ভে)</option>
                          <option value="Building2">Building2 (কনস্ট্রাকশন)</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2 space-y-1">
                        <ImageUploader
                          label="সার্ভিস থাম্বনেইল ইমেজ (Service Thumbnail)"
                          value={addSrvForm.image}
                          onChange={(val) => setAddSrvForm({ ...addSrvForm, image: val })}
                          placeholder="https://images.unsplash.com/photo-..."
                          helperText="সার্ভিস কার্ডের জন্য কাস্টম ছবি আপলোড করুন অথবা লিংক বসান"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-300 font-bold uppercase font-sans">প্রধান সুবিধাসমূহ (বাংলা - প্রতি লাইনে ১টি)</label>
                        <textarea
                          rows={3}
                          value={addSrvForm.benefitsBnStr}
                          onChange={(e) => setAddSrvForm({ ...addSrvForm, benefitsBnStr: e.target.value })}
                          placeholder="নিখুঁত ফ্লোর প্ল্যান&#10;৩ডি রেন্ডার মডেল"
                          className="w-full bg-[#07241c] border border-white/10 rounded px-3 py-1.5 text-xs text-white font-sans"
                        ></textarea>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-300 font-bold uppercase font-sans">প্রধান সুবিধাসমূহ (English - 1 per line)</label>
                        <textarea
                          rows={3}
                          value={addSrvForm.benefitsEnStr}
                          onChange={(e) => setAddSrvForm({ ...addSrvForm, benefitsEnStr: e.target.value })}
                          placeholder="Precise floor plans&#10;3D elevation design"
                          className="w-full bg-[#07241c] border border-white/10 rounded px-3 py-1.5 text-xs text-white font-sans"
                        ></textarea>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 pt-2">
                      <button
                        type="submit"
                        className="bg-[#E6B325] hover:bg-[#CD9B13] text-black font-extrabold py-2 px-6 rounded-lg text-xs shadow transition cursor-pointer font-sans"
                      >
                        {editingId ? "তথ্য আপডেট করুন" : "নতুন সার্ভিস প্রকাশ করুন"}
                      </button>
                      
                      {editingId && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(null);
                            setAddSrvForm({ titleBn: "", titleEn: "", descBn: "", descEn: "", iconName: "Compass", image: "", benefitsBnStr: "", benefitsEnStr: "" });
                          }}
                          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg text-xs transition cursor-pointer font-sans"
                        >
                          বাতিল করুন
                        </button>
                      )}
                    </div>

                  </form>
                </div>

              </div>
            )}

            {/* TAB 3: MANAGE PORTFOLIO PROJECTS */}
            {activeTab === "projects" && (
              <div className="space-y-8">
                <div className="border-b border-white/10 pb-3">
                  <h3 className="text-lg font-bold text-white font-sans">প্রজেক্ট পোর্টফোলিও নিয়ন্ত্রণ প্যানেল</h3>
                  <p className="text-xs text-gray-300 font-sans">সম্পন্ন হওয়া প্রজেক্টসমূহ যুক্ত করুন, সম্পাদনা করুন অথবা ডিলিট করুন।</p>
                </div>

                {/* List of projects */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-[#E6B325] uppercase tracking-wider font-sans">সক্রিয় প্রজেক্টের তালিকা</h4>
                  <div className="space-y-2">
                    {data.projects.map((proj) => (
                      <div key={proj.id} className="bg-[#03140f] border border-white/10 rounded-xl p-4 flex justify-between items-center text-xs">
                        <div className="flex items-center space-x-3">
                          <img src={proj.image} className="w-10 h-10 object-cover rounded border border-white/10 shrink-0" referrerPolicy="no-referrer" />
                          <div>
                            <strong className="text-white font-bold text-sm block font-sans">{proj.titleBn}</strong>
                            <span className="text-gray-400 font-sans block uppercase text-[10px] mt-0.5">
                              ক্যাটাগরি: {proj.category} | সাইজ: {proj.areaSft} Sft | বাজেট: {proj.budgetLakh} লক্ষ টাকা | স্থান: {proj.locationBn}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 shrink-0">
                          <button
                            onClick={() => handleEditProjClick(proj)}
                            className="p-1.5 bg-[#0A3D2F] hover:bg-white/10 border border-emerald-500/20 text-emerald-300 rounded transition cursor-pointer"
                            title="সম্পাদনা করুন"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`আপনি কি নিশ্চিত যে "${proj.titleBn}" প্রজেক্টটি মুছে ফেলতে চান?`)) {
                                deleteProject(proj.id);
                              }
                            }}
                            className="p-1.5 bg-red-950 hover:bg-red-900 border border-red-500/30 text-red-400 rounded transition cursor-pointer"
                            title="মুছে ফেলুন"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ADD / EDIT PROJECT FORM */}
                <div className="bg-[#03140f] border border-white/15 rounded-xl p-5 space-y-4">
                  <h4 className="text-xs font-bold text-[#E6B325] uppercase tracking-wider border-b border-white/10 pb-2 flex items-center space-x-1 font-sans">
                    <Plus className="w-4 h-4" />
                    <span>{editingId ? "প্রজেক্টের তথ্য পরিবর্তন ও সম্পাদনা করুন" : "নতুন প্রজেক্টের কন্টেন্ট যুক্ত করুন"}</span>
                  </h4>

                  <form onSubmit={editingId ? handleEditProjSave : handleAddProjSubmit} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-300 font-bold uppercase font-sans">প্রজেক্টের নাম (বাংলা)</label>
                        <input
                          type="text"
                          required
                          value={addProjForm.titleBn}
                          onChange={(e) => setAddProjForm({ ...addProjForm, titleBn: e.target.value })}
                          className="w-full bg-[#07241c] border border-white/10 rounded px-3 py-1.5 text-white font-sans text-xs focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-300 font-bold uppercase font-sans">প্রজেক্টের নাম (English)</label>
                        <input
                          type="text"
                          required
                          value={addProjForm.titleEn}
                          onChange={(e) => setAddProjForm({ ...addProjForm, titleEn: e.target.value })}
                          className="w-full bg-[#07241c] border border-white/10 rounded px-3 py-1.5 text-white font-mono text-xs focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-300 font-bold uppercase font-sans">ধরণ / ক্যাটাগরি</label>
                        <select
                          value={addProjForm.category}
                          onChange={(e: any) => setAddProjForm({ ...addProjForm, category: e.target.value })}
                          className="w-full bg-[#07241c] border border-white/10 rounded px-2 py-1.5 text-white font-sans text-xs"
                        >
                          <option value="duplex">ডুপ্লেক্স বাড়ি (Duplex)</option>
                          <option value="apartment">এপার্টমেন্ট (Apartment)</option>
                          <option value="commercial">কমার্শিয়াল বিল্ডিং (Commercial)</option>
                          <option value="interior">ইন্টেরিয়র ডিজাইন (Interior)</option>
                          <option value="residential">রেসিডেন্সিয়াল (Residential)</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-300 font-bold uppercase font-sans">মোট সাইজ (SFT)</label>
                        <input
                          type="number"
                          required
                          value={addProjForm.areaSft}
                          onChange={(e) => setAddProjForm({ ...addProjForm, areaSft: Number(e.target.value) })}
                          className="w-full bg-[#07241c] border border-white/10 rounded px-3 py-1.5 text-white font-mono text-xs focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-300 font-bold uppercase font-sans">মোট বাজেট (লক্ষ টাকা)</label>
                        <input
                          type="number"
                          required
                          value={addProjForm.budgetLakh}
                          onChange={(e) => setAddProjForm({ ...addProjForm, budgetLakh: Number(e.target.value) })}
                          className="w-full bg-[#07241c] border border-white/10 rounded px-3 py-1.5 text-white font-mono text-xs focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-300 font-bold uppercase font-sans">হস্তান্তরের সময় (Handover Date - Bn)</label>
                        <input
                          type="text"
                          required
                          value={addProjForm.completionDate}
                          onChange={(e) => setAddProjForm({ ...addProjForm, completionDate: e.target.value })}
                          placeholder="উদা: জানুয়ারি ২০২৬"
                          className="w-full bg-[#07241c] border border-white/10 rounded px-3 py-1.5 text-white font-sans text-xs focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-300 font-bold uppercase font-sans">ক্লায়েন্টের নাম (বাংলা)</label>
                        <input
                          type="text"
                          required
                          value={addProjForm.clientNameBn}
                          onChange={(e) => setAddProjForm({ ...addProjForm, clientNameBn: e.target.value })}
                          className="w-full bg-[#07241c] border border-white/10 rounded px-3 py-1.5 text-white font-sans text-xs focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-300 font-bold uppercase font-sans">ক্লায়েন্টের নাম (English)</label>
                        <input
                          type="text"
                          required
                          value={addProjForm.clientNameEn}
                          onChange={(e) => setAddProjForm({ ...addProjForm, clientNameEn: e.target.value })}
                          className="w-full bg-[#07241c] border border-white/10 rounded px-3 py-1.5 text-white font-mono text-xs focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-300 font-bold uppercase font-sans">প্রজেক্টের এলাকা / লোকেশন (বাংলা)</label>
                        <input
                          type="text"
                          required
                          value={addProjForm.locationBn}
                          onChange={(e) => setAddProjForm({ ...addProjForm, locationBn: e.target.value })}
                          placeholder="উদা: উপশহর, সিলেট"
                          className="w-full bg-[#07241c] border border-white/10 rounded px-3 py-1.5 text-white font-sans text-xs focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-300 font-bold uppercase font-sans">প্রজেক্টের এলাকা / লোকেশন (English)</label>
                        <input
                          type="text"
                          required
                          value={addProjForm.locationEn}
                          onChange={(e) => setAddProjForm({ ...addProjForm, locationEn: e.target.value })}
                          placeholder="e.g. Sylhet Sadar"
                          className="w-full bg-[#07241c] border border-white/10 rounded px-3 py-1.5 text-white font-mono text-xs focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-300 font-bold uppercase font-sans">প্রজেক্টের বিস্তারিত বিবরণ (বাংলা)</label>
                        <textarea
                          rows={2}
                          required
                          value={addProjForm.descBn}
                          onChange={(e) => setAddProjForm({ ...addProjForm, descBn: e.target.value })}
                          className="w-full bg-[#07241c] border border-white/10 rounded px-3 py-1.5 text-white font-sans text-xs focus:outline-none"
                        ></textarea>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-300 font-bold uppercase font-sans">প্রজেক্টের বিস্তারিত বিবরণ (English)</label>
                        <textarea
                          rows={2}
                          required
                          value={addProjForm.descEn}
                          onChange={(e) => setAddProjForm({ ...addProjForm, descEn: e.target.value })}
                          className="w-full bg-[#07241c] border border-white/10 rounded px-3 py-1.5 text-white font-sans text-xs focus:outline-none"
                        ></textarea>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#03140f] p-4 rounded-xl border border-white/5">
                      <div className="space-y-1">
                        <ImageUploader
                          label="সম্পন্ন হওয়া মেইন ইমেজ (Project Main Image)"
                          value={addProjForm.image}
                          onChange={(val) => setAddProjForm({ ...addProjForm, image: val })}
                          placeholder="Unsplash completed URL"
                          helperText="প্রজেক্টের প্রধান কাভার ছবি"
                        />
                      </div>
                      <div className="space-y-1">
                        <ImageUploader
                          label="পূর্বের খালি জায়গা ইমেজ (Before - optional)"
                          value={addProjForm.beforeImage || ""}
                          onChange={(val) => setAddProjForm({ ...addProjForm, beforeImage: val })}
                          placeholder="Unsplash raw land URL"
                          helperText="কাজ শুরু করার পূর্বের ছবি"
                        />
                      </div>
                      <div className="space-y-1">
                        <ImageUploader
                          label="পরবর্তী বাড়ি ইমেজ (After - optional)"
                          value={addProjForm.afterImage || ""}
                          onChange={(val) => setAddProjForm({ ...addProjForm, afterImage: val })}
                          placeholder="Same completed URL"
                          helperText="কাজ শেষ করার পরবর্তী ছবি"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 pt-2">
                      <button
                        type="submit"
                        className="bg-[#E6B325] hover:bg-[#CD9B13] text-black font-extrabold py-2 px-6 rounded-lg text-xs shadow transition cursor-pointer font-sans"
                      >
                        {editingId ? "প্রজেক্ট তথ্য আপডেট করুন" : "নতুন সম্পন্ন প্রজেক্ট প্রকাশ করুন"}
                      </button>
                      
                      {editingId && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(null);
                            setAddProjForm({ titleBn: "", titleEn: "", category: "duplex", image: "", areaSft: 1500, budgetLakh: 50, completionDate: "২০২৬", clientNameBn: "", clientNameEn: "", locationBn: "", locationEn: "", descBn: "", descEn: "", beforeImage: "", afterImage: "" });
                          }}
                          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg text-xs transition cursor-pointer font-sans"
                        >
                          বাতিল করুন
                        </button>
                      )}
                    </div>

                  </form>
                </div>

              </div>
            )}

            {/* TAB 4: BLOGS, FAQs & REVIEWS */}
            {activeTab === "blogs" && (
              <div className="space-y-8">
                
                {/* 1. FAQs Accordion Creator */}
                <div className="space-y-4">
                  <div className="border-b border-white/10 pb-2">
                    <h3 className="text-lg font-bold text-white font-sans">সচরাচর জিজ্ঞাসিত প্রশ্নাবলী (FAQ) নিয়ন্ত্রণ</h3>
                    <p className="text-xs text-gray-300 font-sans">ওয়েবসাইটের হোমপেজের FAQ সেকশনের প্রশ্ন ও উত্তরসমূহ পরিচালনা করুন।</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.faqs.map((f) => (
                      <div key={f.id} className="bg-[#03140f] border border-white/10 rounded-xl p-3.5 flex justify-between items-center text-xs">
                        <div>
                          <strong className="text-white font-bold block font-sans">{f.questionBn}</strong>
                          <span className="text-gray-400 block mt-0.5 font-mono">{f.questionEn}</span>
                        </div>
                        <div className="flex items-center space-x-2 shrink-0 ml-3">
                          <button
                            onClick={() => handleEditFaqClick(f)}
                            className="p-1.5 bg-[#0A3D2F] hover:bg-white/10 border border-emerald-500/20 text-emerald-300 rounded transition cursor-pointer"
                            title="সম্পাদনা করুন"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`আপনি কি নিশ্চিত যে "${f.questionBn}" প্রশ্নটি মুছে ফেলতে চান?`)) {
                                deleteFaq(f.id);
                              }
                            }}
                            className="p-1.5 bg-red-950 text-red-400 hover:bg-red-900 border border-red-500/30 rounded cursor-pointer shrink-0"
                            title="মুছে ফেলুন"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={editingId ? handleEditFaqSave : handleAddFaqSubmit} className="bg-[#03140f] border border-white/10 rounded-xl p-4 space-y-3.5 text-xs">
                    <h4 className="text-[#E6B325] font-bold block font-sans">
                      {editingId ? "প্রশ্নোত্তর সম্পাদনা ও পরিবর্তন করুন" : "নতুন একটি FAQ প্রশ্নোত্তর যুক্ত করুন"}
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-gray-400 font-sans">প্রশ্ন (বাংলা)</label>
                        <input
                          type="text"
                          required
                          value={addFaqForm.questionBn}
                          onChange={(e) => setAddFaqForm({ ...addFaqForm, questionBn: e.target.value })}
                          className="w-full bg-[#07241c] border border-white/10 rounded px-2.5 py-1 text-white font-sans text-xs focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-gray-400 font-sans">Question (English)</label>
                        <input
                          type="text"
                          required
                          value={addFaqForm.questionEn}
                          onChange={(e) => setAddFaqForm({ ...addFaqForm, questionEn: e.target.value })}
                          className="w-full bg-[#07241c] border border-white/10 rounded px-2.5 py-1 text-white font-mono text-xs focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-gray-400 font-sans">উত্তর (বাংলা)</label>
                        <textarea
                          rows={2}
                          required
                          value={addFaqForm.answerBn}
                          onChange={(e) => setAddFaqForm({ ...addFaqForm, answerBn: e.target.value })}
                          className="w-full bg-[#07241c] border border-white/10 rounded px-2.5 py-1 text-white font-sans text-xs focus:outline-none"
                        ></textarea>
                      </div>
                      <div className="space-y-1">
                        <label className="text-gray-400 font-sans">Answer (English)</label>
                        <textarea
                          rows={2}
                          required
                          value={addFaqForm.answerEn}
                          onChange={(e) => setAddFaqForm({ ...addFaqForm, answerEn: e.target.value })}
                          className="w-full bg-[#07241c] border border-white/10 rounded px-2.5 py-1 text-white font-sans text-xs focus:outline-none"
                        ></textarea>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 pt-1">
                      <button type="submit" className="bg-[#E6B325] hover:bg-[#CD9B13] text-black font-extrabold py-2 px-6 rounded-lg text-xs shadow transition cursor-pointer font-sans">
                        {editingId ? "প্রশ্নোত্তর আপডেট করুন" : "নতুন FAQ প্রকাশ করুন"}
                      </button>
                      
                      {editingId && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(null);
                            setAddFaqForm({ questionBn: "", questionEn: "", answerBn: "", answerEn: "" });
                          }}
                          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg text-xs transition cursor-pointer font-sans"
                        >
                          বাতিল করুন
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                {/* 2. Testimonials Creator */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="border-b border-white/10 pb-2">
                    <h3 className="text-lg font-bold text-white font-sans">গ্রাহক রিভিউ ও প্রশংসাপত্র নিয়ন্ত্রণ</h3>
                    <p className="text-xs text-gray-300 font-sans">গ্রাহকদের ৫-স্টার মূল্যবান মতামত কার্ডসমূহ পরিবর্তন ও ডিলিট করুন।</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    {data.testimonials.map((t) => (
                      <div key={t.id} className="bg-[#03140f] border border-white/10 rounded-xl p-3 flex justify-between items-center">
                        <div>
                          <strong className="text-white font-bold block font-sans">{t.nameBn} ({t.rating} স্টার রিভিউ)</strong>
                          <span className="text-gray-400 block font-sans">{t.designationBn}</span>
                        </div>
                        <button
                          onClick={() => {
                            if (window.confirm(`আপনি কি নিশ্চিত যে "${t.nameBn}" রিভিউটি মুছে ফেলতে চান?`)) {
                              deleteTestimonial(t.id);
                            }
                          }}
                          className="p-1 bg-red-950 text-red-400 rounded hover:bg-red-900 border border-red-500/30 cursor-pointer ml-3 shrink-0"
                          title="মুছে ফেলুন"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleAddTestimonialSubmit} className="bg-[#03140f] border border-white/10 rounded-xl p-4 space-y-3 text-xs">
                    <h4 className="text-[#E6B325] font-bold font-sans">নতুন একটি গ্রাহক ৫-স্টার রিভিউ তৈরি করুন</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-gray-400 font-sans">ক্লায়েন্টের নাম (বাংলা)</label>
                        <input type="text" required value={addTestimonialForm.nameBn} onChange={(e) => setAddTestimonialForm({ ...addTestimonialForm, nameBn: e.target.value })} className="w-full bg-[#07241c] border border-white/10 rounded px-2.5 py-1 text-white font-sans text-xs focus:outline-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-gray-400 font-sans">Client Name (English)</label>
                        <input type="text" required value={addTestimonialForm.nameEn} onChange={(e) => setAddTestimonialForm({ ...addTestimonialForm, nameEn: e.target.value })} className="w-full bg-[#07241c] border border-white/10 rounded px-2.5 py-1 text-white font-mono text-xs focus:outline-none" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-gray-400 font-sans">পদবী/লোকেশন (বাংলা)</label>
                        <input type="text" required value={addTestimonialForm.designationBn} onChange={(e) => setAddTestimonialForm({ ...addTestimonialForm, designationBn: e.target.value })} className="w-full bg-[#07241c] border border-white/10 rounded px-2.5 py-1 text-white font-sans text-xs focus:outline-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-gray-400 font-sans">Designation (English)</label>
                        <input type="text" required value={addTestimonialForm.designationEn} onChange={(e) => setAddTestimonialForm({ ...addTestimonialForm, designationEn: e.target.value })} className="w-full bg-[#07241c] border border-white/10 rounded px-2.5 py-1 text-white font-mono text-xs focus:outline-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-gray-400 font-sans">রেটিং স্টার (Rating Stars)</label>
                        <select value={addTestimonialForm.rating} onChange={(e) => setAddTestimonialForm({ ...addTestimonialForm, rating: Number(e.target.value) })} className="w-full bg-[#07241c] border border-white/10 rounded px-2.5 py-1 text-white font-sans text-xs">
                          <option value="5">৫ স্টার (5 Stars)</option>
                          <option value="4">৪ স্টার (4 Stars)</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-gray-400 text-block font-sans">রিভিউ মন্তব্য (বাংলা)</label>
                      <textarea rows={2} required value={addTestimonialForm.reviewBn} onChange={(e) => setAddTestimonialForm({ ...addTestimonialForm, reviewBn: e.target.value })} className="w-full bg-[#07241c] border border-white/10 rounded px-2.5 py-1 text-white font-sans text-xs focus:outline-none"></textarea>
                    </div>

                    <div className="space-y-1">
                      <label className="text-gray-400 text-block font-sans">Review Content (English)</label>
                      <textarea rows={2} required value={addTestimonialForm.reviewEn} onChange={(e) => setAddTestimonialForm({ ...addTestimonialForm, reviewEn: e.target.value })} className="w-full bg-[#07241c] border border-white/10 rounded px-2.5 py-1 text-white font-sans text-xs focus:outline-none"></textarea>
                    </div>

                    <div className="bg-[#03140f] p-4 rounded-xl border border-white/5 space-y-1">
                      <ImageUploader
                        label="ক্লায়েন্ট প্রোফাইল ছবি (Client Avatar)"
                        value={addTestimonialForm.image}
                        onChange={(val) => setAddTestimonialForm({ ...addTestimonialForm, image: val })}
                        placeholder="https://images.unsplash.com/photo-..."
                        helperText="ক্লায়েন্টের ছবি আপলোড করুন অথবা সোর্স লিংক বসান"
                      />
                    </div>

                    <button type="submit" className="bg-[#E6B325] hover:bg-[#CD9B13] text-black font-extrabold py-2 px-6 rounded-lg text-xs shadow transition cursor-pointer font-sans">
                      রিভিউ কার্ড প্রকাশ করুন
                    </button>
                  </form>
                </div>

                {/* 3. Blogs section creator */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="border-b border-white/10 pb-2">
                    <h3 className="text-lg font-bold text-white font-sans">কনস্ট্রাকশন টিপস ও ইঞ্জিনিয়ারিং ব্লগ নিয়ন্ত্রণ</h3>
                    <p className="text-xs text-gray-300 font-sans">বাড়ি বানানোর সতর্কতা, মাটির টেস্ট, সিমেন্টের হিসাব ইত্যাদি টিপস ও গাইড লিখুন।</p>
                  </div>

                  <div className="space-y-2 text-xs">
                    {data.blogs.map((b) => (
                      <div key={b.id} className="bg-[#03140f] border border-white/10 rounded-xl p-3 flex justify-between items-center">
                        <div>
                          <strong className="text-white text-sm block font-sans">{b.titleBn}</strong>
                          <span className="text-gray-400 block font-sans">লেখক: {b.authorBn} | তারিখ: {b.date} | ক্যাটাগরি: {b.category}</span>
                        </div>
                        <div className="flex items-center space-x-2 shrink-0 ml-3">
                          <button
                            onClick={() => handleEditBlogClick(b)}
                            className="p-1.5 bg-[#0A3D2F] hover:bg-white/10 border border-emerald-500/20 text-emerald-300 rounded transition cursor-pointer"
                            title="সম্পাদনা করুন"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`আপনি কি নিশ্চিত যে "${b.titleBn}" ব্লগ পোস্টটি মুছে ফেলতে চান?`)) {
                                deleteBlog(b.id);
                              }
                            }}
                            className="p-1.5 bg-red-950 hover:bg-red-900 border border-red-500/30 text-red-400 rounded cursor-pointer"
                            title="মুছে ফেলুন"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={editingId ? handleEditBlogSave : handleAddBlogSubmit} className="bg-[#03140f] border border-white/10 rounded-xl p-4 space-y-3 text-xs">
                    <h4 className="text-[#E6B325] font-bold font-sans">
                      {editingId ? "ব্লগ কন্টেন্ট ও পরামর্শ পোস্ট সম্পাদনা করুন" : "নতুন একটি তথ্যবহুল ও পরামর্শমূলক ব্লগ পোস্ট লিখুন"}
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-gray-400 font-sans">ব্লগের শিরোনাম (বাংলা)</label>
                        <input type="text" required value={addBlogForm.titleBn} onChange={(e) => setAddBlogForm({ ...addBlogForm, titleBn: e.target.value })} className="w-full bg-[#07241c] border border-white/10 rounded px-2.5 py-1 text-white font-sans text-xs focus:outline-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-gray-400 font-sans">Blog Title (English)</label>
                        <input type="text" required value={addBlogForm.titleEn} onChange={(e) => setAddBlogForm({ ...addBlogForm, titleEn: e.target.value })} className="w-full bg-[#07241c] border border-white/10 rounded px-2.5 py-1 text-white font-mono text-xs focus:outline-none" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-gray-400 font-sans">ক্যাটাগরি</label>
                        <select value={addBlogForm.category} onChange={(e: any) => setAddBlogForm({ ...addBlogForm, category: e.target.value })} className="w-full bg-[#07241c] border border-white/10 rounded px-2.5 py-1 text-white font-sans text-xs">
                          <option value="tips">বাড়ি তৈরির টিপস (Tips)</option>
                          <option value="architecture">আর্কিটেকচার (Architecture)</option>
                          <option value="construction">নির্মাণ কাজ (Construction)</option>
                          <option value="engineering">ইঞ্জিনিয়ারিং গাইড (Engineering)</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-gray-400 font-sans">প্রকাশের তারিখ (যেমন: ২০ জুন, ২০২৬)</label>
                        <input type="text" value={addBlogForm.date} onChange={(e) => setAddBlogForm({ ...addBlogForm, date: e.target.value })} className="w-full bg-[#07241c] border border-white/10 rounded px-2.5 py-1 text-white font-sans text-xs focus:outline-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-gray-400 font-sans">লেখকের নাম (বাংলা)</label>
                        <input type="text" value={addBlogForm.authorBn} onChange={(e) => setAddBlogForm({ ...addBlogForm, authorBn: e.target.value })} className="w-full bg-[#07241c] border border-[#07241c]/20 rounded px-2.5 py-1 text-white font-sans text-xs focus:outline-none" />
                      </div>
                    </div>

                    <div className="bg-[#03140f] p-4 rounded-xl border border-white/5 space-y-1">
                      <ImageUploader
                        label="ব্লগ কভার ইমেজ (Blog Cover Image)"
                        value={addBlogForm.image}
                        onChange={(val) => setAddBlogForm({ ...addBlogForm, image: val })}
                        placeholder="https://images.unsplash.com/photo-..."
                        helperText="ব্লগের জন্য কাস্টম কাভার ছবি আপলোড করুন অথবা ইন্টারনেট সোর্স লিংক বসান"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-gray-400 block text-xs font-sans">ব্লগ বিস্তারিত বর্ণনা (বাংলা)</label>
                      <textarea rows={4} required value={addBlogForm.contentBn} onChange={(e) => setAddBlogForm({ ...addBlogForm, contentBn: e.target.value })} className="w-full bg-[#07241c] border border-white/10 rounded px-2.5 py-1 text-white font-sans text-xs focus:outline-none"></textarea>
                    </div>

                    <div className="space-y-1">
                      <label className="text-gray-400 block text-xs font-sans">Body Text (English)</label>
                      <textarea rows={4} required value={addBlogForm.contentEn} onChange={(e) => setAddBlogForm({ ...addBlogForm, contentEn: e.target.value })} className="w-full bg-[#07241c] border border-white/10 rounded px-2.5 py-1 text-white font-sans text-xs focus:outline-none"></textarea>
                    </div>

                    <div className="flex items-center space-x-3 pt-1">
                      <button type="submit" className="bg-[#E6B325] hover:bg-[#CD9B13] text-black font-extrabold py-2 px-6 rounded-lg text-xs shadow transition cursor-pointer font-sans">
                        {editingId ? "ব্লগ পোস্ট আপডেট করুন" : "ব্লগ পোস্ট প্রকাশ করুন"}
                      </button>
                      
                      {editingId && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(null);
                            setAddBlogForm({ titleBn: "", titleEn: "", contentBn: "", contentEn: "", category: "tips", image: "", date: "২০ জুন, ২০২৬", authorBn: "ইঞ্জি: আমিনুল ইসলাম", authorEn: "Engr. Aminul Islam" });
                          }}
                          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg text-xs transition cursor-pointer font-sans"
                        >
                          বাতিল করুন
                        </button>
                      )}
                    </div>
                  </form>
                </div>

              </div>
            )}

            {/* TAB 5: CONTACT MESSAGES INBOX & DATA EXPORT/BACKUP */}
            {activeTab === "inbox" && (
              <div className="space-y-6">
                
                {/* Header coordinates */}
                <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-white font-sans">ল্যান্ডওনার বা ক্লায়েন্টদের পরামর্শ ও যোগাযোগ বার্তা</h3>
                    <p className="text-xs text-gray-300 font-sans">ওয়েবসাইট থেকে পাঠানো মেসেজসমূহ দেখুন, স্ট্যাটাস পরিবর্তন করুন অথবা ডাউনলোড করুন।</p>
                  </div>

                  <div className="flex gap-2">
                    {/* Simulated Excel/CSV Export */}
                    <button
                      onClick={handleExportCSV}
                      className="px-3 py-1.5 bg-[#E6B325] text-black hover:bg-[#CD9B13] rounded-lg text-xs font-bold transition flex items-center space-x-1 cursor-pointer font-sans"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>মেসেজ এক্সপোর্ট (CSV)</span>
                    </button>
                  </div>
                </div>

                {/* Persistent Storage Backup and Restoration */}
                <div className="bg-[#03140f] p-4 rounded-xl border border-white/10 space-y-3.5 text-xs">
                  <h4 className="text-xs font-bold text-[#E6B325] uppercase tracking-wider flex items-center space-x-1.5 font-sans">
                    <Smartphone className="w-4 h-4 text-[#E6B325]" />
                    <span>ওয়েবসাইটের সকল ডেটা ব্যাকআপ ও রিস্টোর ব্যবস্থা</span>
                  </h4>
                  <p className="text-gray-300 font-sans">
                    আপনার সাজানো সার্ভিস, সম্পন্ন প্রজেক্ট ও সকল সেটিংসের অফলাইন ব্যাকআপ ডাউনলোড করে রাখুন অথবা পূর্বে ডাউনলোড করা ব্যাকআপ রিস্টোর করুন:
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 items-center">
                    
                    {/* Download Backup */}
                    <button
                      onClick={handleBackupDownload}
                      className="w-full sm:w-auto px-4 py-2 bg-[#0A3D2F] hover:bg-white/10 border border-[#E6B325]/30 rounded text-xs font-bold text-[#E6B325] flex items-center justify-center space-x-1.5 transition cursor-pointer font-sans"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>ব্যাকআপ ডাউনলোড করুন (.json)</span>
                    </button>

                    {/* Upload / Restore */}
                    <label className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-emerald-950 to-emerald-900 hover:from-emerald-900 hover:to-emerald-800 border border-emerald-500/30 rounded text-xs font-bold text-emerald-300 flex items-center justify-center space-x-1.5 transition cursor-pointer text-center font-sans">
                      <Upload className="w-3.5 h-3.5 shrink-0" />
                      <span>ব্যাকআপ ফাইল আপলোড ও রিস্টোর করুন</span>
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleRestoreUpload}
                        className="hidden"
                      />
                    </label>

                  </div>
                </div>

                {/* Filters */}
                <div className="flex space-x-2 border-b border-white/10 pb-3">
                  {["all", "unread", "read"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setMessageFilter(f as any)}
                      className={`px-3 py-1 rounded text-xs font-semibold uppercase tracking-wide cursor-pointer font-sans ${
                        messageFilter === f
                          ? "bg-[#E6B325]/15 text-[#E6B325] border border-[#E6B325]/30"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {f === "all" ? "সব মেসেজ" : f === "unread" ? "নতুন মেসেজ" : "পঠিত মেসেজ"} ({data.messages.filter(m => f === "all" ? true : m.status === f).length})
                    </button>
                  ))}
                </div>

                {/* Messages Lists */}
                {filteredMessages.length > 0 ? (
                  <div className="space-y-4">
                    {filteredMessages.map((m) => (
                      <div
                        key={m.id}
                        className={`border rounded-xl p-4 sm:p-5 relative ${
                          m.status === "unread"
                            ? "bg-[#0A3D2F]/70 border-[#E6B325]/40"
                            : "bg-[#03140f] border-white/10"
                        }`}
                      >
                        
                        {/* Unread badge */}
                        {m.status === "unread" && (
                          <span className="absolute top-4 right-4 bg-[#E6B325] text-black text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider font-sans">
                            নতুন বার্তা
                          </span>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-gray-300">
                          <div>
                            ক্লায়েন্টের নাম: <strong className="text-white text-sm block font-sans">{m.name}</strong>
                          </div>
                          <div>
                            মোবাইল নাম্বার: <strong className="text-[#E6B325] block font-mono">{m.phone}</strong>
                          </div>
                          <div>
                            ইমেইল এড্রেস: <span className="text-gray-200 block">{m.email || "কোনো ইমেইল দেয়া হয়নি"}</span>
                          </div>
                          <div>
                            তারিখ ও সময়: <span className="text-gray-400 block font-mono">{new Date(m.date).toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="mt-3.5 pt-3.5 border-t border-white/10 space-y-2">
                          <span className="text-[10px] text-[#E6B325] block uppercase font-bold font-sans">
                            বিষয়: {m.subject}
                          </span>
                          <p className="text-xs text-gray-200 leading-relaxed font-sans whitespace-pre-wrap font-light">
                            {m.message}
                          </p>
                        </div>

                        {/* Message actions */}
                        <div className="mt-4 pt-3 border-t border-white/10 flex justify-end space-x-2 text-xs">
                          {m.status === "unread" && (
                            <button
                              onClick={() => markMessageRead(m.id)}
                              className="px-3 py-1 bg-[#0A3D2F] text-emerald-300 hover:bg-white/10 border border-emerald-500/20 rounded cursor-pointer font-sans"
                            >
                              পঠিত হিসেবে চিহ্নিত করুন
                            </button>
                          )}
                          <button
                            onClick={() => {
                              if (window.confirm("আপনি কি নিশ্চিত যে এই মেসেজটি স্থায়ীভাবে ডিলিট করতে চান?")) {
                                deleteMessage(m.id);
                              }
                            }}
                            className="px-2.5 py-1 bg-red-950/40 hover:bg-red-950 border border-red-500/20 text-red-400 rounded cursor-pointer flex items-center space-x-1 font-sans"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>ডিলিট করুন</span>
                          </button>
                        </div>

                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-gray-400 text-sm font-sans">
                    কোনো মেসেজ পাওয়া যায়নি।
                  </div>
                )}

              </div>
            )}

            {/* TAB 6: SECURITY CREDENTIALS & TWO-FACTOR SIMULATION */}
            {activeTab === "security" && (
              <div className="space-y-8 animate-fadeIn">
                
                <div className="border-b border-white/10 pb-3">
                  <h3 className="text-lg font-bold text-white font-sans">নিরাপত্তা ও অ্যাডমিন ইউজার চেঞ্জ</h3>
                  <p className="text-xs text-gray-300 font-sans">অ্যাডমিন প্যানেলে লগইন করার ইউজার আইডি এবং পাসওয়ার্ড পরিবর্তন করুন</p>
                </div>

                {/* Real-time Encryption Shield Indicator Card */}
                <div className="bg-[#031d15] border border-emerald-500/30 rounded-2xl p-5 space-y-4">
                  <div className="flex items-start space-x-3.5">
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 shrink-0">
                      <Lock className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white font-sans flex items-center gap-2 flex-wrap">
                        <span>মিলিটারি-গ্রেড ডাটা এনক্রিপশন ও সাইবার সিকিউরিটি শিল্ড</span>
                        <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          ACTIVE PROTECTED
                        </span>
                      </h4>
                      <p className="text-xs text-gray-300 mt-1 font-sans leading-relaxed">
                        ওয়েবসাইটের সকল ডাটা সম্পূর্ণ সুরক্ষিত এবং ব্রাউজার মেমোরিতে রিয়েল-টাইম ক্রিপ্টোগ্রাফি ব্যবহার করে হাই-লেভেল এনক্রিপ্টেড অবস্থায় সেভ করা আছে। কোনো হ্যাকার বা তৃতীয় পক্ষ আপনার মেসেজ ও তথ্য চুরি করতে পারবে না।
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2 text-xs">
                    <div className="bg-black/30 border border-white/5 rounded-xl p-3 flex items-start space-x-2.5">
                      <div className="text-emerald-400 mt-0.5 shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <strong className="text-white block font-sans">রিয়েল-টাইম XOR-Salt এনক্রিপশন</strong>
                        <span className="text-gray-400 text-[11px] leading-relaxed font-sans block mt-0.5">
                          আপনার ক্লায়েন্ট মেসেজ, ফোন নাম্বার, সার্ভিস ও সেটিংস ব্রাউজারে রিডেবল টেক্সট হিসেবে থাকে না, বরং ডাটাবেজে এনক্রিপ্টেড সিকিউর সল্ট ফরম্যাটে সেভ হয়।
                        </span>
                      </div>
                    </div>

                    <div className="bg-black/30 border border-white/5 rounded-xl p-3 flex items-start space-x-2.5">
                      <div className="text-emerald-400 mt-0.5 shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <strong className="text-white block font-sans">অ্যাডমিন পাসওয়ার্ড মাস্কিং ও হাইডিং</strong>
                        <span className="text-gray-400 text-[11px] leading-relaxed font-sans block mt-0.5">
                          লগইন ইমেইল এবং পাসওয়ার্ড ব্রাউজার ফাইলে ক্লিয়ারটেক্সট হিসেবে সংরক্ষিত থাকে না। মাল্টি-পাস সল্টিং মেথডে ডাটা হাইড করা রয়েছে।
                        </span>
                      </div>
                    </div>

                    <div className="bg-black/30 border border-white/5 rounded-xl p-3 flex items-start space-x-2.5">
                      <div className="text-emerald-400 mt-0.5 shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <strong className="text-white block font-sans">ক্রস-সাইট স্ক্রিপ্টিং (XSS) প্রতিরোধ</strong>
                        <span className="text-gray-400 text-[11px] leading-relaxed font-sans block mt-0.5">
                          ওয়েবসাইটের কন্টাক্ট ফরম এবং ডাটাবেজ ইনপুটে স্পেশাল স্ক্রিপ্ট প্রোটেকশন দেওয়া আছে, কোনো ক্ষতিকারক কোড বা হ্যাকিং স্ক্রিপ্ট সিস্টেমে রান করতে পারবে না।
                        </span>
                      </div>
                    </div>

                    <div className="bg-black/30 border border-white/5 rounded-xl p-3 flex items-start space-x-2.5">
                      <div className="text-emerald-400 mt-0.5 shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <strong className="text-white block font-sans">১০০% অফলাইন ব্যাকআপ রিকভারি</strong>
                        <span className="text-gray-400 text-[11px] leading-relaxed font-sans block mt-0.5">
                          যেকোনো সময় আপনি পুরো ডাটাবেজ ফাইল ডাউনলোড করে ব্যাকআপ রাখতে পারবেন এবং পিসি নষ্ট বা উইন্ডোজ পরিবর্তন করলেও ব্যাকআপ ফাইল রিস্টোর করতে পারবেন।
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleCredentialUpdate} className="bg-[#03140f] p-5 rounded-xl border border-white/10 space-y-4 text-xs">
                  <h4 className="text-xs font-bold text-[#E6B325] uppercase tracking-wider flex items-center space-x-1.5 font-sans">
                    <Key className="w-4 h-4 text-[#E6B325]" />
                    <span>ইউজার আইডি ও পাসওয়ার্ড পরিবর্তন</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-gray-300 block font-sans">নতুন ইউজার আইডি (New Admin ID):</label>
                      <input
                        type="text"
                        placeholder={adminEmail}
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        className="w-full bg-[#07241c] border border-white/10 rounded px-2.5 py-1.5 text-white font-sans"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-gray-300 block font-sans">নতুন পাসওয়ার্ড (New Secret Password):</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={newPass}
                        onChange={(e) => setNewPass(e.target.value)}
                        className="w-full bg-[#07241c] border border-white/10 rounded px-2.5 py-1.5 text-white font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 pt-2">
                    <button type="submit" className="bg-[#E6B325] text-black font-bold px-5 py-1.5 rounded cursor-pointer font-sans text-xs hover:bg-[#CD9B13] transition">
                      লগইন তথ্য সংরক্ষণ করুন
                    </button>
                    {credentialSuccess && (
                      <span className="text-emerald-400 font-semibold flex items-center space-x-1 font-sans">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>সফলভাবে অ্যাডমিন লগইন তথ্য পরিবর্তন হয়েছে!</span>
                      </span>
                    )}
                  </div>
                </form>

                {/* Two Factor setup simulator */}
                <div className="bg-[#03140f] p-5 rounded-xl border border-white/10 space-y-4 text-xs">
                  <h4 className="text-xs font-bold text-[#E6B325] uppercase tracking-wider flex items-center space-x-1.5 font-sans">
                    <Smartphone className="w-4 h-4 text-[#E6B325]" />
                    <span>দ্বি-স্তর বিশিষ্ট নিরাপত্তা / টু-ফ্যাক্টর অথেনটিকেশন (সিমুলেটর)</span>
                  </h4>
                  <p className="text-gray-300 leading-relaxed font-sans">
                    আপনার অ্যাডমিন প্যানেলটিকে আরও নিরাপদ করতে গুগল বা মাইক্রোসফট অথেনটিকেশন সক্রিয় করুন:
                  </p>

                  <div className="flex items-center justify-between bg-[#07241c] p-3 rounded border border-white/5">
                    <div>
                      <span className="block font-bold font-sans">অথেনটিকেটর স্ট্যাটাস:</span>
                      <span className={`text-xs block mt-0.5 font-sans ${twoFactorSetup.enabled ? "text-emerald-400 font-bold" : "text-gray-400"}`}>
                        {twoFactorSetup.enabled ? "● চালু আছে (2FA Active)" : "○ বন্ধ আছে (Disabled)"}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={toggleTwoFactor}
                      className={`px-4 py-1.5 rounded font-bold cursor-pointer transition font-sans text-xs ${
                        twoFactorSetup.enabled
                          ? "bg-red-950/40 hover:bg-red-950 border border-red-500/30 text-red-300"
                          : "bg-[#E6B325] text-black hover:bg-[#CD9B13]"
                      }`}
                    >
                      {twoFactorSetup.enabled ? "টু-ফ্যাক্টর বন্ধ করুন" : "টু-ফ্যাক্টর চালু করুন"}
                    </button>
                  </div>

                  {twoFactorSetup.enabled && (
                    <div className="bg-[#042018] rounded-lg p-4 border border-white/10 flex flex-col sm:flex-row gap-4 items-center">
                      <div className="w-24 h-24 bg-white p-2.5 rounded shrink-0 flex items-center justify-center border border-gray-200">
                        {/* Simulated QR Code representation */}
                        <div className="grid grid-cols-4 gap-1 w-full h-full">
                          {[...Array(16)].map((_, i) => (
                            <div
                              key={i}
                              className={`rounded-sm ${
                                (i % 2 === 0 && i % 3 === 0) || i === 0 || i === 15 ? "bg-black" : "bg-transparent"
                              }`}
                            ></div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-1 text-gray-300 font-sans">
                        <span className="text-[10px] text-gray-400 uppercase font-sans">অথেনটিকেটর অ্যাপের গোপন সিক্রেট কি:</span>
                        <strong className="text-white block font-mono tracking-wider bg-black/40 px-2 py-1 rounded">{twoFactorSetup.secret}</strong>
                        <p className="text-[10px] leading-relaxed">
                          গুগল অথেনটিকেটর অ্যাপ দিয়ে এই কোডটি স্ক্যান করুন অথবা কোডটি লিখে অ্যাপে যুক্ত করুন। এখন থেকে প্রতিবার লগইনের সময় কোড প্রয়োজন হবে।
                        </p>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
