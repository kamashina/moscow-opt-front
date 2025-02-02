export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_CLIENT_DOMAIN || "https://site.com";

  const staticPages = [`${baseUrl}/`, `${baseUrl}/catalog`, `${baseUrl}/about`];

  const urls = [...staticPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.map((url) => `<url><loc>${url}</loc></url>`).join("")}
    </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
