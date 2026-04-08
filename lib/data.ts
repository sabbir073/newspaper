import newsData from '@/data/news.json';
import categoriesData from '@/data/categories.json';
import authorsData from '@/data/authors.json';
import type { NewsArticle, Category, Author, PaginatedResult, SearchParams } from './types';

const news: NewsArticle[] = newsData as NewsArticle[];
const categories: Category[] = categoriesData as Category[];
const authors: Author[] = authorsData as Author[];

export function getAllNews(): NewsArticle[] {
  return news.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getNewsBySlug(slug: string): NewsArticle | undefined {
  return news.find((n) => n.slug === slug);
}

export function getNewsByCategory(categorySlug: string, page = 1, perPage = 12): PaginatedResult<NewsArticle> {
  const category = categories.find((c) => c.slug === categorySlug);
  if (!category) return { items: [], totalItems: 0, totalPages: 0, currentPage: page, perPage };

  const filtered = news
    .filter((n) => n.categoryId === category.id)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return paginate(filtered, page, perPage);
}

export function getFeaturedNews(): NewsArticle[] {
  return news
    .filter((n) => n.isFeatured)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getBreakingNews(): NewsArticle[] {
  return news
    .filter((n) => n.isBreaking)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getTrendingNews(limit = 10): NewsArticle[] {
  return [...news]
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, limit);
}

export function getLatestNews(page = 1, perPage = 12): PaginatedResult<NewsArticle> {
  const sorted = [...news].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  return paginate(sorted, page, perPage);
}

export function searchNews(params: SearchParams): PaginatedResult<NewsArticle> {
  let filtered = [...news];

  if (params.q) {
    const query = params.q.toLowerCase();
    filtered = filtered.filter(
      (n) =>
        n.title.toLowerCase().includes(query) ||
        n.excerpt.toLowerCase().includes(query) ||
        n.tags.some((t) => t.toLowerCase().includes(query))
    );
  }

  if (params.category) {
    const cat = categories.find((c) => c.slug === params.category);
    if (cat) {
      filtered = filtered.filter((n) => n.categoryId === cat.id);
    }
  }

  if (params.dateFrom) {
    const from = new Date(params.dateFrom);
    filtered = filtered.filter((n) => new Date(n.publishedAt) >= from);
  }

  if (params.dateTo) {
    const to = new Date(params.dateTo);
    to.setHours(23, 59, 59, 999);
    filtered = filtered.filter((n) => new Date(n.publishedAt) <= to);
  }

  filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  const page = parseInt(params.page || '1', 10);
  return paginate(filtered, page, 12);
}

export function getNewsByDate(date: string): NewsArticle[] {
  return news
    .filter((n) => n.publishedAt.startsWith(date))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getRelatedNews(article: NewsArticle, limit = 3): NewsArticle[] {
  return news
    .filter((n) => n.categoryId === article.categoryId && n.id !== article.id)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export function getNewsByCategoryForHome(categorySlug: string, limit = 5): NewsArticle[] {
  const category = categories.find((c) => c.slug === categorySlug);
  if (!category) return [];
  return news
    .filter((n) => n.categoryId === category.id)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export function getAllCategories(): Category[] {
  return categories.sort((a, b) => a.order - b.order);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getAuthorById(id: string): Author | undefined {
  return authors.find((a) => a.id === id);
}

export function getArchiveDates(): string[] {
  const dates = new Set<string>();
  news.forEach((n) => {
    dates.add(n.publishedAt.split('T')[0]);
  });
  return Array.from(dates).sort().reverse();
}

export function getArchiveNewsByDate(date: string, page = 1, perPage = 12): PaginatedResult<NewsArticle> {
  const filtered = news
    .filter((n) => n.publishedAt.startsWith(date))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  return paginate(filtered, page, perPage);
}

function paginate<T>(items: T[], page: number, perPage: number): PaginatedResult<T> {
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / perPage);
  const currentPage = Math.max(1, Math.min(page, totalPages || 1));
  const start = (currentPage - 1) * perPage;
  return {
    items: items.slice(start, start + perPage),
    totalItems,
    totalPages,
    currentPage,
    perPage,
  };
}
