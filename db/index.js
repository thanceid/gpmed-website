const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'gpmed.db');
const db = new Database(dbPath, { readonly: false });
db.pragma('journal_mode = WAL');

module.exports = db;
