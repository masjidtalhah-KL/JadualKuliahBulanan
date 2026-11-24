// Manual run of the old-month cleanup. The server also runs it at start-up and every 12 hours.
// Usage: docker compose exec jadual node server/cleanup.js
'use strict';
const { openDb, pruneOldMonths, cutoffKey, RETAIN_MONTHS } = require('./db');

const db = openDb();
const removed = pruneOldMonths(db);
console.log(`Simpan ${RETAIN_MONTHS} bulan lepas (dari ${cutoffKey()} ke atas).`);
console.log(removed.length ? 'Dipadam: ' + removed.join(', ') : 'Tiada bulan lama untuk dipadam.');
