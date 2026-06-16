import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

let dbInstance: Database.Database | null = null;

export function getDB(): Database.Database {
  if (dbInstance) {
    return dbInstance;
  }

  const dbPath = path.join(process.cwd(), "sqlite.db");
  const db = new Database(dbPath, { verbose: console.log });

  // Enable foreign key constraints
  db.pragma("foreign_keys = ON");

  // Run migrations to create tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      country TEXT NOT NULL,
      state TEXT NOT NULL,
      city TEXT NOT NULL,
      address TEXT NOT NULL,
      postal_code TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_number TEXT UNIQUE NOT NULL,
      customer_id INTEGER NOT NULL,
      subtotal REAL NOT NULL,
      shipping REAL NOT NULL,
      discount REAL DEFAULT 0,
      total REAL NOT NULL,
      payment_method TEXT NOT NULL,
      status TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      product_id TEXT NOT NULL,
      product_name TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      price REAL NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS order_status_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      status TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS email_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      email_type TEXT NOT NULL,
      recipient TEXT NOT NULL,
      status TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
    );
  `);

  dbInstance = db;
  return dbInstance;
}
