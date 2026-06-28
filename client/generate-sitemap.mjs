import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

// Read all routes from App.tsx
const appContent = readFileSync(resolve('src/App.tsx'), 'utf-8');
const pathMatches = appContent.match(/path="([^"]+)"/g) || [];

const today = new Date().toISOString().split('T')[0];
const base = 'https://misyarmatch.net';

const skip = ['*', ':id', ':slug', ':userId', ':sessionId', ':matchId', '/404', '/admin', '/auth', '/callback', '/profile/edit', '/settings', '/messages', '/matches', '/notifications', '/speed-chat', '/welcome'];

const paths = [...new Set(
  pathMatches
    .map(m => m.replace('path="', '').replace('"', ''))
    .filter(p => !skip.some(s => p.includes(s)))
)].sort();

const priorities = {
  '/': '1.0',
  '/blog': '0.9',
  '/nikah-guide': '0.9',
  '/what-is-misyar': '0.8',
  '/pricing': '0.7',
};

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${base}/</loc>
    <lastmod>${today}</lastmod>
    <priority>1.0</priority>
  </url>
${paths.filter(p => p !== '/').map(p => `  <url>
    <loc>${base}${p}</loc>
    <lastmod>${today}</lastmod>
    <priority>${priorities[p] || (p.startsWith('/blog/') ? '0.8' : '0.7')}</priority>
  </url>`).join('\n')}
</urlset>`;

writeFileSync(resolve('public/sitemap.xml'), xml);
console.log(`✅ Sitemap generated: ${paths.length + 1} URLs (${today})`);
