export type BlogCategory = "Automotriz" | "Marketing Digital";

export type BlogPost = Readonly<{
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
  content?: string;
}>;