import type { MetadataRoute } from 'next';
import {
  getAllNews,
  getAllCategories,
  getAllPhotoAlbums,
  getAllAuthors,
} from '@/lib/data';
import { SITE_URL } from '@/lib/constants';

const STATIC_ROUTES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[] = [
  { path: '', changeFrequency: 'hourly', priority: 1 },
  { path: '/latest', changeFrequency: 'hourly', priority: 0.9 },
  { path: '/archive', changeFrequency: 'daily', priority: 0.7 },
  { path: '/search', changeFrequency: 'monthly', priority: 0.4 },
  { path: '/photo-gallery', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/video-gallery', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/about', changeFrequency: 'yearly', priority: 0.5 },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.5 },
  { path: '/advertisement', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/unicode-converter', changeFrequency: 'yearly', priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const newsEntries: MetadataRoute.Sitemap = getAllNews().map((n) => ({
    url: `${SITE_URL}/news/${n.slug}`,
    lastModified: new Date(n.updatedAt || n.publishedAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const categoryEntries: MetadataRoute.Sitemap = getAllCategories().map((c) => ({
    url: `${SITE_URL}/category/${c.slug}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.7,
  }));

  const albumEntries: MetadataRoute.Sitemap = getAllPhotoAlbums().map((a) => ({
    url: `${SITE_URL}/photo-gallery/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const authorEntries: MetadataRoute.Sitemap = getAllAuthors().map((a) => ({
    url: `${SITE_URL}/author/${a.id}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.5,
  }));

  return [
    ...staticEntries,
    ...newsEntries,
    ...categoryEntries,
    ...albumEntries,
    ...authorEntries,
  ];
}
