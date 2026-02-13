const express = require('express');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Body parser for contact form
app.use(express.urlencoded({ extended: true }));

// Common data for all views
app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

// --- ROUTES ---

// Home
app.get('/', (req, res) => {
  const products = db.prepare('SELECT * FROM products WHERE category = ? ORDER BY sort_order').all('hearing-aids');
  const services = db.prepare('SELECT * FROM services ORDER BY sort_order').all();
  const partners = db.prepare('SELECT * FROM partners ORDER BY sort_order').all();
  const storeCount = db.prepare('SELECT COUNT(*) as count FROM stores').get().count;
  res.render('home', { products, services, partners, storeCount });
});

// About
app.get('/about', (req, res) => {
  const partners = db.prepare('SELECT * FROM partners ORDER BY sort_order').all();
  res.render('about', { partners });
});

// Products
app.get('/products', (req, res) => {
  const hearingAids = db.prepare('SELECT * FROM products WHERE category = ? ORDER BY sort_order').all('hearing-aids');
  const earProtection = db.prepare('SELECT * FROM products WHERE category = ? ORDER BY sort_order').all('ear-protection');
  const consumables = db.prepare('SELECT * FROM products WHERE category = ? ORDER BY sort_order').all('consumables');
  const accessories = db.prepare('SELECT * FROM products WHERE category = ? ORDER BY sort_order').all('accessories');
  res.render('products', { hearingAids, earProtection, consumables, accessories });
});

// Services
app.get('/services', (req, res) => {
  const services = db.prepare('SELECT * FROM services ORDER BY sort_order').all();
  res.render('services', { services });
});

// Contact
app.get('/contact', (req, res) => {
  const centralStores = db.prepare('SELECT * FROM stores WHERE is_central = 1 ORDER BY sort_order').all();
  const partnerStores = db.prepare('SELECT * FROM stores WHERE is_central = 0 ORDER BY sort_order').all();
  const funds = db.prepare('SELECT * FROM insurance_funds ORDER BY sort_order').all();
  res.render('contact', { centralStores, partnerStores, funds, messageSent: false });
});

// Contact form submission
app.post('/contact', (req, res) => {
  const centralStores = db.prepare('SELECT * FROM stores WHERE is_central = 1 ORDER BY sort_order').all();
  const partnerStores = db.prepare('SELECT * FROM stores WHERE is_central = 0 ORDER BY sort_order').all();
  const funds = db.prepare('SELECT * FROM insurance_funds ORDER BY sort_order').all();
  res.render('contact', { centralStores, partnerStores, funds, messageSent: true });
});

// 404
app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(PORT, () => {
  console.log(`GP Med server running at http://localhost:${PORT}`);
});
