const express = require('express');
const path = require('path');
const data = require('./db/data');

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
  const products = data.getProductsByCategory('hearing-aids');
  const services = data.getAllServices();
  const partners = data.getAllPartners();
  const storeCount = data.getStoreCount();
  res.render('home', { products, services, partners, storeCount });
});

// About
app.get('/about', (req, res) => {
  const partners = data.getAllPartners();
  res.render('about', { partners });
});

// Products
app.get('/products', (req, res) => {
  const hearingAids = data.getProductsByCategory('hearing-aids');
  const earProtection = data.getProductsByCategory('ear-protection');
  const consumables = data.getProductsByCategory('consumables');
  const accessories = data.getProductsByCategory('accessories');
  res.render('products', { hearingAids, earProtection, consumables, accessories });
});

// Services
app.get('/services', (req, res) => {
  const services = data.getAllServices();
  res.render('services', { services });
});

// Contact
app.get('/contact', (req, res) => {
  const centralStores = data.getCentralStores();
  const partnerStores = data.getPartnerStores();
  const funds = data.getAllFunds();
  res.render('contact', { centralStores, partnerStores, funds, messageSent: false });
});

// Contact form submission
app.post('/contact', (req, res) => {
  const centralStores = data.getCentralStores();
  const partnerStores = data.getPartnerStores();
  const funds = data.getAllFunds();
  res.render('contact', { centralStores, partnerStores, funds, messageSent: true });
});

// 404
app.use((req, res) => {
  res.status(404).render('404');
});

// Local development
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`GP Med server running at http://localhost:${PORT}`);
  });
}

// Export for Vercel serverless
module.exports = app;
