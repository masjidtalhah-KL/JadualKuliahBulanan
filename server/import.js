// Load a "Simpan Data" JSON backup into the database, replacing what is there.
// Usage: docker compose exec jadual node server/import.js "/app/<file>.json"
'use strict';
const fs = require('node:fs');
const { openDb, saveProject } = require('./db');

const file = process.argv[2];
if (!file) { console.error('Nyatakan fail JSON.'); process.exit(1); }
const result = saveProject(openDb(), JSON.parse(fs.readFileSync(file, 'utf8')));
console.log(`Diimport: ${result.saved} bulan. Dilangkau (terlalu lama): ${result.skippedOld}.`);
