module.exports = (req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.status(410).send('Gone');
};
