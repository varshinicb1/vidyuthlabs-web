/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import express from 'express';
import { createServer as createViteServer } from 'vite';
import { createServer } from 'http';
import path from 'path';
import Database from 'better-sqlite3';

const db = new Database('waitlist.db');
db.exec(`
  CREATE TABLE IF NOT EXISTS waitlist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

async function startServer() {
  const app = express();
  const PORT = 3000;
  const httpServer = createServer(app);

  app.use(express.json());

  app.post('/api/waitlist', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }
    try {
      const stmt = db.prepare('INSERT INTO waitlist (name, email) VALUES (?, ?)');
      stmt.run(name, email);
      res.json({ success: true, message: 'Welcome to the future. You are on the waitlist.' });
    } catch (error: any) {
      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
         res.status(400).json({ error: 'Email already registered' });
      } else {
         res.status(500).json({ error: 'Database error' });
      }
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
    });
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
