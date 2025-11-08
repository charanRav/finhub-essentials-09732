import { blogPosts } from '@/data/blogPosts';

const SITE_URL = 'https://allfincal.vercel.app';

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

// Static pages configuration
const staticPages: SitemapUrl[] = [
  {
    loc: `${SITE_URL}/`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 1.0,
  },
  {
    loc: `${SITE_URL}/about`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    loc: `${SITE_URL}/blog`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 0.9,
  },
  {
    loc: `${SITE_URL}/contact`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    loc: `${SITE_URL}/privacy`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'yearly',
    priority: 0.5,
  },
  {
    loc: `${SITE_URL}/terms`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'yearly',
    priority: 0.5,
  },
];

// Generate blog post URLs from blogPosts data
const generateBlogUrls = (): SitemapUrl[] => {
  return blogPosts.map((post) => ({
    loc: `${SITE_URL}/blog/${post.slug}`,
    lastmod: post.date,
    changefreq: 'monthly' as const,
    priority: post.featured ? 0.85 : 0.8,
  }));
};

// Generate complete sitemap XML
export const generateSitemapXML = (): string => {
  const allUrls = [...staticPages, ...generateBlogUrls()];

  const urlEntries = allUrls
    .map(
      (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
};

// Get sitemap data as JSON (useful for debugging/display)
export const getSitemapData = () => {
  return {
    staticPages: staticPages.length,
    blogPosts: blogPosts.length,
    totalUrls: staticPages.length + blogPosts.length,
    lastGenerated: new Date().toISOString(),
    urls: [...staticPages, ...generateBlogUrls()],
  };
};

// Download sitemap as file (for manual updates)
export const downloadSitemap = () => {
  const xml = generateSitemapXML();
  const blob = new Blob([xml], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'sitemap.xml';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
