// Ping Google Indexing API when new content is published
// This gets new pages indexed within hours instead of weeks

export async function pingGoogleIndexing(urls: string[]) {
  // Google Indexing API endpoint
  // Requires a service account - for now we use the free Search Console ping
  const sitemapUrl = "https://misyarmatch.net/sitemap.xml";
  
  try {
    // Ping Google to re-crawl sitemap
    const googlePing = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
    const response = await fetch(googlePing);
    console.log(`[SEO] Google sitemap ping: ${response.status}`);
    
    // Also ping Bing
    const bingPing = `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
    await fetch(bingPing);
    console.log(`[SEO] Bing sitemap ping sent`);
    
    return true;
  } catch (err) {
    console.error("[SEO] Ping failed:", err);
    return false;
  }
}

// Auto-ping on server start (tells Google we have fresh content)
export async function pingOnStartup() {
  console.log("[SEO] Pinging search engines...");
  await pingGoogleIndexing(["https://misyarmatch.net/sitemap.xml"]);
}
