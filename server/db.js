// SQLite storage for the Jadual Kuliah workspace.
// One row per month (so old months can be pruned) plus one row of shared settings.
'use strict';
const path = require('node:path');
const fs = require('node:fs');
const { DatabaseSync } = require('node:sqlite');

const DB_FILE = process.env.DB_FILE || path.join(__dirname, '..', 'db', 'jadual.db');
// Months older than this many months before the current month are deleted.
// Example with 3 in November 2026: August 2026 onward is kept, July 2026 and older are deleted.
const RETAIN_MONTHS = Math.max(1, Number(process.env.RETAIN_MONTHS || 3));
const MONTH_KEY = /^\d{4}-(0[1-9]|1[0-2])$/;

function openDb() {
  fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
  const db = new DatabaseSync(DB_FILE);
  db.exec(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS meta (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS months (
      key TEXT PRIMARY KEY,
      data TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);
  return db;
}

function cutoffKey(now = new Date()) {
  const d = new Date(now.getFullYear(), now.getMonth() - RETAIN_MONTHS, 1);
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
}

function userError(message) {
  return Object.assign(new Error(message), { userError: true });
}

function loadProject(db) {
  const row = db.prepare('SELECT value FROM meta WHERE key = ?').get('project');
  if (!row) return null;
  const project = JSON.parse(row.value);
  project.months = {};
  for (const m of db.prepare('SELECT key, data FROM months ORDER BY key').all()) project.months[m.key] = JSON.parse(m.data);
  const keys = Object.keys(project.months);
  if (!keys.length) return null;
  if (!project.months[project.active]) project.active = keys[keys.length - 1];
  return project;
}

function saveProject(db, project) {
  if (!project || project.format !== 'jadual-kuliah-talhah' || !project.months || typeof project.months !== 'object') {
    throw userError('Format data tidak dikenali.');
  }
  const cutoff = cutoffKey();
  const { months, ...rest } = project;
  const keep = Object.entries(months).filter(([key, m]) => MONTH_KEY.test(key) && m && typeof m === 'object' && key >= cutoff);
  if (!keep.length) throw userError('Tiada bulan yang boleh disimpan.');
  const now = new Date().toISOString();
  const upsert = db.prepare('INSERT INTO months (key, data, updated_at) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at');
  db.exec('BEGIN');
  try {
    db.prepare('INSERT INTO meta (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value').run('project', JSON.stringify(rest));
    for (const [key, m] of keep) upsert.run(key, JSON.stringify(m), now);
    // The page always sends every month it has, so months it no longer has were removed on purpose.
    const placeholders = keep.map(() => '?').join(',');
    db.prepare(`DELETE FROM months WHERE key NOT IN (${placeholders})`).run(...keep.map(([key]) => key));
    db.exec('COMMIT');
  } catch (e) {
    db.exec('ROLLBACK');
    throw e;
  }
  return { saved: keep.length, skippedOld: Object.keys(months).length - keep.length };
}

function pruneOldMonths(db) {
  const cutoff = cutoffKey();
  const old = db.prepare('SELECT key FROM months WHERE key < ? ORDER BY key').all(cutoff).map((r) => r.key);
  if (!old.length) return [];
  db.prepare('DELETE FROM months WHERE key < ?').run(cutoff);
  db.exec('VACUUM');
  return old;
}

module.exports = { openDb, loadProject, saveProject, pruneOldMonths, cutoffKey, DB_FILE, RETAIN_MONTHS };
