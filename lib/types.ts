export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  featuredImage: string;
  categoryId: string;
  authorId: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  isFeatured: boolean;
  isBreaking: boolean;
  viewCount: number;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  description: string;
  color: string;
  subcategories: Subcategory[];
  order: number;
}

export interface Subcategory {
  id: string;
  slug: string;
  name: string;
}

export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  role: string;
}

export interface PaginatedResult<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
}

export interface SearchParams {
  q?: string;
  category?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: string;
}

export interface PhotoAlbum {
  id: string;
  slug: string;
  title: string;
  coverImage: string;
  images: { url: string; caption?: string }[];
  publishedAt: string;
}

export interface VideoPost {
  id: string;
  title: string;
  youtubeId: string;
  thumbnail: string;
  publishedAt: string;
  duration?: string;
}
