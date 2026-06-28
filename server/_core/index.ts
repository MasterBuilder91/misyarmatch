import { pingOnStartup } from "../pingGoogle";
import "dotenv/config";
import { webcrypto } from "node:crypto";

// Polyfill global crypto for Node 18 (jose library requires Web Crypto API)
if (!globalThis.crypto) {
  // @ts-expect-error - assigning Node's webcrypto to globalThis.crypto
  globalThis.crypto = webcrypto;
}

import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerStorageProxy } from "./storageProxy";
import { registerStripeWebhook } from "../stripeWebhook";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  // Trust Railway's proxy so req.protocol correctly reports "https"
  app.set("trust proxy", 1);
  const server = createServer(app);
  // Register Stripe webhook BEFORE express.json() so raw body is available for signature verification
  registerStripeWebhook(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  registerStorageProxy(app);
  registerOAuthRoutes(app);


  // Comments - GET
  app.get("/api/comments/:slug", async (req: any, res: any) => {
    try {
      const { db } = await import("../db");
      const { slug } = req.params;
      await db.execute(`
        CREATE TABLE IF NOT EXISTS comments (
          id INT AUTO_INCREMENT PRIMARY KEY,
          slug VARCHAR(255) NOT NULL,
          name VARCHAR(100),
          email VARCHAR(255),
          user_id INT,
          content TEXT NOT NULL,
          is_member TINYINT(1) DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          INDEX idx_slug (slug)
        )
      `);
      const [rows] = await db.execute(
        "SELECT id, name, content, is_member, created_at FROM comments WHERE slug = ? ORDER BY created_at ASC",
        [slug]
      );
      return res.json({ comments: rows });
    } catch (err) {
      console.error("[Comments GET] Error:", err);
      return res.status(500).json({ error: "Server error" });
    }
  });

  // Comments - POST
  app.post("/api/comments", async (req: any, res: any) => {
    try {
      const { db } = await import("../db");
      const { slug, content, name, email } = req.body;
      if (!slug || !content || content.trim().length < 3) {
        return res.status(400).json({ error: "Invalid comment" });
      }
      if (content.length > 1000) {
        return res.status(400).json({ error: "Comment too long" });
      }

      // Check if logged in via session cookie
      let userId = null;
      let memberName = name || null;
      let isMember = 0;
      try {
        const { verifySession } = await import("../auth");
        const session = await verifySession(req);
        if (session?.userId) {
          userId = session.userId;
          isMember = 1;
          const [users]: any = await db.execute(
            "SELECT name FROM users WHERE id = ? LIMIT 1", [userId]
          );
          if (users?.[0]?.name) memberName = users[0].name;
        }
      } catch {}

      const [result]: any = await db.execute(
        "INSERT INTO comments (slug, name, email, user_id, content, is_member) VALUES (?, ?, ?, ?, ?, ?)",
        [slug, memberName, email || null, userId, content.trim(), isMember]
      );

      const comment = {
        id: result.insertId,
        name: memberName,
        content: content.trim(),
        is_member: isMember,
        created_at: new Date().toISOString(),
      };

      console.log(\`[Comments] New comment on \${slug} by \${memberName || "Anonymous"}\`);
      return res.json({ comment });
    } catch (err) {
      console.error("[Comments POST] Error:", err);
      return res.status(500).json({ error: "Server error" });
    }
  });

  // Email subscription
  app.post("/api/subscribe", async (req: any, res: any) => {
    try {
      const { email } = req.body;
      if (!email || !email.includes("@")) {
        return res.status(400).json({ error: "Invalid email" });
      }
      const { db } = await import("../db");
      await db.execute(
        "CREATE TABLE IF NOT EXISTS subscribers (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) UNIQUE NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)"
      );
      await db.execute("INSERT IGNORE INTO subscribers (email) VALUES (?)", [email.toLowerCase().trim()]);
      console.log(`[Subscribe] New subscriber: ${email}`);
      return res.json({ success: true });
    } catch (err) {
      console.error("[Subscribe] Error:", err);
      return res.status(500).json({ error: "Server error" });
    }
  });

  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
