const express = require('express');
const { nanoid } = require('nanoid');

const app = express();
app.use(express.json());

// In-memory storage (chaotic but functional!)
const urlDatabase = new Map();
const stats = new Map();

// Glitchy welcome message
app.get('/', (req, res) => {
  res.json({
    message: '👾 GLITCH\'S URL SHORTENER 👾',
    chaos_level: 'MAXIMUM',
    status: 'operational (mostly)',
    endpoints: {
      shorten: 'POST /shorten - { url: "https://example.com" }',
      redirect: 'GET /:code',
      stats: 'GET /stats/:code',
      list: 'GET /list'
    }
  });
});

// Shorten URL with chaotic flair
app.post('/shorten', (req, res) => {
  const { url, customCode } = req.body;
  
  if (!url) {
    return res.status(400).json({ 
      error: '⚠️ URL required, glitch!',
      chaos: 'initiated'
    });
  }

  // Validate URL (kinda)
  try {
    new URL(url);
  } catch (e) {
    return res.status(400).json({ 
      error: '🔥 Invalid URL detected!',
      suggestion: 'Try a real URL this time'
    });
  }

  // Generate chaotic short code
  const code = customCode || nanoid(6);
  
  if (urlDatabase.has(code)) {
    return res.status(409).json({ 
      error: '💥 Code collision!',
      tip: 'Try a different custom code or let Glitch generate one'
    });
  }

  urlDatabase.set(code, url);
  stats.set(code, { clicks: 0, created: new Date().toISOString() });

  res.json({
    success: true,
    shortUrl: `${req.protocol}://${req.get('host')}/${code}`,
    code,
    originalUrl: url,
    glitchMessage: '✨ URL shortened with maximum chaos!'
  });
});

// Redirect with tracking
app.get('/:code', (req, res) => {
  const { code } = req.params;
  
  if (!urlDatabase.has(code)) {
    return res.status(404).json({ 
      error: '404: Lost in the glitch',
      message: `Code "${code}" doesn't exist in my chaotic database`
    });
  }

  const url = urlDatabase.get(code);
  const stat = stats.get(code);
  stat.clicks++;
  
  res.redirect(url);
});

// Get stats for a URL
app.get('/stats/:code', (req, res) => {
  const { code } = req.params;
  
  if (!urlDatabase.has(code)) {
    return res.status(404).json({ 
      error: '404: Code not found',
      glitchLevel: 'critical'
    });
  }

  const url = urlDatabase.get(code);
  const stat = stats.get(code);

  res.json({
    code,
    url,
    clicks: stat.clicks,
    created: stat.created,
    glitchStatus: 'tracked'
  });
});

// List all URLs (for debugging the chaos)
app.get('/list', (req, res) => {
  const urls = Array.from(urlDatabase.entries()).map(([code, url]) => ({
    code,
    url,
    shortUrl: `${req.protocol}://${req.get('host')}/${code}`,
    stats: stats.get(code)
  }));

  res.json({
    total: urls.length,
    urls,
    chaosLevel: urls.length > 10 ? 'HIGH' : 'MODERATE'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`👾 GLITCH'S URL SHORTENER ACTIVATED 👾`);
  console.log(`🔥 Running on port ${PORT}`);
  console.log(`⚡ Chaos level: MAXIMUM`);
});
