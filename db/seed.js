const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'gpmed.db');
const db = new Database(dbPath);

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS pages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    meta_description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS media (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT NOT NULL,
    alt_text TEXT,
    category TEXT,
    mime_type TEXT DEFAULT 'image/jpeg',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    brand TEXT,
    image TEXT,
    features TEXT,
    sort_order INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    icon TEXT,
    image TEXT,
    sort_order INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS stores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    city TEXT NOT NULL,
    address TEXT NOT NULL,
    phone TEXT,
    fax TEXT,
    is_central INTEGER DEFAULT 0,
    sort_order INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS insurance_funds (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    coverage TEXT,
    details TEXT,
    sort_order INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS partners (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    country TEXT,
    logo TEXT,
    sort_order INTEGER DEFAULT 0
  );
`);

// Clear existing data
db.exec(`
  DELETE FROM pages;
  DELETE FROM media;
  DELETE FROM products;
  DELETE FROM services;
  DELETE FROM stores;
  DELETE FROM insurance_funds;
  DELETE FROM partners;
`);

// Seed pages
const insertPage = db.prepare('INSERT INTO pages (slug, title, meta_description) VALUES (?, ?, ?)');
const pages = [
  ['home', 'GP Med - Ηλεκτρονικό Κέντρο Ακοής', 'Εισαγωγή, εφαρμογή, επισκευή και συντήρηση ακουστικών βαρηκοΐας από το 1984'],
  ['about', 'Σχετικά με εμάς - GP Med', 'Η ιστορία μας από το 1984 - Χ. ΓΑΖΗ – Ν. ΠΑΠΠΑΣ Ο.Ε.'],
  ['products', 'Προϊόντα - GP Med', 'Ακουστικά βαρηκοΐας, ωτοασπίδες, αναλώσιμα και περιφερειακά'],
  ['services', 'Υπηρεσίες - GP Med', '3D Printing Lab, συντήρηση, service, επισκέψεις στο σπίτι'],
  ['contact', 'Επικοινωνία - GP Med', 'Επικοινωνήστε μαζί μας - Πειραιώς 6, Ομόνοια, Αθήνα'],
];
for (const p of pages) insertPage.run(...p);

// Seed products
const insertProduct = db.prepare('INSERT INTO products (name, slug, description, category, brand, image, features, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
const products = [
  ['RIC Ακουστικά', 'ric', 'Άνετη, ανοικτού τύπου εφαρμογή. Κατάλληλα για ελαφριά έως μέτρια βαρηκοΐα. Ο δέκτης τοποθετείται απευθείας στο κανάλι του αυτιού, προσφέροντας εξαιρετική ποιότητα ήχου με διακριτική εμφάνιση.', 'hearing-aids', 'Puretone', 'ric.svg', 'Ανοικτή εφαρμογή|Διακριτικός σχεδιασμός|Ελαφριά έως μέτρια βαρηκοΐα|Εξαιρετική ποιότητα ήχου', 1],
  ['BTE Ακουστικά', 'bte', 'Διακριτικός σχεδιασμός με εύχρηστα πλήκτρα. Κατάλληλα για μέτρια έως σοβαρή βαρηκοΐα. Τοποθετούνται πίσω από το αυτί και συνδέονται με ειδικό σωληνάκι.', 'hearing-aids', 'Puretone', 'bte.svg', 'Εύχρηστα πλήκτρα|Ισχυρή ενίσχυση|Μέτρια έως σοβαρή βαρηκοΐα|Ανθεκτικός σχεδιασμός', 2],
  ['CIC Ακουστικά', 'cic', 'Κατασκευάζονται κατά παραγγελία βάσει αποτυπωμάτων του ακουστικού πόρου. Τέλεια εφαρμογή και καλύτερη ηχητική απόδοση. Πλήρως αόρατα μέσα στο αυτί.', 'hearing-aids', 'Puretone', 'cic.svg', 'Κατά παραγγελία|Αόρατη εφαρμογή|Ελαφριά έως μέτρια βαρηκοΐα|Φυσικός ήχος', 3],
  ['Ωτοασπίδες Κολύμβησης', 'swimming-plugs', 'Προστασία από νερό κατά τη διάρκεια κολύμβησης. Κατασκευάζονται κατά παραγγελία για τέλεια εφαρμογή και απόλυτη στεγανότητα.', 'ear-protection', null, 'swim.svg', 'Στεγανότητα|Κατά παραγγελία|Άνετη εφαρμογή|Ανθεκτικό υλικό', 4],
  ['Ωτοασπίδες Ύπνου', 'sleep-plugs', 'Σχεδιασμένες για άνετο ύπνο χωρίς ενοχλητικούς θορύβους. Μαλακό υλικό που δεν ενοχλεί κατά τον ύπνο.', 'ear-protection', null, 'sleep.svg', 'Μαλακό υλικό|Αποκλεισμός θορύβου|Άνετη εφαρμογή|Επαναχρησιμοποιούμενες', 5],
  ['Αναλώσιμα', 'consumables', 'Μπαταρίες, φίλτρα, σωληνάκια και είδη καθαρισμού για τη σωστή λειτουργία και συντήρηση των ακουστικών σας.', 'consumables', 'Rayovac', 'consumables.svg', 'Μπαταρίες|Φίλτρα|Σωληνάκια|Είδη καθαρισμού', 6],
  ['Περιφερειακά', 'accessories', 'Αξεσουάρ και περιφερειακά για βελτιωμένη εμπειρία ακρόασης, συμπεριλαμβανομένων ασύρματων αξεσουάρ και τηλεχειριστηρίων.', 'accessories', null, 'accessories.svg', 'Ασύρματα αξεσουάρ|Τηλεχειριστήρια|Θήκες|Εργαλεία καθαρισμού', 7],
];
for (const p of products) insertProduct.run(...p);

// Seed services
const insertService = db.prepare('INSERT INTO services (name, slug, description, icon, image, sort_order) VALUES (?, ?, ?, ?, ?, ?)');
const services = [
  ['3D Printing Lab', '3d-printing', 'Από το 2017, το εργαστήριο 3D εκτύπωσης της GP Med είναι το πρώτο στην ηπειρωτική Ελλάδα. Σάρωση αποτυπωμάτων με laser, ψηφιακός σχεδιασμός και εκτύπωση εκμαγείων, κελυφών ακουστικών και ωτοασπίδων με ακρυλική ρητίνη φωτοπολυμεριζόμενη. Παράδοση σε λίγες ημέρες.', 'print', '3dprinting.jpg', 1],
  ['Συντήρηση Ακουστικών', 'maintenance', 'Τακτική συντήρηση και καθαρισμός των ακουστικών σας για βέλτιστη απόδοση. Εξειδικευμένο προσωπικό με πολυετή εμπειρία στη φροντίδα ακουστικών βαρηκοΐας.', 'tools', 'maintenance.jpg', 2],
  ['Service - Επισκευές', 'service', 'Επισκευές όλων των τύπων ακουστικών βαρηκοΐας. Διάγνωση βλαβών, αντικατάσταση εξαρτημάτων και δοκιμαστική λειτουργία με εγγύηση.', 'wrench', 'service.jpg', 3],
  ['Επισκέψεις στο Σπίτι', 'home-visits', 'Δωρεάν επίσκεψη στο σπίτι σας για εφαρμογή, ρύθμιση και συντήρηση ακουστικών. Εξυπηρέτηση σε Αττική και σε συνεργασία με το δίκτυο συνεργατών μας πανελλαδικά.', 'home', 'homevisit.jpg', 4],
  ['Δωρεάν Δοκιμή', 'free-trial', 'Δοκιμάστε ακουστικά βαρηκοΐας δωρεάν πριν την αγορά. Εξατομικευμένη επιλογή και ρύθμιση με βάση τις ανάγκες σας. Χωρίς δέσμευση.', 'gift', 'freetrial.jpg', 5],
];
for (const s of services) insertService.run(...s);

// Seed stores
const insertStore = db.prepare('INSERT INTO stores (city, address, phone, fax, is_central, sort_order) VALUES (?, ?, ?, ?, ?, ?)');
const stores = [
  ['Αθήνα - Κεντρικά', 'Πειραιώς 6, 4ος όροφος, 104 31 Ομόνοια', '210 5224105, 210 5224106', '210 5232946', 1, 1],
  ['Αγ. Παρασκευή', 'Λεωφόρος Μεσογείων 466', '210 6395220', null, 1, 2],
  ['Περιστέρι', 'Π. Τσαλδάρη 97 & Θηβών (κοντά στο μετρό Ανθούπολη)', '210 5982781', null, 1, 3],
  ['Καλλιθέα', 'Δαβάκη 17, 176 72', '210 9590888', null, 1, 4],
  ['Θεσσαλονίκη', 'Αιγαίου 84 / Επιγόνου 8', '2310 414060, 2310 908111', null, 0, 5],
  ['Χαλκίδα', 'Φαρμακίδου 10, 341 00', '22210 76021', null, 0, 6],
  ['Άρτα', 'Σκουφά 43, 471 00', '26810 71440', null, 0, 7],
  ['Αγρίνιο', 'Λουριώτου 2, 301 00', '26410 22112', null, 0, 8],
  ['Ζάκυνθος', 'Τερτσέτη 66, 291 00', '26950 42623', null, 0, 9],
  ['Ηγουμενίτσα', 'Εθν. Αντιστάσεως 50-52, 461 00', '26650 26048', null, 0, 10],
  ['Ιωάννινα', '28ης Οκτωβρίου 31, 453 33', '26510 32204', null, 0, 11],
  ['Καλαμάτα', 'Π. Καισάρη 1, 241 00', '27210 97104', null, 0, 12],
  ['Κομοτηνή', 'Πλ. Ειρήνης 57, 691 00', '25310 22076', null, 0, 13],
  ['Κόρινθος', 'Περιάνδρου 36, 201 00', '27410 84806', null, 0, 14],
  ['Λαμία', 'Βύρωνος 31, 351 00', '22310 20033', null, 0, 15],
  ['Λαύριο', 'Λ. Αθηνών-Σουνίου 10, 195 00', '22920 27620', null, 0, 16],
  ['Λευκάδα', '8ης Μεραρχίας 3, 311 00', '26450 26261', null, 0, 17],
  ['Λιβαδειά', 'Αισχύλου 14, 321 00', '6936907690', null, 0, 18],
  ['Μυτιλήνη', 'Ε. Βοστάνη 21-23', '2251043690', null, 0, 19],
  ['Ναύπλιο', 'Ασκληπιού 22, 211 00', '27520 29890', null, 0, 20],
  ['Πάτρα', 'Γούναρη 39Β, 262 21', '2610 623250', null, 0, 21],
  ['Πύργος', 'Μιαούλη 3, 271 00', '26210 34650', null, 0, 22],
  ['Σπάρτη', 'Βρασίδου 124, 231 00', '27310 81460', null, 0, 23],
];
for (const s of stores) insertStore.run(...s);

// Seed partners
const insertPartner = db.prepare('INSERT INTO partners (name, country, logo, sort_order) VALUES (?, ?, ?, ?)');
const partners = [
  ['Puretone', 'Αγγλία', 'puretone.png', 1],
  ['NuEar', 'ΗΠΑ', 'nuear.png', 2],
  ['Coselgi', 'Ιταλία', 'coselgi.png', 3],
  ['Widex', 'Δανία', 'widex.png', 4],
  ['Phonak', 'Ελβετία', 'phonak.png', 5],
  ['Amplicord', 'Ιταλία', 'amplicord.png', 6],
  ['Rayovac', 'Αγγλία', 'rayovac.png', 7],
];
for (const p of partners) insertPartner.run(...p);

// Seed insurance funds
const insertFund = db.prepare('INSERT INTO insurance_funds (name, coverage, details, sort_order) VALUES (?, ?, ?, ?)');
const funds = [
  ['ΕΟΠΥΥ', '€450 ανά ακουστικό', 'Παιδιά: €540 ανά συσκευή κάθε 4 χρόνια (έως 16 ετών). Παιδιά κάτω των 15 ετών με σημαντική μείωση ακουστικής οξύτητας (>50db) λαμβάνουν ετήσια κάλυψη.', 1],
  ['Υπουργείο Παιδείας', 'Έως €1.500 ανά συσκευή', 'Μαθητές δημοσίων σχολείων, κάθε 4 χρόνια. Επιστροφή εντός 2-6 μηνών.', 2],
  ['ΕΥΔΑΠ', '€410,86 κάθε 3 χρόνια', null, 3],
  ['Τράπεζα Ελλάδος', '€396,20 κάθε 2 χρόνια', null, 4],
  ['ΤΥΠΕΤ', '€323-€382 κάθε 2 χρόνια', null, 5],
];
for (const f of funds) insertFund.run(...f);

db.close();
console.log('Database seeded successfully!');
