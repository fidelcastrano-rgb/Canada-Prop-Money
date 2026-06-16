import { MetadataRoute } from 'next';
import { PRODUCTS, BLOG_POSTS } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://canadianpropmoney.org';

  // Base static entries
  const staticRoutes = [
    '',
    '/about',
    '/products',
    '/blog',
    '/faq',
    '/contact',
    '/privacy',
    '/terms',
    '/track-order',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic products entries
  const productRoutes = PRODUCTS.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Dynamic blog entries
  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
