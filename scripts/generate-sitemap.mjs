import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://djstylehub.com';
const TODAY = new Date().toISOString().split('T')[0];

// Read src/data/products.ts to extract product slugs dynamically
const productsFilePath = path.join(__dirname, '..', 'src', 'data', 'products.ts');
const productsContent = fs.readFileSync(productsFilePath, 'utf-8');

// Regex to extract all slugs from PRODUCTS
const slugMatches = [...productsContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g)];
const productSlugs = [...new Set(slugMatches.map(m => m[1]))];

console.log(`Found ${productSlugs.length} product slugs for sitemap generation.`);

const staticRoutes = [
  { url: '/', changefreq: 'daily', priority: '1.0' },
  { url: '/category/women', changefreq: 'weekly', priority: '0.9' },
  { url: '/category/kids', changefreq: 'weekly', priority: '0.9' },
  { url: '/fabric-guide', changefreq: 'monthly', priority: '0.7' },
  { url: '/about', changefreq: 'monthly', priority: '0.7' },
  { url: '/contact', changefreq: 'monthly', priority: '0.7' }
];

const productRoutes = productSlugs.map(slug => ({
  url: `/product/${slug}`,
  changefreq: 'weekly',
  priority: '0.8'
}));

const allRoutes = [...staticRoutes, ...productRoutes];

const xmlEntries = allRoutes.map(route => `  <url>
    <loc>${BASE_URL}${route.url}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n');

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>
`;

const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf-8');
console.log(`Successfully generated public/sitemap.xml with ${allRoutes.length} URLs.`);

// Also write to dist if it exists
const distDir = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distDir)) {
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  console.log(`Successfully synced sitemap.xml to dist/sitemap.xml.`);
}
