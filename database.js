const Database = require("better-sqlite3");

const DB_NAME = "urls.db";
let db;

function getDb() {
  if (!db) {
    db = new Database(DB_NAME);
  }
  return db;
}

function initDb() {
  const database = getDb();
  database.exec(`
    CREATE TABLE IF NOT EXISTS urls (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      url_original TEXT NOT NULL,
      codigo TEXT NOT NULL UNIQUE,
      data_criacao DATE NOT NULL
    )
  `);
}

module.exports = { getDb, initDb };
