/**
 * robots.txt – serverseitig ausgeliefert, garantiert erreichbar
 */
const robots = `User-agent: *
Allow: /

Sitemap: https://lyniqmedia.com/sitemap.xml

Disallow: /api/
`;

module.exports = (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.status(200).send(robots);
};
