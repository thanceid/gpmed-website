// Static data module — works on serverless (Vercel) without native SQLite
const products = [
  { id: 1, name: 'RIC Ακουστικά', slug: 'ric', description: 'Άνετη, ανοικτού τύπου εφαρμογή. Κατάλληλα για ελαφριά έως μέτρια βαρηκοΐα. Ο δέκτης τοποθετείται απευθείας στο κανάλι του αυτιού, προσφέροντας εξαιρετική ποιότητα ήχου με διακριτική εμφάνιση.', category: 'hearing-aids', brand: 'Puretone', image: 'ric.svg', features: 'Ανοικτή εφαρμογή|Διακριτικός σχεδιασμός|Ελαφριά έως μέτρια βαρηκοΐα|Εξαιρετική ποιότητα ήχου', sort_order: 1 },
  { id: 2, name: 'BTE Ακουστικά', slug: 'bte', description: 'Διακριτικός σχεδιασμός με εύχρηστα πλήκτρα. Κατάλληλα για μέτρια έως σοβαρή βαρηκοΐα. Τοποθετούνται πίσω από το αυτί και συνδέονται με ειδικό σωληνάκι.', category: 'hearing-aids', brand: 'Puretone', image: 'bte.svg', features: 'Εύχρηστα πλήκτρα|Ισχυρή ενίσχυση|Μέτρια έως σοβαρή βαρηκοΐα|Ανθεκτικός σχεδιασμός', sort_order: 2 },
  { id: 3, name: 'CIC Ακουστικά', slug: 'cic', description: 'Κατασκευάζονται κατά παραγγελία βάσει αποτυπωμάτων του ακουστικού πόρου. Τέλεια εφαρμογή και καλύτερη ηχητική απόδοση. Πλήρως αόρατα μέσα στο αυτί.', category: 'hearing-aids', brand: 'Puretone', image: 'cic.svg', features: 'Κατά παραγγελία|Αόρατη εφαρμογή|Ελαφριά έως μέτρια βαρηκοΐα|Φυσικός ήχος', sort_order: 3 },
  { id: 4, name: 'Ωτοασπίδες Κολύμβησης', slug: 'swimming-plugs', description: 'Προστασία από νερό κατά τη διάρκεια κολύμβησης. Κατασκευάζονται κατά παραγγελία για τέλεια εφαρμογή και απόλυτη στεγανότητα.', category: 'ear-protection', brand: null, image: 'swim.svg', features: 'Στεγανότητα|Κατά παραγγελία|Άνετη εφαρμογή|Ανθεκτικό υλικό', sort_order: 4 },
  { id: 5, name: 'Ωτοασπίδες Ύπνου', slug: 'sleep-plugs', description: 'Σχεδιασμένες για άνετο ύπνο χωρίς ενοχλητικούς θορύβους. Μαλακό υλικό που δεν ενοχλεί κατά τον ύπνο.', category: 'ear-protection', brand: null, image: 'sleep.svg', features: 'Μαλακό υλικό|Αποκλεισμός θορύβου|Άνετη εφαρμογή|Επαναχρησιμοποιούμενες', sort_order: 5 },
  { id: 6, name: 'Αναλώσιμα', slug: 'consumables', description: 'Μπαταρίες, φίλτρα, σωληνάκια και είδη καθαρισμού για τη σωστή λειτουργία και συντήρηση των ακουστικών σας.', category: 'consumables', brand: 'Rayovac', image: 'consumables.svg', features: 'Μπαταρίες|Φίλτρα|Σωληνάκια|Είδη καθαρισμού', sort_order: 6 },
  { id: 7, name: 'Περιφερειακά', slug: 'accessories', description: 'Αξεσουάρ και περιφερειακά για βελτιωμένη εμπειρία ακρόασης, συμπεριλαμβανομένων ασύρματων αξεσουάρ και τηλεχειριστηρίων.', category: 'accessories', brand: null, image: 'accessories.svg', features: 'Ασύρματα αξεσουάρ|Τηλεχειριστήρια|Θήκες|Εργαλεία καθαρισμού', sort_order: 7 },
];

const services = [
  { id: 1, name: '3D Printing Lab', slug: '3d-printing', description: 'Από το 2017, το εργαστήριο 3D εκτύπωσης της GP Med είναι το πρώτο στην ηπειρωτική Ελλάδα. Σάρωση αποτυπωμάτων με laser, ψηφιακός σχεδιασμός και εκτύπωση εκμαγείων, κελυφών ακουστικών και ωτοασπίδων με ακρυλική ρητίνη φωτοπολυμεριζόμενη. Παράδοση σε λίγες ημέρες.', icon: 'print', sort_order: 1 },
  { id: 2, name: 'Συντήρηση Ακουστικών', slug: 'maintenance', description: 'Τακτική συντήρηση και καθαρισμός των ακουστικών σας για βέλτιστη απόδοση. Εξειδικευμένο προσωπικό με πολυετή εμπειρία στη φροντίδα ακουστικών βαρηκοΐας.', icon: 'tools', sort_order: 2 },
  { id: 3, name: 'Service - Επισκευές', slug: 'service', description: 'Επισκευές όλων των τύπων ακουστικών βαρηκοΐας. Διάγνωση βλαβών, αντικατάσταση εξαρτημάτων και δοκιμαστική λειτουργία με εγγύηση.', icon: 'wrench', sort_order: 3 },
  { id: 4, name: 'Επισκέψεις στο Σπίτι', slug: 'home-visits', description: 'Δωρεάν επίσκεψη στο σπίτι σας για εφαρμογή, ρύθμιση και συντήρηση ακουστικών. Εξυπηρέτηση σε Αττική και σε συνεργασία με το δίκτυο συνεργατών μας πανελλαδικά.', icon: 'home', sort_order: 4 },
  { id: 5, name: 'Δωρεάν Δοκιμή', slug: 'free-trial', description: 'Δοκιμάστε ακουστικά βαρηκοΐας δωρεάν πριν την αγορά. Εξατομικευμένη επιλογή και ρύθμιση με βάση τις ανάγκες σας. Χωρίς δέσμευση.', icon: 'gift', sort_order: 5 },
];

const stores = [
  { id: 1, city: 'Αθήνα - Κεντρικά', address: 'Πειραιώς 6, 4ος όροφος, 104 31 Ομόνοια', phone: '210 5224105, 210 5224106', fax: '210 5232946', is_central: 1, sort_order: 1 },
  { id: 2, city: 'Αγ. Παρασκευή', address: 'Λεωφόρος Μεσογείων 466', phone: '210 6395220', fax: null, is_central: 1, sort_order: 2 },
  { id: 3, city: 'Περιστέρι', address: 'Π. Τσαλδάρη 97 & Θηβών (κοντά στο μετρό Ανθούπολη)', phone: '210 5982781', fax: null, is_central: 1, sort_order: 3 },
  { id: 4, city: 'Καλλιθέα', address: 'Δαβάκη 17, 176 72', phone: '210 9590888', fax: null, is_central: 1, sort_order: 4 },
  { id: 5, city: 'Θεσσαλονίκη', address: 'Αιγαίου 84 / Επιγόνου 8', phone: '2310 414060, 2310 908111', fax: null, is_central: 0, sort_order: 5 },
  { id: 6, city: 'Χαλκίδα', address: 'Φαρμακίδου 10, 341 00', phone: '22210 76021', fax: null, is_central: 0, sort_order: 6 },
  { id: 7, city: 'Άρτα', address: 'Σκουφά 43, 471 00', phone: '26810 71440', fax: null, is_central: 0, sort_order: 7 },
  { id: 8, city: 'Αγρίνιο', address: 'Λουριώτου 2, 301 00', phone: '26410 22112', fax: null, is_central: 0, sort_order: 8 },
  { id: 9, city: 'Ζάκυνθος', address: 'Τερτσέτη 66, 291 00', phone: '26950 42623', fax: null, is_central: 0, sort_order: 9 },
  { id: 10, city: 'Ηγουμενίτσα', address: 'Εθν. Αντιστάσεως 50-52, 461 00', phone: '26650 26048', fax: null, is_central: 0, sort_order: 10 },
  { id: 11, city: 'Ιωάννινα', address: '28ης Οκτωβρίου 31, 453 33', phone: '26510 32204', fax: null, is_central: 0, sort_order: 11 },
  { id: 12, city: 'Καλαμάτα', address: 'Π. Καισάρη 1, 241 00', phone: '27210 97104', fax: null, is_central: 0, sort_order: 12 },
  { id: 13, city: 'Κομοτηνή', address: 'Πλ. Ειρήνης 57, 691 00', phone: '25310 22076', fax: null, is_central: 0, sort_order: 13 },
  { id: 14, city: 'Κόρινθος', address: 'Περιάνδρου 36, 201 00', phone: '27410 84806', fax: null, is_central: 0, sort_order: 14 },
  { id: 15, city: 'Λαμία', address: 'Βύρωνος 31, 351 00', phone: '22310 20033', fax: null, is_central: 0, sort_order: 15 },
  { id: 16, city: 'Λαύριο', address: 'Λ. Αθηνών-Σουνίου 10, 195 00', phone: '22920 27620', fax: null, is_central: 0, sort_order: 16 },
  { id: 17, city: 'Λευκάδα', address: '8ης Μεραρχίας 3, 311 00', phone: '26450 26261', fax: null, is_central: 0, sort_order: 17 },
  { id: 18, city: 'Λιβαδειά', address: 'Αισχύλου 14, 321 00', phone: '6936907690', fax: null, is_central: 0, sort_order: 18 },
  { id: 19, city: 'Μυτιλήνη', address: 'Ε. Βοστάνη 21-23', phone: '2251043690', fax: null, is_central: 0, sort_order: 19 },
  { id: 20, city: 'Ναύπλιο', address: 'Ασκληπιού 22, 211 00', phone: '27520 29890', fax: null, is_central: 0, sort_order: 20 },
  { id: 21, city: 'Πάτρα', address: 'Γούναρη 39Β, 262 21', phone: '2610 623250', fax: null, is_central: 0, sort_order: 21 },
  { id: 22, city: 'Πύργος', address: 'Μιαούλη 3, 271 00', phone: '26210 34650', fax: null, is_central: 0, sort_order: 22 },
  { id: 23, city: 'Σπάρτη', address: 'Βρασίδου 124, 231 00', phone: '27310 81460', fax: null, is_central: 0, sort_order: 23 },
];

const partners = [
  { id: 1, name: 'Puretone', country: 'Αγγλία', sort_order: 1 },
  { id: 2, name: 'NuEar', country: 'ΗΠΑ', sort_order: 2 },
  { id: 3, name: 'Coselgi', country: 'Ιταλία', sort_order: 3 },
  { id: 4, name: 'Widex', country: 'Δανία', sort_order: 4 },
  { id: 5, name: 'Phonak', country: 'Ελβετία', sort_order: 5 },
  { id: 6, name: 'Amplicord', country: 'Ιταλία', sort_order: 6 },
  { id: 7, name: 'Rayovac', country: 'Αγγλία', sort_order: 7 },
];

const funds = [
  { id: 1, name: 'ΕΟΠΥΥ', coverage: '€450 ανά ακουστικό', details: 'Παιδιά: €540 ανά συσκευή κάθε 4 χρόνια (έως 16 ετών). Παιδιά κάτω των 15 ετών με σημαντική μείωση ακουστικής οξύτητας (>50db) λαμβάνουν ετήσια κάλυψη.', sort_order: 1 },
  { id: 2, name: 'Υπουργείο Παιδείας', coverage: 'Έως €1.500 ανά συσκευή', details: 'Μαθητές δημοσίων σχολείων, κάθε 4 χρόνια. Επιστροφή εντός 2-6 μηνών.', sort_order: 2 },
  { id: 3, name: 'ΕΥΔΑΠ', coverage: '€410,86 κάθε 3 χρόνια', details: null, sort_order: 3 },
  { id: 4, name: 'Τράπεζα Ελλάδος', coverage: '€396,20 κάθε 2 χρόνια', details: null, sort_order: 4 },
  { id: 5, name: 'ΤΥΠΕΤ', coverage: '€323-€382 κάθε 2 χρόνια', details: null, sort_order: 5 },
];

// Query helpers matching the SQLite API used in server.js
module.exports = {
  getProductsByCategory: (category) => products.filter(p => p.category === category).sort((a, b) => a.sort_order - b.sort_order),
  getAllServices: () => [...services].sort((a, b) => a.sort_order - b.sort_order),
  getAllPartners: () => [...partners].sort((a, b) => a.sort_order - b.sort_order),
  getStoreCount: () => stores.length,
  getCentralStores: () => stores.filter(s => s.is_central === 1).sort((a, b) => a.sort_order - b.sort_order),
  getPartnerStores: () => stores.filter(s => s.is_central === 0).sort((a, b) => a.sort_order - b.sort_order),
  getAllFunds: () => [...funds].sort((a, b) => a.sort_order - b.sort_order),
};
