/**
 * Vercel Serverless Function: Returns 410 Gone for legacy WordPress paths.
 * Used for /author/* and /category/* (SEO: signal that these URLs are permanently gone).
 */
module.exports = (req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.status(410).end();
};
