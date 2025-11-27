// src/index.ts
import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool, query } from "../db/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json()); // parse JSON bodies

// Health check
app.get("/", (_req: Request, res: Response) => {
  res.json({ status: "ok", message: "Express + Neon PostgreSQL API running" });
});

// 🔹 TEST DB CONNECTION
app.get("/api/health/db", async (_req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ ok: true, now: result.rows[0].now });
  } catch (err) {
    console.error("DB health check error:", err);
    res.status(500).json({ ok: false, error: "DB connection failed" });
  }
});


// =============================
//   TODOS CRUD EXAMPLE
// =============================


// =============================
// CREATE TABLE ROUTE
// =============================
app.get("/api/setup", async (_req: Request, res: Response) => {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      completed BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;

  try {
    await pool.query(createTableSQL);
    res.json({ ok: true, message: "Todos table created or already exists." });
  } catch (err) {
    console.error("Error creating table:", err);
    res.status(500).json({ ok: false, error: "Table creation failed" });
  }
});


// GET /api/todos  – list all
app.get("/todos", async (_req: Request, res: Response) => {
  try {
    const todos = await query("SELECT * FROM todos ORDER BY id DESC");
    res.json(todos);
  } catch (err) {
    console.error("Error fetching todos:", err);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

// GET /api/todos/:id – single todo
app.get("/todos/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const todos = await query("SELECT * FROM todos WHERE id = $1", [id]);

    if (todos.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(todos[0]);
  } catch (err) {
    console.error("Error fetching todo:", err);
    res.status(500).json({ error: "Failed to fetch todo" });
  }
});

// POST /api/todos – create
app.post("/todos", async (req: Request, res: Response) => {
  const { title } = req.body;

  if (!title || typeof title !== "string") {
    return res.status(400).json({ error: "Title is required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO todos (title) VALUES ($1) RETURNING *",
      [title]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating todo:", err);
    res.status(500).json({ error: "Failed to create todo" });
  }
});

// PUT /api/todos/:id – update
app.put("/todos/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title, completed } = req.body;

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const result = await pool.query(
      `UPDATE todos 
       SET title = COALESCE($1, title),
           completed = COALESCE($2, completed)
       WHERE id = $3
       RETURNING *`,
      [title ?? null, completed ?? null, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating todo:", err);
    res.status(500).json({ error: "Failed to update todo" });
  }
});

// DELETE /api/todos/:id – delete
app.delete("/todos/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const result = await pool.query(
      "DELETE FROM todos WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Error deleting todo:", err);
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
