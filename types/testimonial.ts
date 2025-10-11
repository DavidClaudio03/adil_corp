export type Testimonial = Readonly<{
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
  // opcionales para crecer luego (avatar, logo, link, etc.)
  avatarSrc?: string;
  companyUrl?: string;
}>;
