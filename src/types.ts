export interface CompanySettings {
  name: string;
  tagline: string;
  logoUrl?: string;
  faviconUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  phone: string;
  whatsapp: string;
  messenger: string;
  email: string;
  address: string;
  workingHours: string;
  googleMapUrl: string;
  facebookUrl?: string;
  linkedinUrl?: string;
  youtubeUrl?: string;
  newsletterCount: number;
}

export interface ServiceItem {
  id: string;
  titleBn: string;
  titleEn: string;
  descBn: string;
  descEn: string;
  iconName: string;
  image: string;
  benefitsBn: string[];
  benefitsEn: string[];
  category?: string;
  badgeBn?: string;
  badgeEn?: string;
}

export interface ProjectItem {
  id: string;
  titleBn: string;
  titleEn: string;
  category: "residential" | "commercial" | "duplex" | "interior" | "apartment";
  image: string;
  additionalImages?: string[];
  areaSft: number;
  budgetLakh: number;
  completionDate: string;
  clientNameBn: string;
  clientNameEn: string;
  locationBn: string;
  locationEn: string;
  descBn: string;
  descEn: string;
  beforeImage?: string;
  afterImage?: string;
}

export interface TestimonialItem {
  id: string;
  nameBn: string;
  nameEn: string;
  designationBn: string;
  designationEn: string;
  reviewBn: string;
  reviewEn: string;
  rating: number;
  image: string;
}

export interface BlogItem {
  id: string;
  titleBn: string;
  titleEn: string;
  contentBn: string;
  contentEn: string;
  category: "architecture" | "construction" | "engineering" | "tips";
  image: string;
  date: string;
  authorBn: string;
  authorEn: string;
}

export interface FaqItem {
  id: string;
  questionBn: string;
  questionEn: string;
  answerBn: string;
  answerEn: string;
}

export interface TeamMember {
  id: string;
  nameBn: string;
  nameEn: string;
  roleBn: string;
  roleEn: string;
  image: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: "unread" | "read";
}

export interface Statistics {
  projectsBn: string;
  projectsEn: string;
  clientsBn: string;
  clientsEn: string;
  engineersBn: string;
  engineersEn: string;
  experienceBn: string;
  experienceEn: string;
}

export interface AppData {
  settings: CompanySettings;
  services: ServiceItem[];
  projects: ProjectItem[];
  testimonials: TestimonialItem[];
  blogs: BlogItem[];
  faqs: FaqItem[];
  team: TeamMember[];
  stats: Statistics;
  messages: ContactMessage[];
}
