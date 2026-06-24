export interface Settings {
  companyName: string;
  companyNameEn: string;
  tagline: string;
  taglineEn: string;
  whatsappNumber: string;
  messengerLink: string;
  contactPhone: string;
  contactEmail: string;
  officeAddress: string;
  officeAddressEn: string;
  workingHours: string;
  workingHoursEn: string;
  primaryColor: string;
  secondaryColor: string;
  googleMapsEmbedUrl: string;
  facebookPixel: string;
  googleAnalyticsId: string;
  seoTitle: string;
  seoDescription: string;
  logoUrl?: string;
  faviconUrl?: string;
  adminUsername?: string;
  adminPassword?: string;
}

export interface Service {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  benefits: string[];
  benefitsEn: string[];
  iconName: string;
  imageUrl: string;
}

export interface Project {
  id: string;
  title: string;
  titleEn: string;
  category: string;
  categoryEn: string;
  description: string;
  descriptionEn: string;
  images: string[];
  area: string;
  budget: string;
  completionDate: string;
  clientName: string;
  location: string;
  locationEn: string;
  beforeImageUrl: string;
  afterImageUrl: string;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  title: string;
  titleEn: string;
  category: string;
}

export interface Testimonial {
  id: string;
  name: string;
  nameEn: string;
  designation: string;
  designationEn: string;
  review: string;
  reviewEn: string;
  rating: number;
  photoUrl: string;
}

export interface Blog {
  id: string;
  title: string;
  titleEn: string;
  category: string;
  categoryEn: string;
  content: string;
  contentEn: string;
  imageUrl: string;
  author: string;
  authorEn: string;
  date: string;
  tags: string[];
}

export interface FAQ {
  id: string;
  question: string;
  questionEn: string;
  answer: string;
  answerEn: string;
}

export interface TeamMember {
  id: string;
  name: string;
  nameEn: string;
  designation: string;
  designationEn: string;
  photoUrl: string;
  socialFacebook?: string;
  socialLinkedin?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read';
  createdAt: string;
}
