// Jadual Kuliah server: serves the generator page and keeps the workspace in SQLite.
// No dependencies; uses Node's built-in node:http and node:sqlite.
'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { openDb, loadProject, saveProject, pruneOldMonths } = require('./db');

const PORT = Number(process.env.PORT || 8080);
const PAGE = process.env.PAGE_FILE || path.join(__dirname, '..', 'jadual-kuliah-generator.html');
const MAX_BODY = 80 * 1024 * 1024;
const PRUNE_EVERY_MS = 12 * 60 * 60 * 1000;

const db = openDb();

function runPrune() {
  try {
    const removed = pruneOldMonths(db);
    if (removed.length) console.log(new Date().toISOString(), 'Bulan lama dipadam:', removed.join(', '));
  } catch (e) {
    console.error('Pembersihan gagal:', e);
  }
}

function send(res, status, body, type = 'application/json; charset=utf-8') {
  res.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on('data', (c) => {
      size += c.length;
      if (size > MAX_BODY) { reject(Object.assign(new Error('Data terlalu besar.'), { status: 413 })); req.destroy(); return; }
      chunks.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  try {
    if (url.pathname === '/api/project') {
      if (req.method === 'GET') {
        const project = loadProject(db);
        return project ? send(res, 200, JSON.stringify(project)) : send(res, 404, '{"error":"empty"}');
      }
      if (req.method === 'PUT') {
        const project = JSON.parse(await readBody(req));
        const result = saveProject(db, project);
        return send(res, 200, JSON.stringify({ ok: true, ...result }));
      }
      return send(res, 405, '{"error":"method"}');
    }
    if (url.pathname === '/api/health') return send(res, 200, '{"ok":true}');
    if (req.method === 'GET' && (url.pathname === '/' || url.pathname === '/index.html')) {
      return send(res, 200, fs.readFileSync(PAGE), 'text/html; charset=utf-8');
    }
    return send(res, 404, 'Not found', 'text/plain; charset=utf-8');
  } catch (e) {
    const status = e.status || (e instanceof SyntaxError ? 400 : e.userError ? 400 : 500);
    if (status === 500) console.error(e);
    return send(res, status, JSON.stringify({ error: e.message }));
  }
});

runPrune();
setInterval(runPrune, PRUNE_EVERY_MS).unref();
server.listen(PORT, () => console.log('Jadual Kuliah server pada port', PORT));
