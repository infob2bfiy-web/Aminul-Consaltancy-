import { Settings, Service, Project, GalleryItem, Testimonial, Blog, FAQ, TeamMember } from './types';

export const initialSettings: Settings = {
  companyName: "আমিনুল কনসালটেন্সি এন্ড ইঞ্জিনিয়ার্স",
  companyNameEn: "Aminul Consultancy & Engineers",
  tagline: "আপনার স্বপ্নের প্রজেক্ট আমাদের দক্ষ হাতে",
  taglineEn: "Your Dream Project in Our Expert Hands",
  whatsappNumber: "+8801700000000",
  messengerLink: "https://m.me/aminulconsultancy",
  contactPhone: "+8801712345678",
  contactEmail: "info@aminulengineering.com",
  officeAddress: "আমিনুল টাওয়ার, ৪র্থ তলা, উত্তরা সেক্টর ১১, ঢাকা ১২৩০",
  officeAddressEn: "Aminul Tower, 4th Floor, Uttara Sector 11, Dhaka-1230",
  workingHours: "শনিবার - বৃহস্পতিবার: সকাল ৯টা - সন্ধ্যা ৭টা",
  workingHoursEn: "Saturday - Thursday: 9:00 AM - 7:00 PM",
  primaryColor: "#0D5C46", // Deep Emerald Green
  secondaryColor: "#E6B325", // Gold
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.3973977526703!2d90.3892705!3d23.8755034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c469f64efcfd%3A0xc6cbef3e6806dfa9!2sUttara%20Sector%2011%20Park!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd",
  facebookPixel: "",
  googleAnalyticsId: "",
  seoTitle: "আমিনুল কনসালটেন্সি এন্ড ইঞ্জিনিয়ার্স - বিশ্বস্ত কনসালটেন্সি ও ইঞ্জিনিয়ারিং সেবা",
  seoDescription: "আমরা দিচ্ছি সম্পূর্ণ আর্কিটেকচারাল, স্ট্রাকচারাল, সয়েল টেস্ট, ডিজিটাল সার্ভে এবং নির্মাণ সেবা। BNBC কোড ও রাজউক নিয়ম মেনে আধুনিক ডিজাইনের নিশ্চয়তা।",
  logoUrl: "",
  faviconUrl: "",
  adminUsername: "admin",
  adminPassword: "admin123"
};

export const initialServices: Service[] = [
  {
    id: "architectural-design",
    title: "Architectural Design (আর্কিটেকচারাল ডিজাইন)",
    titleEn: "Architectural Design",
    description: "আধুনিক এলিভেশন ও নান্দনিক রাজউক এবং স্থানীয় নিয়ম মেনে নিখুঁত প্ল্যানিং।",
    descriptionEn: "Modern elevation, outstanding aesthetic layout, and precise architectural planning fully complying with RAJUK and local building codes.",
    benefits: [
      "আধুনিক ও নান্দনিক ফ্রন্ট এলিভেশন ডিজাইন",
      "দক্ষ ফ্লোর প্ল্যান ও ফার্নিচার লেআউট প্ল্যানিং",
      "প্রাকৃতিক আলো ও বাতাস চলাচলের সর্বোচ্চ ব্যবহার",
      "রাজউক (RAJUK) এবং স্থানীয় কর্পোরেট নিয়ম মেনে নিখুঁত ড্রয়িং প্রস্তুতকরণ"
    ],
    benefitsEn: [
      "Modern and aesthetically appealing exterior elevations",
      "Highly optimized floor layouts with detailed furniture placement",
      "Maximum integration for daylighting and natural cross-ventilation",
      "Strict compliance with RAJUK, municipal authorities, and local regulations"
    ],
    iconName: "Home",
    imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "structural-design",
    title: "Structural Design (স্ট্রাকচারাল ডিজাইন)",
    titleEn: "Structural Design",
    description: "BNBC ও ACI কোড মেনে ভূমিকম্প ও ঝড় সহনশীল রড-সিমেন্ট সাশ্রয়ী ডিজাইন।",
    descriptionEn: "Highly secure, earthquake & wind resistant structural calculations optimizing rod and cement under BNBC & ACI design standards.",
    benefits: [
      "ভূমিকম্প এবং ঝড় সহনশীল মজবুত অবকাঠামো পরিকল্পনা",
      "রড ও সিমেন্টের পরিমিত ব্যবহারে সাশ্রয়ী ও নিরাপদ ডিজাইন",
      "ফাউন্ডেশন এবং কলামের নিখুঁত লোড ক্যালকুলেশন",
      "অভিজ্ঞ বুয়েট ও ডুয়েট গ্র্যাজুয়েট প্রফেশনাল সিভিল ইঞ্জিনিয়ারদের তদারকি"
    ],
    benefitsEn: [
      "Seismic (earthquake) and high-wind resilient structural frame models",
      "Optimized design saving unnecessary rod, cement, and concrete expenses",
      "Accurate column, beam, shear-wall, and foundation load calculations",
      "Engineered and certified by top-tier BUET and DUET graduate professionals"
    ],
    iconName: "Shield",
    imageUrl: "https://images.unsplash.com/photo-1581094288338-2314dddb7eed?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "three-d-view-animation",
    title: "3D View & Animation (৩ডি ভিউ ও অ্যানিমেশন)",
    titleEn: "3D View & Animation",
    description: "রিয়েলিস্টিক এক্সটেরিয়র, ইন্টেরিয়র ৩ডি ভিউ এবং থ্রিডি ভিডিও অ্যানিমেশন ওয়াকথ্রু।",
    descriptionEn: "Immersive photorealistic exterior renders, beautiful interior details, and cinematic 3D video animation walkthroughs.",
    benefits: [
      "বাস্তবধর্মী থ্রিডি এক্সটেরিয়র ডিজাইন ও আধুনিক কালার কম্বিনেশন",
      "আকর্ষণীয় ইন্টেরিয়র ৩ডি ভিউ (লাক্সারি ফার্নিচার, সিলিং ও লাইটিং)",
      "মেটেরিয়াল ও টেক্সচার ক্রয়ের পূর্বেই রেন্ডার দেখে নিখুঁত সিদ্ধান্ত গ্রহণের সুবিধা",
      "সম্পূর্ণ সিনেমাটিক ওয়াকথ্রু ও আর্কিটেকচারাল ভিডিও অ্যানিমেশন"
    ],
    benefitsEn: [
      "High-definition photo-realistic exterior perspectives and colors",
      "Luxury interior 3D visualizations (ceilings, cabinets, premium lighting)",
      "Helps make changes and finalize materials before starting construction",
      "High-quality cinematic flythrough videos and animations of your project"
    ],
    iconName: "Eye",
    imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "electrical-design",
    title: "Electrical Design (ইলেকট্রিক্যাল ডিজাইন)",
    titleEn: "Electrical Design",
    description: "শর্ট সার্কিট ও অগ্নিকাণ্ড প্রতিরোধী পাওয়ার লোড ও এনার্জি-সেভিং ওয়্যারিং লেআউট।",
    descriptionEn: "Safety-first electrical routing, smart short-circuit protection, precise power calculations, and energy-saving lighting layouts.",
    benefits: [
      "শর্ট সার্কিট ও অগ্নিকাণ্ড প্রতিরোধী নিরাপদ তার ও ওয়্যারিং লেআউট",
      "বিদ্যুৎ বিল কমাতে বিদ্যুৎ-সাশ্রয়ী লাইটিং ও সুষম লোড ডিস্ট্রিবিউশন",
      "সঠিক সার্কিট ব্রেকার, এসডিবি ও কার্যকর আর্থিং সিস্টেম ডিজাইন",
      "ভবিষ্যতের যেকোনো ডিভাইস ব্যবহারের জন্য সুরক্ষিত ও আধুনিক ইলেকট্রিক্যাল নকশা"
    ],
    benefitsEn: [
      "Short-circuit and electric fire hazard prevention wire routing layouts",
      "Highly efficient electrical energy balance saving monthly utility bills",
      "Accurate circuit-breaker, switchboard, and lightning protection specs",
      "Scalable load planning for future electronics and air conditioners"
    ],
    iconName: "Zap",
    imageUrl: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "plumbing-sanitation-design",
    title: "Plumbing & Sanitation Design (প্লাম্বিং ও স্যানিটেশন ডিজাইন)",
    titleEn: "Plumbing & Sanitation Design",
    description: "চিরতরে লিকেজ-মুক্ত নিরাপদ দীর্ঘস্থায়ী ওয়াটার সাপ্লাই ও ড্রেনেজ লাইন।",
    descriptionEn: "Completely leak-proof water supply networks, reliable sanitary pipelines, and high-efficiency drainage system designs.",
    benefits: [
      "পানি সরবরাহ ও নিষ্কাশনের নিখুঁত পাইপলাইন রুট (লিকেজ-মুক্ত গ্যারান্টি)",
      "আধুনিক বাথরুমের প্রফেশনাল স্যানিটারি ফিটিংস লেআউট",
      "সঠিক আকারের সেপটিক ট্যাংক এবং সোকপিট স্ট্রাকচারাল ডিজাইন",
      "ভবনের দীর্ঘস্থায়ী স্থায়িত্ব নিশ্চিতে পানি জমে থাকা ও স্যাঁতসেঁতে ভাব প্রতিরোধ"
    ],
    benefitsEn: [
      "Fully structured pipe networks keeping your concrete walls leak-free",
      "Optimal plumbing pressure routing for kitchens and luxury bathrooms",
      "Standard and hygienic septic tank and soakwell capacity designs",
      "Guarantees protection against waterlogging and damp wall issues"
    ],
    iconName: "Droplet",
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "digital-survey",
    title: "Digital Survey (ডিজিটাল সার্ভে)",
    titleEn: "Digital Survey",
    description: "টোটাল স্টেশন ও আরটিকে (RTK) প্রযুক্তির সাহায্যে ১০০% নির্ভুল সীমানা জরিপ।",
    descriptionEn: "100% accurate boundary, level, and topographic land survey using advanced RTK GPS and Total Station technologies.",
    benefits: [
      "জমির সীমানা, দৈর্ঘ্য ও ক্ষেত্রফলের শতভাগ নিখুঁত পরিমাপ",
      "জমির উঁচুনীচু লেভেল বা কনট্যুর ম্যাপ নিখুঁতভাবে তৈরি",
      "ডিজিটাল অটোক্যাড (AutoCAD) ড্রয়িং ও প্রফেশনাল সার্ভে রিপোর্ট প্রদান",
      "ভবিষ্যতে প্রতিবেশীদের সাথে সীমানা সংক্রান্ত আইনি জটিলতা প্রতিরোধ"
    ],
    benefitsEn: [
      "100% accurate measurements of land area, boundaries, and shapes",
      "Detailed elevation difference and contour profiling of the property",
      "High-precision AutoCAD layouts and printed survey log books",
      "Prevents potential land disputes and municipal approval conflicts"
    ],
    iconName: "Compass",
    imageUrl: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "soil-test",
    title: "Soil Test (সয়েল টেস্ট)",
    titleEn: "Soil Test",
    description: "বুয়েট ও স্বনামধন্য ল্যাব সার্টিফাইড মাটির সঠিক ধারণক্ষমতা ও এসপিটি (SPT) পরীক্ষা।",
    descriptionEn: "Highly accurate soil bearing capacity analysis and standard SPT geotechnical tests certified by BUET or premium authorized laboratories.",
    benefits: [
      "মাটির গভীরতা এবং বিভিন্ন স্তরের সঠিক ধারণক্ষমতা (Bearing Capacity) পরিমাপ",
      "যথাযথ বোরহোল ড্রিলিং এবং স্ট্যান্ডার্ড পেনিট্রেশন টেস্ট (SPT)",
      "বুয়েট বা দেশের অন্যতম বিশ্বস্ত ও অনুমোদিত ল্যাব দ্বারা রিপোর্ট প্রদান",
      "ভুল ফাউন্ডেশন নির্বাচন জনিত কারণে ভবন ফাটল ধরা বা ধসে পড়া থেকে চিরতরে মুক্তি"
    ],
    benefitsEn: [
      "Accurate evaluation of soil bearing capacity at distinct geological depths",
      "Standardized SPT tests and professional borehole drilling processes",
      "Testing and documentation verified by BUET or authorized government labs",
      "Protects the structure against dangerous differential settlements or tilts"
    ],
    iconName: "Layers",
    imageUrl: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "building-construction",
    title: "Building Construction (বিল্ডিং কন্সট্রাকশন)",
    titleEn: "Building Construction",
    description: "দক্ষ প্রকৌশলীদের সরাসরি সাইট তদারকি এবং গুণগত মান বজায় রেখে ভবন নির্মাণ।",
    descriptionEn: "Premium building construction execution monitored directly by qualified engineers ensuring raw materials standards.",
    benefits: [
      "স্ট্রাকচারাল ড্রয়িং ও কোড অনুযায়ী শতভাগ নিখুঁত ঢালাই কাজ নিশ্চিতকরণ",
      "সিমেন্ট, বালু, পাথর ও রডের সঠিক মিক্সিং রেশিও ও কোয়ালিটি কন্ট্রোল",
      "অভিজ্ঞ সিভিল ইঞ্জিনিয়ারদের সরাসরি তত্ত্বাবধানে নির্মাণ কাজ পরিচালনা",
      "নির্মাণ সামগ্রীর অপচয় রোধ ও নিখুঁত প্ল্যানিংয়ে সময়মতো কাজ ডেলিভারি"
    ],
    benefitsEn: [
      "Meticulous construction execution exactly according to civil blueprint details",
      "Rigorous quality control of cement, sand, stones, and rebar reinforcement",
      "Direct site supervision by experienced resident engineers",
      "Reduces material wastage and guarantees timely phase-wise handover"
    ],
    iconName: "HardHat",
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "as-build-drawing",
    title: "As Build Drawing (অ্যাস বিল্ড ড্রয়িং)",
    titleEn: "As Build Drawing",
    description: "সংস্কার বা ভবিষ্যৎ রক্ষণাবেক্ষণের জন্য নির্মাণ-পরবর্তী আসল রেকর্ডের ফাইনাল ড্রয়িং।",
    descriptionEn: "Final post-construction record drawings reflecting actual built dimensions for hassle-free future maintenance & remodeling.",
    benefits: [
      "বাস্তব ক্ষেত্রে নির্মিত কাঠামোর নিখুঁত দৈর্ঘ্য-প্রস্থ ও অবস্থান রেকর্ড ড্রয়িং",
      "ভবিষ্যতে ভবন বর্ধিতকরণ, ডেকোরেশন বা সংস্কার কাজের নিখুঁত গাইডলাইন",
      "প্লাম্বিং, গ্যাস ও ইলেকট্রিক্যাল লাইনের আসল রুট সম্বলিত মাস্টারপ্ল্যান",
      "ভবনের আজীবন রক্ষণাবেক্ষণের জন্য অন্যতম প্রয়োজনীয় আইনি ও কারিগরি ডকুমেন্ট"
    ],
    benefitsEn: [
      "Captures the final physical configurations and precise spatial dimensions",
      "Indispensable handbook for future remodeling, extension, or repair works",
      "Records true conduits of gas, electrical channels, and plumbing circuits",
      "Required safety document for commercial approvals or bank valuation"
    ],
    iconName: "Ruler",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
  }
];

export const initialProjects: Project[] = [
  {
    id: "luxury-duplex-uttara",
    title: "উত্তরা বিলাসবহুল ডুপ্লেক্স হোম",
    titleEn: "Luxury Duplex Villa in Uttara",
    category: "ডুপ্লেক্স",
    categoryEn: "Duplex",
    description: "উত্তরা সেক্টর ১১-তে ৫ কাঠা জমির ওপর নির্মিত একটি নান্দনিক রাজকীয় ডুপ্লেক্স ডাবল হাইট সিলিং বাড়ি। এখানে প্রাকৃতিক আলো ও আধুনিক ল্যান্ডস্কেপিংয়ের সমন্বয় করা হয়েছে।",
    descriptionEn: "A high-end modern duplex villa built on 5 katha land in Uttara Sector 11 featuring a double height ceiling, gorgeous landscaping, and energy-efficient lighting.",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
    ],
    area: "৪,৫০০ বর্গফুট (4,500 Sq Ft)",
    budget: "১.৮ কোটি টাকা (BDT 1.8 Crore)",
    completionDate: "জানুয়ারি ২০২৫ (January 2025)",
    clientName: "জনাব আমিনুর রহমান (Mr. Aminur Rahman)",
    location: "উত্তরা, ঢাকা (Uttara, Dhaka)",
    locationEn: "Uttara, Dhaka",
    beforeImageUrl: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=600&q=80", // Empty Land
    afterImageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80" // Finished Home
  },
  {
    id: "multi-family-apartment-mirpur",
    title: "মিরপুর ১০-তলা আবাসিক ভবন",
    titleEn: "10-Story Residential Apartment in Mirpur",
    category: "আবাসিক",
    categoryEn: "Residential",
    description: "মিরপুরে আধুনিক সকল সুযোগ-সুবিধা সম্পন্ন একটি ১০-তলা আবাসিক ভবন। সম্পূর্ণ ভূমিকম্প সহনশীল স্ট্রাকচার এবং রাজউকের নিয়ম মেনে পর্যাপ্ত পার্কিং এরিয়া রাখা হয়েছে।",
    descriptionEn: "A magnificent 10-story residential complex in Mirpur. Complete structural safety certified against seismic forces with generous ventilation and ample car parking.",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
    ],
    area: "২৪,০০০ বর্গফুট (24,000 Sq Ft)",
    budget: "৬.৫ কোটি টাকা (BDT 6.5 Crore)",
    completionDate: "মার্চ ২০২৪ (March 2024)",
    clientName: "মেসার্স স্কাই প্রোপার্টিজ (M/S Sky Properties)",
    location: "মিরপুর, ঢাকা (Mirpur, Dhaka)",
    locationEn: "Mirpur, Dhaka",
    beforeImageUrl: "https://images.unsplash.com/photo-1584467541268-b040f83be3fd?auto=format&fit=crop&w=600&q=80", // Digging site
    afterImageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80" // High rise
  },
  {
    id: "corporate-office-banani",
    title: "বনানী লাক্সারি কর্পোরেট অফিস ইন্টেরিয়র",
    titleEn: "Corporate Office Interior in Banani",
    category: "ইন্টেরিয়র",
    categoryEn: "Interior",
    description: "বনানীর একটি নামকরা আইটি প্রতিষ্ঠানের ৩,০০০ বর্গফুটের কর্পোরেট অফিস ইন্টেরিয়র ডিজাইন। ওয়ার্কস্টেশন, মিনিমাল কনফারেন্স রুম এবং লাউঞ্জের আধুনিক সুবিন্যাস।",
    descriptionEn: "A bespoke corporate office interior for an IT conglomerate in Banani. Optimized work zones, elegant acoustic conference rooms, and ergonomic executive suites.",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80"
    ],
    area: "৩,২০০ বর্গফুট (3,200 Sq Ft)",
    budget: "৭৫ লক্ষ টাকা (BDT 75 Lakh)",
    completionDate: "নভেম্বর ২০২৪ (November 2024)",
    clientName: "নেক্সাস গ্লোবাল সলিউশনস (Nexus Global Solutions)",
    location: "বনানী, ঢাকা (Banani, Dhaka)",
    locationEn: "Banani, Dhaka",
    beforeImageUrl: "https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?auto=format&fit=crop&w=600&q=80", // Empty shell office
    afterImageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80" // Modern decorated
  },
  {
    id: "commercial-plaza-gazipur",
    title: "গাজীপুর ৫-তলা শপিং প্লাজা",
    titleEn: "5-Story Shopping Complex in Gazipur",
    category: "কমার্শিয়াল",
    categoryEn: "Commercial",
    description: "গাজীপুরের ব্যস্ততম মোড়ে নির্মিত একটি বহুমুখী ৫-তলা বাণিজ্যিক বিপণী বিতান। প্রশস্ত লিফট এরিয়া, আধুনিক ফায়ার সেফটি নেটওয়ার্ক এবং পর্যাপ্ত সেন্ট্রাল এসি সুবিধা রয়েছে।",
    descriptionEn: "A high-traffic 5-story commercial shopping complex in Gazipur. Modern fire fighting networks, central cooling system, high load flooring, and spacious pathways.",
    images: [
      "https://images.unsplash.com/photo-1555637138-afc97d405477?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1428317934465-fc2971d9062a?auto=format&fit=crop&w=1200&q=80"
    ],
    area: "১৮,৫০০ বর্গফুট (18,500 Sq Ft)",
    budget: "৪.২ কোটি টাকা (BDT 4.2 Crore)",
    completionDate: "ডিসেম্বর ২০২৩ (December 2023)",
    clientName: "হাজী শরিফ ট্রেডার্স (Haji Sharif Traders)",
    location: "চৌরাস্তা, গাজীপুর (Chourasta, Gazipur)",
    locationEn: "Chourasta, Gazipur",
    beforeImageUrl: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=600&q=80",
    afterImageUrl: "https://images.unsplash.com/photo-1555637138-afc97d405477?auto=format&fit=crop&w=600&q=80"
  }
];

export const initialGallery: GalleryItem[] = [
  {
    id: "progress-1",
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    title: "ডিজিটাল আরটিকে সার্ভে ও সীমানা চিহ্নিতকরণ",
    titleEn: "Digital RTK Survey and Boundary Marking",
    category: "সার্ভে"
  },
  {
    id: "progress-2",
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80",
    title: "ফাউন্ডেশন ঢালাইয়ের পূর্বে রড ও শাটারিং ইন্সপেকশন",
    titleEn: "Rebar and Shuttering Quality Inspection Before Casting",
    category: "নির্মাণাধীন"
  },
  {
    id: "progress-3",
    imageUrl: "https://images.unsplash.com/photo-1581094288338-2314dddb7eed?auto=format&fit=crop&w=800&q=80",
    title: "অটোক্যাড এবং রিভিট সফটওয়্যারের সাহায্যে স্ট্রাকচারাল রি-চেক",
    titleEn: "Structural Re-checking with AutoCAD and Revit Software",
    category: "ডিজাইন"
  },
  {
    id: "progress-4",
    imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    title: "উত্তরা ডুপ্লেক্স হাউজের ড্রয়িং রুম ইন্টেরিয়র কাজ",
    titleEn: "Living Room Interior Designing in Uttara Duplex House",
    category: "ইন্টেরিয়র"
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: "testi-1",
    name: "মেজর (অব:) সারওয়ার জাহান",
    nameEn: "Major (Retd) Sarwar Jahan",
    designation: "উত্তরা ৫-তলা আবাসিক বাড়ির মালিক",
    designationEn: "Owner of 5-Story Villa, Uttara",
    review: "আমিনুল কনসালটেন্সি এন্ড ইঞ্জিনিয়ার্স-এর সেবা সত্যিই প্রশংসনীয়। তারা রাজউক থেকে প্ল্যান পাশ করানোর শুরু থেকে মাটির পরীক্ষা ও পাইল ডিজাইন নিখুঁতভাবে করে দিয়েছে। তাদের সাইট সুপারভিশনের কারণে আমাদের ঢালাইয়ের মান অসাধারণ হয়েছে। ধন্যবাদ আমিনুল সাহেব ও তার টিমকে!",
    reviewEn: "Aminul Consultancy's engineering capability is unparalleled. They handled the entire RAJUK approval, geotechnical testing, and foundation layout seamlessly. Their structural supervision guaranteed top-tier concrete quality.",
    rating: 5,
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: "testi-2",
    name: "ইঞ্জি: ফারিহা রহমান",
    nameEn: "Engr. Fariha Rahman",
    designation: "ব্যবস্থাপনা পরিচালক, লুমিনাস বিল্ডার্স",
    designationEn: "Managing Director, Luminous Builders",
    review: "আমরা দীর্ঘদিন ধরে আমিনুল কন্সাল্টেন্সি থেকে আমাদের সকল প্রজেক্টের স্ট্রাকচারাল ডিজাইন এবং আর্কিটেকচারাল এলিভেশন করিয়ে আসছি। তাদের ভূমিকম্প প্রতিরোধী ডিজাইন চমৎকার এবং তারা ম্যাটেরিয়াল এস্টিমেশনে অত্যন্ত দক্ষ, যা আমাদের নির্মাণ খরচ প্রায় ১৫% বাঁচিয়েছে।",
    reviewEn: "We consistently outsource our complex structural calculations to Aminul Consultancy. Their seismic resistance plans are incredibly efficient, saving us over 15% in material waste. Their response rate is exemplary.",
    rating: 5,
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
  }
];

export const initialBlogs: Blog[] = [
  {
    id: "blog-1",
    title: "বাড়ি নির্মাণের পূর্বে সয়েল টেস্ট বা মাটির পরীক্ষা কেন জরুরি?",
    titleEn: "Why Geotechnical Soil Test is Crucial Before Building?",
    category: "টিপস",
    categoryEn: "Tips",
    content: "যেকোনো বহুতল বা একতলা ভবন নির্মাণের পূর্বে মাটির ধারণক্ষমতা যাচাই করা অত্যন্ত গুরুত্বপূর্ণ। সয়েল টেস্ট না করে বাড়ি তৈরি করলে পরবর্তীতে মাটির অসম বসার (Differential Settlement) কারণে দেয়ালে ফাটল দেখা দিতে পারে এবং চরম ঝুঁকিতে পড়তে পারে। সঠিক সয়েল টেস্টের মাধ্যমে নির্ধারণ করা হয় বাড়িটি পাইল ফাউন্ডেশন নাকি নরমাল ফুটিংয়ে দাঁড়িয়ে থাকবে। BNBC নিয়মানুযায়ী কমপক্ষে ৩টি বোরহোল করে পরীক্ষা করা উচিত।",
    contentEn: "Before constructing any building, analyzing the load-bearing capacity of the underlying soil is paramount. Proceeding without a soil test risks differential settlement, leading to wall cracks or collapse. A standard SPT test reveals whether a shallow footing or deep piles are required. According to BNBC guidelines, at least three boreholes should be drilled for residential structures.",
    imageUrl: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=800&q=80",
    author: "ইঞ্জি: আমিনুল ইসলাম",
    authorEn: "Engr. Aminul Islam",
    date: "মে ২৪, ২০২৬ (May 24, 2026)",
    tags: ["সয়েল টেস্ট", "ভাউন্ডেশন", "টিপস", "Soil Test"]
  },
  {
    id: "blog-2",
    title: "ভূমিকম্প সহনশীল আধুনিক বাড়ির স্ট্রাকচারাল ডিজাইন করার নিয়মাবলী",
    titleEn: "Guidelines for Designing Earthquake Resistant Modern Buildings",
    category: "ইঞ্জিনিয়ারিং",
    categoryEn: "Engineering",
    content: "বাংলাদেশ একটি ভূমিকম্প প্রবণ অঞ্চল। তাই বাড়ি তৈরির সময় স্ট্রাকচারাল ডিজাইনে বিশেষ মনোযোগ দিতে হবে। আমাদের দেশে সাধারণত রিইনফোর্সড কনক্রিট ফ্রেম স্ট্রাকচার ব্যবহার করা হয়। ভূমিকম্প সহনশীল বাড়ির ক্ষেত্রে ডকটাইলিটি (Ductility) অত্যন্ত গুরুত্বপূর্ণ। কলাম ও বিমের সংযোগস্থলে সঠিক রডের রিইনফোর্সমেন্ট ডিটেইলিং, ওয়াটার-সিমেন্ট রেশিও নিয়ন্ত্রণ এবং নিখুঁত ডিজাইন আপনার পরিবারকে বড় বড় বিপর্যয় থেকে রক্ষা করতে পারে।",
    contentEn: "Bangladesh lies in an active seismic zone, making earthquake-resistant structural analysis mandatory. For durable reinforced concrete frame buildings, proper ductility detailing, column-beam joints spacing, and maintaining specific concrete curing ratios are essential to withstand rich seismic forces according to BNBC codes.",
    imageUrl: "https://images.unsplash.com/photo-1581094288338-2314dddb7eed?auto=format&fit=crop&w=800&q=80",
    author: "ইঞ্জি: আমিনুল ইসলাম",
    authorEn: "Engr. Aminul Islam",
    date: "জুন ০৫, ২০২৬ (June 05, 2026)",
    tags: ["ভূমিকম্প", "স্ট্রাকচারাল ডিজাইন", "BNBC", "Seismic Design"]
  }
];

export const initialFaqs: FAQ[] = [
  {
    id: "faq-1",
    question: "একটি ডুপ্লেক্স বাড়ির আর্কিটেকচারাল ও স্ট্রাকচারাল ডিজাইন করতে কত টাকা খরচ হয়?",
    questionEn: "How much does it cost to design a duplex home plan?",
    answer: "ডিজাইন ও কনসালটেন্সি ফি মূলত জায়গার আকার, এলিভেশন স্টাইল এবং প্রজেক্টের ধরনের ওপর নির্ভর করে। আমিনুল কনসালটেন্সি অ্যান্ড ইঞ্জিনিয়ার্স অত্যন্ত সাশ্রয়ী মূল্যে বাজেট-বান্ধব ডিজাইন প্যাকেজ অফার করে থাকে। সাধারণত প্রতি বর্গফুটের ওপর ভিত্তি করে আর্কিটেকচারাল, স্ট্রাকচারাল ও ইলেকট্রিক্যাল-প্লাম্বিংয়ের সম্পূর্ণ ড্রয়িং প্যাকেজের ফি নির্ধারণ করা হয়। সঠিক খরচের জন্য আমাদের সাথে সরাসরি যোগাযোগ করুন।",
    answerEn: "Consultancy and design fees depend on the land size, elevation styling, and specific drawings required. We offer competitive budget-friendly packages which encompass complete architectural layouts, structural designs, and MEP drawings calculated on a per square foot basis."
  },
  {
    id: "faq-2",
    question: "আপনারা কি ঢাকা শহরের বাইরে কাজ করেন?",
    questionEn: "Do you provide consultancy and engineering services outside Dhaka?",
    answer: "হ্যাঁ! আমরা সমগ্র বাংলাদেশে আমাদের কনসালটেন্সি, ডিজিটাল ল্যান্ড সার্ভে, সয়েল টেস্ট এবং স্ট্রাকচারাল ডিজাইনের কাজ সফলতার সাথে দিয়ে আসছি। ঢাকা, চট্টগ্রাম, সিলেট, খুলনা, রাজশাহী, বরিশাল, রংপুর সহ প্রত্যন্ত অঞ্চলেও আমাদের ডিজাইনকৃত প্রজেক্ট রয়েছে। আমাদের দক্ষ টিম সরাসরি সাইটে ভিজিট করে ডিজিটাল সার্ভে ও তদারকি করে থাকে।",
    answerEn: "Yes! We proudly offer our engineering, land surveying, soil testing, and structural consultancy services across all 64 districts in Bangladesh. Our surveying and engineering teams physically travel to local sites to perform tests, digital layouts, and building supervision."
  },
  {
    id: "faq-3",
    question: "সয়েল টেস্ট ও ডিজিটাল সার্ভে করা কেন জরুরি?",
    questionEn: "Why are soil testing and digital land surveys mandatory?",
    answer: "সয়েল টেস্ট না করলে ভবনের ফাউন্ডেশন দুর্বল হয়ে তলিয়ে যেতে পারে বা দেয়ালে ফাটল ধরতে পারে। ডিজিটাল ল্যান্ড সার্ভে আপনার জায়গার নিখুঁত সীমানা এবং উচ্চতার ঢাল চিহ্নিত করে, যা ডিজাইনে মালামালের অপচয় রোধ করতে এবং প্রতিবেশীর সীমানা নিয়ে যেকোনো ধরণের আইনি বা জায়গা সংক্রান্ত বিবাদ এড়াতে সাহায্য করে।",
    answerEn: "Without geotechnical soil testing, foundations can shift, causing severe cracks. A digital RTK land survey identifies exact property coordinates and levels, ensuring seamless space planning and preventing boundary disputes with neighboring plots."
  },
  {
    id: "faq-4",
    question: "আপনারা কি সম্পূর্ণ ভবন নির্মাণ কাজ (Construction) তদারকি বা সরাসরি করে দেন?",
    questionEn: "Do you handle complete construction works and building supervision?",
    answer: "হ্যাঁ! আমরা আর্কিটেকচারাল ও স্ট্রাকচারাল ডিজাইনের পাশাপাশি প্রফেশনাল সুপারভিশন বা সাইট তদারকি সেবা দিয়ে থাকি। এছাড়া অভিজ্ঞ সুপারভাইজার এবং কন্সট্রাকশন টিমের মাধ্যমে আমরা সম্পূর্ণ চুক্তিভিত্তিক (Contract Basis) ভবন নির্মাণ কাজ শতভাগ গুণগত মান বজায় রেখে করে থাকি।",
    answerEn: "Absolutely! Along with designing and structural blueprints, we provide experienced site engineers for regular supervision. We also undertake complete turnkey construction contracts with superior material sourcing and skilled building teams."
  }
];

export const initialTeam: TeamMember[] = [
  {
    id: "team-1",
    name: "ইঞ্জি: আমিনুল ইসলাম",
    nameEn: "Engr. Aminul Islam",
    designation: "প্রতিষ্ঠাতা ও প্রধান প্রকৌশলী (সিভিল)",
    designationEn: "Founder & Chief Structural Engineer",
    photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&h=200&q=80",
    socialFacebook: "#",
    socialLinkedin: "#"
  },
  {
    id: "team-2",
    name: "স্থপতি নুসরাত শারমিন",
    nameEn: "Arch. Nusrat Sharmin",
    designation: "প্রধান স্থপতি (আর্কিটেকচার)",
    designationEn: "Chief Architect (Aesthetic Design)",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80",
    socialFacebook: "#",
    socialLinkedin: "#"
  },
  {
    id: "team-3",
    name: "ইঞ্জি: মোঃ রাকিবুল হাসান",
    nameEn: "Engr. Md. Rakibul Hasan",
    designation: "সহকারী স্ট্রাকচারাল ইঞ্জিনিয়ার",
    designationEn: "Assistant Structural Engineer",
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&h=200&q=80",
    socialFacebook: "#",
    socialLinkedin: "#"
  }
];
