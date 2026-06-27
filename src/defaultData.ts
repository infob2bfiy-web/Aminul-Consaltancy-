import { AppData } from "./types";

export const initialAppData: AppData = {
  settings: {
    name: "Aminul Consultancy & Engineers",
    tagline: "আপনার স্বপ্নের প্রজেক্ট আমাদের দক্ষ হাতে",
    logoUrl: "", // SVG logo handled in layout
    faviconUrl: "",
    primaryColor: "#0D5C46", // Deep Emerald Green
    secondaryColor: "#E6B325", // Gold Accent
    phone: "01711-223344",
    whatsapp: "+8801711223344",
    messenger: "https://m.me/aminulconsultancy",
    email: "info@aminulengineers.com",
    address: "লেভেল ৪, অরণ্য টাওয়ার, বারিধারা ব্লক-জে, রোড-১১, ঢাকা-১২১২",
    workingHours: "শনিবার - বৃহস্পতিবার: সকাল ৯টা - সন্ধ্যা ৭টা",
    googleMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.042379373979!2d90.422501!3d23.801121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c79234857d9f%3A0x6b44ec4efdf19a8a!2sBaridhara%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1624647312984!5m2!1sen!2sbd",
    facebookUrl: "https://facebook.com",
    linkedinUrl: "https://linkedin.com",
    youtubeUrl: "https://youtube.com",
    newsletterCount: 148,
  },
  stats: {
    projectsBn: "৫০+",
    projectsEn: "50+",
    clientsBn: "১০০+",
    clientsEn: "100+",
    engineersBn: "১৫+",
    engineersEn: "15+",
    experienceBn: "৮+",
    experienceEn: "8+",
  },
  services: [
    {
      id: "srv_arch",
      titleBn: "Architectural Design (আর্কিটেকচারাল ডিজাইন)",
      titleEn: "Architectural Design & Planning",
      descBn: "আধুনিক ও নান্দনিক নকশার সাথে রাজউক বা স্থানীয় নিয়মনীতি মেনে নিখুঁত ড্রয়িং।",
      descEn: "Get scientifically engineered, aesthetically pleasing architectural designs in full compliance with local authorities (RAJUK/CDA).",
      iconName: "Compass",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
      category: "drawing_design",
      badgeBn: "প্ল্যানিং ও ড্রয়িং ডিজাইন",
      badgeEn: "Planning & Drawing",
      benefitsBn: [
        "আধুনিক ও নান্দনিক ফ্রন্ট এলিভেশন ডিজাইন",
        "দক্ষ ফ্লোর প্ল্যান ও ফার্নিচার লেআউট প্ল্যানিং",
        "প্রাকৃতিক আলো ও বাতাস চলাচলের সর্বোচ্চ ব্যবহার",
        "রাজউক (RAJUK) এবং স্থানীয় কর্পোরেট নিয়ম মেনে নিখুঁত ড্রয়িং প্রস্তুতকরণ"
      ],
      benefitsEn: [
        "Modern & aesthetic front elevation designs",
        "Efficient floor plan and furniture layout planning",
        "Optimized flow of natural light & fresh air",
        "RAJUK & local municipal rule-compliant drafting"
      ]
    },
    {
      id: "srv_structural",
      titleBn: "Structural Design (স্ট্রাকচারাল ডিজাইন)",
      titleEn: "Structural Design & Engineering",
      descBn: "BNBC ও ACI কোড মেনে ভূমিকম্প ও ঝড় সহনশীল টেকসই কাঠামোগত ডিজাইন।",
      descEn: "Earthquake and wind-resistant structural layouts fully conforming to the latest BNBC standards.",
      iconName: "Activity",
      image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=800&q=80",
      category: "drawing_design",
      badgeBn: "স্ট্রাকচারাল ও নিরাপদ ডিজাইন",
      badgeEn: "Structural Safety",
      benefitsBn: [
        "BNBC কোড মেনে সর্বোচ্চ মাত্রার ভূমিকম্প ও ঝড় প্রতিরোধক ডিজাইন",
        "ETABS এবং SAFE সফটওয়্যার দ্বারা নিখুঁত স্ট্রাকচারাল অ্যানালাইসিস",
        "নিখুঁত রড বিন্যাস ও কংক্রিট মিশ্রণের স্পেসিফিকেশন",
        "কম খরচে ভবনের সর্বোচ্চ স্থায়িত্ব ও মজবুত ফাউন্ডেশন নিশ্চয়তা"
      ],
      benefitsEn: [
        "Earthquake & wind resistant layouts per BNBC code standards",
        "Advanced finite element analysis using ETABS & SAFE",
        "Flawless bar bending schedule & concrete mix specs",
        "Optimized material budgeting for robust foundation safety"
      ]
    },
    {
      id: "srv_3d_view",
      titleBn: "3D View & Animation (থ্রিডি ভিউ ও অ্যানিমেশন)",
      titleEn: "3D View & Animation Walkthrough",
      descBn: "রিয়েলিস্টিক এক্সটেরিয়র, ইন্টেরিয়র থ্রিডি ভিউ এবং ওয়াকথ্রু অ্যানিমেশন।",
      descEn: "Immersive realistic exterior, interior 3D renders and architectural walkthrough videos.",
      iconName: "Eye",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
      category: "drawing_design",
      badgeBn: "রিয়েলিস্টিক থ্রিডি ওয়াকথ্রু",
      badgeEn: "Realistic 3D Renders",
      benefitsBn: [
        "বাস্তবসম্মত আলোকচিত্রের মাধ্যমে ভবনের বাহ্যিক ও অভ্যন্তরীণ রূপ",
        "৩ডি এলিভেশন ও রিয়েলিস্টিক ৪কে ওয়াকথ্রু অ্যানিমেশন",
        "রঙ, লাইটিং ও নির্মাণ সামগ্রীর চমৎকার কাস্টমাইজেশন",
        "ভবন নির্মাণের পূর্বেই চূড়ান্ত রূপ সরাসরি দেখার সুযোগ"
      ],
      benefitsEn: [
        "Photorealistic rendering of building interior and exterior",
        "Stunning 3D elevation and realistic 4K walkthrough animation",
        "Accurate color tone, illumination and material customized maps",
        "Visualize final building aesthetics before single dollar spent"
      ]
    },
    {
      id: "srv_electrical",
      titleBn: "Electrical Design (ইলেকট্রিক্যাল ডিজাইন)",
      titleEn: "Electrical Design & Load Calculation",
      descBn: "শর্ট সার্কিট ও অগ্নিকাণ্ড এড়াতে আধুনিক লোড ক্যালকুলেশন ও সার্কিট ব্রেকার লেআউট ডিজাইন।",
      descEn: "Short circuit and fire-safe electrical diagrams with robust load calculations and safety checks.",
      iconName: "Zap",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
      category: "drawing_design",
      badgeBn: "১০০% সেফটি ও লোড ক্যালকুলেশন",
      badgeEn: "100% Safe Load Calcs",
      benefitsBn: [
        "শর্ট সার্কিট ও অগ্নিকাণ্ড এড়াতে নির্ভরযোগ্য লোড ক্যালকুলেশন",
        "সটীক ক্যাবল সাইজিং, আর্থিং ও লাইটনিং প্রটেকশন সিস্টেম",
        "আধুনিক লাইটিং লেআউট ও গৃহ সাজানোর চমৎকার সুব্যবস্থা",
        "অপ্রয়োজনীয় বিদ্যুৎ অপচয় রোধে সাশ্রয়ী সার্কিট ডিজাইন"
      ],
      benefitsEn: [
        "Accurate electrical load analysis preventing fire & short circuit",
        "Precise cabling specifications, earthing & lightning protection",
        "Modern ambient lighting schemas and smart power control mappings",
        "Energy-saving power circuit designs saving long-term utility bills"
      ]
    },
    {
      id: "srv_plumbing",
      titleBn: "Plumbing & Sanitation Design (প্লাম্বিং ও স্যানিটেশন ডিজাইন)",
      titleEn: "Plumbing & Sanitary Engineering",
      descBn: "দীর্ঘস্থায়ী ও লিক-প্রুফ নিরাপদ ওয়াটার ও স্যানিটারি সাপ্লাই ও সুয়ারেজ লাইন ডিজাইন।",
      descEn: "Leak-proof water distribution lines, robust storm drainage and sewerage treatment networks.",
      iconName: "Droplet",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
      category: "drawing_design",
      badgeBn: "নিখুঁত প্লাম্বিং সリューション",
      badgeEn: "Perfect Utility Plumbing",
      benefitsBn: [
        "দীর্ঘস্থায়ী ও শতভাগ লিক-প্রুফ ড্রেনেজ ও ওয়াটার সাপ্লাই ডিজাইন",
        "সঠিক ওয়াটার প্রেসার ও নিরাপদ সুয়ারেজ লাইন স্পেসিফিকেশন",
        "আধুনিক রেইন ওয়াটার হারভেস্টিং ও ওয়াটার রিসাইক্লিং লেআউট",
        "গন্ধহীন ও স্বাস্থ্যকর পরিবেশ নিশ্চিতে আধুনিক ভেন্টিলেশন পাইপ"
      ],
      benefitsEn: [
        "Lifetime leak-proof plumbing circuits & storm-water drainage",
        "Optimized hydraulic head pressure and bio-sewerage specs",
        "Advanced rainwater harvesting layouts and recycling integration",
        "Odorless trap integration and soundless vertical discharge shafts"
      ]
    },
    {
      id: "srv_survey",
      titleBn: "Digital Survey (ডিজিটাল সার্ভে)",
      titleEn: "Digital Land Topo Survey",
      descBn: "উন্নত টোটাল স্টেশন ও জিপিএস দ্বারা জমির নিখুঁত সীমানা ও কনট্যুর ম্যাপ তৈরি।",
      descEn: "Precise topographic mappings and digital layouts using GPS & total station equipment.",
      iconName: "Map",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
      category: "survey_soil",
      badgeBn: "ডিজিটাল ও নির্ভুল পরিমাপ",
      badgeEn: "Digital Precision Topo",
      benefitsBn: [
        "উন্নত টোটাল স্টেশন ও জিপিএস দ্বারা নিখুঁত ডিজিটাল সার্ভে",
        "সরকারি মৌজা ম্যাপের সাথে জমির সীমানার সঠিক সমন্বয়",
        "ভবিষ্যতের যেকোনো জটিলতা এড়াতে ডিজিটাল সীমানা ম্যাপ",
        "নির্ভুল ক্ষেত্রফল পরিমাপ ও থ্রিডি কনট্যুর ডাটা প্রস্তুতকরণ"
      ],
      benefitsEn: [
        "Flawless topography maps using high-tech total station & GPS",
        "Accurate boundaries matching official government mouza maps",
        "Digital dispute-free border alignments preventing conflicts",
        "Precise area metrics and structural height benchmarks"
      ]
    },
    {
      id: "srv_soil_test",
      titleBn: "Soil Test (সয়েল টেস্ট)",
      titleEn: "Geotechnical Soil Testing",
      descBn: "উন্নত ও নির্ভরযোগ্য টেস্ট রিপোর্ট ও জিওটেকনিক্যাল ল্যাব এনালাইসিস।",
      descEn: "Deep soil boring, dynamic cone penetration, and high-quality geotechnical laboratory reporting.",
      iconName: "Beaker",
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=800&q=80",
      category: "survey_soil",
      badgeBn: "নিখুঁত ও নির্ভরযোগ্য ল্যাব রিপোর্ট",
      badgeEn: "Geotech Lab Analysis",
      benefitsBn: [
        "গভীর বোরহোল ড্রিলিং ও মাটির বহন ক্ষমতা নিখুঁতভাবে যাচাই",
        "ল্যাব টেস্ট ও বিস্তারিত নির্ভরযোগ্য জিওটেকনিক্যাল রিপোর্ট",
        "অভিজ্ঞ ভূ-তাত্ত্বিক দ্বারা সয়েল রিপোর্টের নির্ভরযোগ্য বিশ্লেষণ",
        "জলাশয় ভরাট করা জমির জন্য বিশেষ পাইল ফাউন্ডেশন পরামর্শ"
      ],
      benefitsEn: [
        "Deep borehole soil testing and accurate bearing capacity mapping",
        "State-of-the-art laboratory testing and certified reports",
        "Thorough analysis of soil layers by certified structural geologists",
        "Specialized foundation suggestions for filled and low lands"
      ]
    },
    {
      id: "srv_construction",
      titleBn: "Building Construction (বিল্ডিং কনস্ট্রাকশন)",
      titleEn: "Building Construction & Supervision",
      descBn: "অভিজ্ঞ সাইট ইঞ্জিনিয়ারদের তত্ত্বাবধানে উন্নতমানের কাঁচামাল দিয়ে ভবন নির্মাণ।",
      descEn: "Premium building construction backed by professional civil site engineers, premium materials and punctual handovers.",
      iconName: "Building2",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80",
      category: "construction",
      badgeBn: "দক্ষ ইঞ্জিনিয়ার সুপারভিশন",
      badgeEn: "Civil Construction Crew",
      benefitsBn: [
        "অভিজ্ঞ সাইট ইঞ্জিনিয়ারদের সার্বক্ষণিক ও কড়া সুপারভিশন",
        "গুনগত মানের সেরা কাঁচামাল ব্যবহার ও নিখুঁত ফিনিশিং",
        "চাবি বুজিয়ে দেওয়া পর্যন্ত সম্পূর্ণ কাজের নিখুঁত তদারকি",
        "নির্ধারিত সময়ে প্রজেক্টের নিরাপদ ও সফল হস্তান্তর"
      ],
      benefitsEn: [
        "Constant expert site engineer supervision at every phase",
        "Elite concrete/rebar materials selection and interior finishes",
        "Complete turnkey oversight from foundation excavation to keys",
        "On-time delivery and strictly optimized material budgets"
      ]
    },
    {
      id: "srv_as_built",
      titleBn: "As Build Drawing (অ্যাস বিল্ট ড্রয়িং)",
      titleEn: "As-Built Blueprints & Handover Assets",
      descBn: "নির্মাণের পর ভবিষ্যৎ রক্ষণাবেক্ষণ ও কাজের সঠিক রেকর্ড রাখার জন্য প্রস্তুতকৃত ড্রয়িং।",
      descEn: "Post-construction drafting documenting actual on-site adjustments for long-term facility maintenance.",
      iconName: "PenTool",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
      category: "drawing_design",
      badgeBn: "কাজের পরে প্রস্তুতকৃত ফাইনাল ড্রয়িং",
      badgeEn: "Post-Build Master File",
      benefitsBn: [
        "ভবন নির্মাণের বাস্তব অভিজ্ঞতার ওপর ভিত্তি করে চূড়ান্ত ড্রয়িং",
        "ভবিষ্যতে ভবনের সংস্কার বা পরিবর্ধনের জন্য অমূল্য গাইডলাইন",
        "প্লাম্বিং, ইলেকট্রিক্যাল ও স্ট্রাকচারাল সংযোগের নির্ভুল লেআউট",
        "যেকোনো জরুরি মেরামতে দ্রুত ত্রুটি সনাক্তকরণ সুবিধা"
      ],
      benefitsEn: [
        "Final verified design reflecting actual on-site structural changes",
        "Asset guide maps for future building expansion or remodeling",
        "Exact route tracking of electrical conduits and plumbing lines",
        "Instant spot pinpointing for maintenance and utility fixes"
      ]
    }
  ],
  projects: [
    {
      id: "proj_01",
      titleBn: "আমিনুল গোল্ডেন ড্রিম ভিলা",
      titleEn: "Aminul Golden Dream Villa",
      category: "duplex",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      additionalImages: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80"
      ],
      areaSft: 4200,
      budgetLakh: 125,
      completionDate: "জানুয়ারি ২০২৫",
      clientNameBn: "লায়ন আশরাফ আলী",
      clientNameEn: "Lion Ashraf Ali",
      locationBn: "উপশহর, সিলেট",
      locationEn: "Upashahar, Sylhet",
      descBn: "একটি বিলাসবহুল ৩ তলা ডুপ্লেক্স আবাসিক ভবন। আধুনিক ইউরোপীয় আর্কিটেকচার ও ক্লাসিকাল ডেকোরেশনের এক চমৎকার মেলবন্ধন। পুরো প্রজেক্টটি আমিনুল কনসালটেন্সি-র দক্ষ ইঞ্জিনিয়ারদের নকশা ও সম্পূর্ণ সুপারভিশনে সম্পন্ন হয়েছে।",
      descEn: "A luxurious 3-story duplex building. It bridges European architecture with modern utility features. Crafted end-to-end under our structural design, planning, and strict site supervision.",
      beforeImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80", // Empty land
      afterImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "proj_02",
      titleBn: "আলহাজ্ব আমিন ম্যানশন",
      titleEn: "Alhaj Amin Mansion",
      category: "apartment",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      additionalImages: [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80"
      ],
      areaSft: 18500,
      budgetLakh: 450,
      completionDate: "ডিসেম্বর ২০২৪",
      clientNameBn: "হাজী আমিনুল ইসলাম",
      clientNameEn: "Haji Aminul Islam",
      locationBn: "উত্তর উত্তরা, ঢাকা",
      locationEn: "Uttara, Dhaka",
      descBn: "জি+৬ তলা বিশিষ্ট বহুতল অ্যাপার্টমেন্ট ভবন। আধুনিক লাইফস্টাইলের সকল সুবিধা যেমন- লিফট, রুফটপ গার্ডেন, সৌরবিদ্যুৎ এবং সুপরিসর বেসমেন্ট পার্কিং এতে যুক্ত রয়েছে। RAJUK এর নতুন কোড অনুযায়ী ভূমিকম্প সহনশীল স্ট্রাকচার ডিজাইনে তৈরি।",
      descEn: "G+6 residential apartment complex featuring a rooftop garden, dynamic backup generator grid, modern lift, and basement parking. Fully vetted and approved by RAJUK code criteria.",
      beforeImage: "https://images.unsplash.com/photo-1584467541268-b040f83be3fd?auto=format&fit=crop&w=800&q=80", // Construction state
      afterImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "proj_03",
      titleBn: "পেন্টহাউস রেসিডেন্স ইন্টেরিয়র",
      titleEn: "Penthouse Residence Interior",
      category: "interior",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
      additionalImages: [
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
      ],
      areaSft: 2800,
      budgetLakh: 45,
      completionDate: "মে ২০২৫",
      clientNameBn: "ফারজানা আক্তার রুনা",
      clientNameEn: "Farzana Akter Runa",
      locationBn: "বনানী রোড-৭, ঢাকা",
      locationEn: "Banani, Dhaka",
      descBn: "প্রশান্তিদায়ক ও লাক্সারি ইন্টেরিয়র সলিউশন। কাস্টমাইজড উডেন প্যানেলিং, ইন্টেলিজেন্ট লাইটিং সিস্টেম এবং মিনিমালিস্ট কালার স্কিমের মাধ্যমে ড্রয়িং এবং বেডরুমের সম্পূর্ণ ভোলবদল করা হয়েছে।",
      descEn: "A magnificent minimal luxury interior makeover with custom ambient lighting, premium woodwork, partition systems, and optimized spacing to elevate corporate-level penthouse living.",
      beforeImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80", // Empty room
      afterImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "proj_04",
      titleBn: "ইকোপার্ক রিসোর্ট রিসেপশন",
      titleEn: "EcoPark Resort Reception",
      category: "commercial",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      additionalImages: [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
      ],
      areaSft: 8500,
      budgetLakh: 210,
      completionDate: "মার্চ ২০২৫",
      clientNameBn: "গ্রীন লাইফ রিসোর্ট লিমিটেড",
      clientNameEn: "Green Life Resort Ltd.",
      locationBn: "শ্রীমঙ্গল, মৌলভীবাজার",
      locationEn: "Sreemangal, Moulvibazar",
      descBn: "ইকো-ফ্রেন্ডলি আর্কিটেকচারাল থিমের বাণিজ্যিক রিসোর্ট রিসেপশন লাউঞ্জ। স্থানীয় পাথর, বাঁশ এবং উন্নত মানের ম্যাটেরিয়ালের সমন্বয়ে দৃষ্টিনন্দন এবং টেকসই বাণিজ্যিক কাঠামো নির্মাণ।",
      descEn: "An eco-centric architectural resort lobby that uses natural local stone, exposed bamboo architecture, and state-of-the-art climate-control materials to minimize electricity waste.",
      beforeImage: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80",
      afterImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
    }
  ],
  testimonials: [
    {
      id: "test_1",
      nameBn: "ইঞ্জি: মাহবুবুর রহমান",
      nameEn: "Engr. Mahbubur Rahman",
      designationBn: "অবসরপ্রাপ্ত সরকারি প্রকৌশলী",
      designationEn: "Retired Government Engineer",
      reviewBn: "আমি নিজেও একজন প্রকৌশলী এবং আমি বলতে বাধ্য যে আমিনুল কনসালটেন্সি-র স্ট্রাকচারাল ডিজাইন এবং কাজের কোয়ালিটি অত্যন্ত প্রশংসনীয়। বিএনবিসি কোড নিখুঁতভাবে মেনে কাজ করে এরা।",
      reviewEn: "Being a civil engineer myself, I closely audited their work blueprints and safety standards. They represent top-tier precision and comply beautifully with the national building code standards.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: "test_2",
      nameBn: "ডা. শায়লা পারভীন",
      nameEn: "Dr. Shaila Parveen",
      designationBn: "মেডিকেল অফিসার, বিএসএমএমইউ",
      designationEn: "BSMMU Medical Officer",
      reviewBn: "আমার ডুপ্লেক্স বাড়ির আর্কিটেকচার প্ল্যান করার সময় আমার সমস্ত চাহিদাকে তারা ধৈর্যের সাথে শোনেন এবং চমৎকার একটি প্ল্যান দেন। নির্মাণের সময় তারা নিয়মিত সাইট ভিজিট করে কাজ ঠিকমতো তদারকি করেছেন।",
      reviewEn: "They showed extreme patience drafting our dream villa. Their architects optimized every corner to allow brilliant sunlight, and their engineers inspected the structural steel pouring regularly.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
    }
  ],
  blogs: [
    {
      id: "blog_1",
      titleBn: "নতুন বাড়ি তৈরির পূর্বে মাটির পরীক্ষা (সয়েল টেস্ট) কেন অপরিহার্য?",
      titleEn: "Why Soil Testing is Mandatory Before House Construction?",
      category: "tips",
      contentBn: "অনেকে খরচ বাঁচানোর জন্য মাটির পরীক্ষা বা সয়েল টেস্ট না করেই ভবন নির্মাণ শুরু করেন। এটি একটি মারাত্মক ভুল। সয়েল টেস্টের মাধ্যমেই জানা যায় মাটির ভারবহন ক্ষমতা কেমন এবং কত গভীরতায় কোন ধরনের ফাউন্ডেশন (যেমন- পাইলিং বা শ্যালো ফাউন্ডেশন) ব্যবহার করতে হবে। সঠিক সয়েল টেস্ট ছাড়া ভবন তৈরি করলে তা দেবে যাওয়া বা ফাটল ধরার ঝুঁকি থাকে যা জীবনের জন্য মারাত্মক হুমকিস্বরূপ।",
      contentEn: "Skipping soil investigation is one of the most dangerous mistakes a landowner can make. A geotechnical soil test establishes the soil profile, water table depth, and maximum bearing capacity. This helps structural engineers design safety-perfect foundations. Building without proper tests risks foundational cracks or catastrophic structural failure.",
      image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=800&q=80",
      date: "২০ জুন, ২০২৬",
      authorBn: "ইঞ্জি: আমিনুল ইসলাম",
      authorEn: "Engr. Aminul Islam"
    },
    {
      id: "blog_2",
      titleBn: "রাজউক বা স্থানীয় কর্তৃপক্ষের প্ল্যান পাসের সঠিক নিয়মাবলি",
      titleEn: "Complete Guide to RAJUK and Local Authority Plan Approvals",
      category: "architecture",
      contentBn: "ঢাকায় বা বাংলাদেশের যেকোনো শহরে বাড়ি তৈরিতে প্রথম গুরুত্বপূর্ণ ধাপ হলো অনুমোদিত নকশা বা প্ল্যান পাস। ফার (FAR) ক্যালকুলেশন, সেট ব্যাক রুলস এবং ফায়ার ফাইটিংয়ের পর্যাপ্ত সুবিধা রেখে ড্রয়িং না করলে নকশা বাতিল হতে পারে। আমিনুল কনসালটেন্সি-র দক্ষ ক্যাড টিম আপনাকে শতভাগ আইনি গাইডলাইন মেনে অতি দ্রুত নকশা পাসের নির্ভরযোগ্য সমাধান দিয়ে থাকে।",
      contentEn: "Building approvals require rigid compliance. Factors like FAR calculation, setbacks, side space clearances, and emergency fire safety exits dictate the structural approval criteria. Working with certified structural engineers ensures your blueprints pass building regulatory inspections without bureaucratic delay.",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
      date: "১৫ জুন, ২০২৬",
      authorBn: "আর্কিটেক্ট ফাহমিদা সুলতানা",
      authorEn: "Arch. Fahmida Sultana"
    }
  ],
  faqs: [
    {
      id: "faq_1",
      questionBn: "একটি বাড়ির আর্কিটেকচারাল ড্রয়িং ও প্ল্যানিং করতে কত খরচ হতে পারে?",
      questionEn: "How much does a house plan and architectural design cost?",
      answerBn: "বাড়ির নকশার খরচ মূলত ভবনের তলার সংখ্যা, জমির মোট আয়তন এবং নান্দনিক চাহিদার ওপর নির্ভর করে। আমরা সাধারণত প্রতি স্কয়ার ফিটের ওপর ভিত্তি করে যৌক্তিক মূল্যে আর্কিটেকচারাল, স্ট্রাকচারাল, ইলেকট্রিকাল ও প্লাম্বিং সহ কমপ্লিট সেট নকশা তৈরি করে থাকি। বিস্তারিত মূল্যের জন্য আমাদের সাথে সরাসরি যোগাযোগ করুন বা নিচের 'ক্যালকুলেটর' ব্যবহার করুন।",
      answerEn: "The cost depends on the floor count, plot size, structural complexity, and detailed style criteria. We quote customizable rates per square foot that bundle architectural, structural, sanitary, plumbing, and electrical layouts. You can calculate a rough budget instantly using our interactive estimator below!"
    },
    {
      id: "faq_2",
      questionBn: "মাটি পরীক্ষার (সয়েল টেস্ট) জন্য কতটি বোর-হোল এবং কত গভীরে ড্রিল করতে হয়?",
      questionEn: "How many boreholes and what depth are needed for a soil test?",
      answerBn: "সাধারণত একটি ৩ থেকে ৫ কাঠা জমিতে অন্তত ৩টি বোর-হোলের প্রয়োজন হয়। ভবনের উচ্চতার ওপর ভিত্তি করে বোর-হোলের গভীরতা ৫০ ফিট থেকে ১০০ ফিট বা তার বেশি হতে পারে। নদী বা নিচু ভরাট এলাকার ক্ষেত্রে আরও বিশেষ গভীরতা এবং নিখুঁত স্যাম্পলিং ল্যাব টেস্টের প্রয়োজন হয়।",
      answerEn: "Typically, a plot size of 3 to 5 Katha requires a minimum of 3 separate boreholes. Depending on the planned building height, drilling depths vary between 50 to 100+ feet. Riverbanks or clay-heavy filled land may demand extra boreholes and lab testing for absolute security."
    },
    {
      id: "faq_3",
      questionBn: "আপনারা কি ঢাকা এবং ঢাকার বাইরের সকল জেলাতে কাজ করেন?",
      questionEn: "Do you offer engineering consultation outside Dhaka?",
      answerBn: "হ্যাঁ, আমিনুল কনসালটেন্সি ও ইঞ্জিনিয়ার্স সমগ্র বাংলাদেশে তাদের বিশ্বস্ত সেবা প্রদান করে থাকে। ইতিমধ্যে আমরা ঢাকা, সিলেট, চট্টগ্রাম, মৌলভীবাজার, এবং কুমিল্লায় সফলভাবে ডুপ্লেক্স ও বহুতল ভবনের প্রজেক্ট সম্পন্ন করেছি। দূরবর্তী স্থানে সয়েল টেস্ট এবং প্রজেক্ট ভিজিটের জন্য আমাদের দক্ষ দল দ্রুত স্থান পরিদর্শন করতে সক্ষম।",
      answerEn: "Yes! We operate on projects countrywide across Bangladesh. We have designed, verified, and supervised high-profile buildings and modern duplexes in Sylhet, Chittagong, Dhaka, Moulvibazar, and Comilla. Our core engineers travel nationwide for on-site monitoring and geo-tests."
    },
    {
      id: "faq_4",
      questionBn: "নির্মাণ কাজের সময় আপনারা কি সাইট তদারকি (সুপারভিশন) সেবা দেন?",
      questionEn: "Do you provide on-site supervision during construction phases?",
      answerBn: "অবশ্যই। প্রজেক্টের শুরু থেকে শেষ পর্যন্ত গুরুত্বপূর্ণ ঢালাই ফেজ (যেমন- ফুটিন, কলাম, ছাদ ঢালাই) এর সময়ে আমাদের দক্ষ প্রকৌশলীরা সশরীরে সাইট ভিজিট করে কাজের গুণগত মান নিশ্চিত করে থাকেন। এছাড়াও আমাদের সাইট ইঞ্জিনিয়াররা ঠিকাদাররা ডিজাইন ও ড্রয়িং অনুযায়ী কাজ করছে কিনা তা নিখুঁতভাবে তদারকি করেন।",
      answerEn: "Absolutely. During critical milestones (footing, column rebar checking, slab concrete pouring), our civil engineers conduct systematic on-site verification. We ensure contractor masonry meets exact architectural layouts, and reinforce proper concrete hydration practices."
    }
  ],
  team: [
    {
      id: "team_1",
      nameBn: "ইঞ্জি: আমিনুল ইসলাম",
      nameEn: "Engr. Aminul Islam",
      roleBn: "প্রতিষ্ঠাতা ও প্রধান স্ট্রাকচারাল ইঞ্জিনিয়ার",
      roleEn: "Founder & Lead Structural Engineer",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "team_2",
      nameBn: "আর্কিটেক্ট ফাহমিদা সুলতানা",
      nameEn: "Arch. Fahmida Sultana",
      roleBn: "প্রধান আর্কিটেক্ট ও প্ল্যানার",
      roleEn: "Chief Architect & Space Planner",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "team_3",
      nameBn: "ইঞ্জি: তানভীর আহমেদ",
      nameEn: "Engr. Tanveer Ahmed",
      roleBn: "সিনিয়র জিওটেকনিক্যাল কনসালটেন্ট",
      roleEn: "Senior Geotechnical Consultant",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80"
    }
  ],
  messages: [
    {
      id: "msg_1",
      name: "মোহাম্মদ রাশেদুল বারী",
      phone: "01722-114455",
      email: "rashed@example.com",
      subject: "৩ তলা আবাসিক ডুপ্লেক্সের সয়েল টেস্ট এবং ডিজাইন প্রজেক্ট",
      message: "আমার সিলেট সদরে ৫ কাঠা জমি আছে, সেখানে আমি একটি আধুনিক ৩ তলা ডুপ্লেক্স করতে চাই। সয়েল টেস্ট এবং আর্কিটেকচারাল ড্রয়িং এর একটি খসড়া বাজেট এবং সার্ভিস প্রসেস জানালে উপকৃত হতাম।",
      date: "২০২৬-০৬-২৪T১০:১৫:০০-০৭:০০",
      status: "unread"
    },
    {
      id: "msg_2",
      name: "সাহিল চৌধুরী",
      phone: "01911-338899",
      email: "sahil.ch@example.com",
      subject: "ইন্টেরিয়র ডিজাইন কন্সালটেশন",
      message: "গুলশান-২ এ আমাদের নতুন ফ্ল্যাটে চার বেডরুম ও লিভিং ড্রয়িং রুমের কাস্টম মডার্ন ক্যাবিনেট ও লাইটিং ডিজাইনের জন্য পরামর্শ চাচ্ছিলাম। আপনাদের টিম কি সশরীরে এসে মেজারমেন্ট নিয়ে ড্রয়িং দিতে পারবে?",
      date: "২০২৬-০৬-২৩T১৫:৪০:০০-০৭:০০",
      status: "read"
    }
  ]
};
