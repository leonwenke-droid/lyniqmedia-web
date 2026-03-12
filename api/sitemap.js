/**
 * sitemap.xml – serverseitig ausgeliefert, garantiert erreichbar
 */
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://lyniqmedia.com/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>https://lyniqmedia.com/services</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://lyniqmedia.com/ablauf</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://lyniqmedia.com/ergebnisse</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://lyniqmedia.com/ueber-uns</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://lyniqmedia.com/kontakt</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>https://lyniqmedia.com/blog</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>
  <url><loc>https://lyniqmedia.com/karriere</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://lyniqmedia.com/visitenkarte</loc><changefreq>yearly</changefreq><priority>0.5</priority></url>
  <url><loc>https://lyniqmedia.com/impressum</loc><changefreq>yearly</changefreq><priority>0.4</priority></url>
  <url><loc>https://lyniqmedia.com/datenschutz</loc><changefreq>yearly</changefreq><priority>0.4</priority></url>
  <url><loc>https://lyniqmedia.com/agb</loc><changefreq>yearly</changefreq><priority>0.4</priority></url>
  <url><loc>https://lyniqmedia.com/leistung-telefon-assistent</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://lyniqmedia.com/leistung-whatsapp-chat</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://lyniqmedia.com/leistung-workflow-automation</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://lyniqmedia.com/leistung-ki-integration</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://lyniqmedia.com/leistung-ki-inhaltserstellung</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://lyniqmedia.com/leistung-praediktive-analyse</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
</urlset>
`;

module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.status(200).send(sitemap);
};
