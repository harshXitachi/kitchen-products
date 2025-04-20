import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: ["localhost", "127.0.0.1"],
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  // For Vercel, we need to find the correct path
  const possiblePaths = [
    path.resolve(import.meta.dirname, "public"),
    path.resolve(import.meta.dirname, "../dist"),
    path.resolve(import.meta.dirname, "../dist/assets"),
    path.resolve(import.meta.dirname, "../public")
  ];
  
  let distPath = null;
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      distPath = p;
      break;
    }
  }

  if (!distPath) {
    console.warn("Could not find static assets directory, but continuing anyway");
    distPath = path.resolve(import.meta.dirname, "../public");
  }

  console.log(`Serving static files from: ${distPath}`);
  app.use(express.static(distPath));

  // Also serve from dist directly for Vercel
  const distAssetsPath = path.resolve(import.meta.dirname, "../dist");
  if (fs.existsSync(distAssetsPath)) {
    console.log(`Also serving static files from: ${distAssetsPath}`);
    app.use(express.static(distAssetsPath));
  }

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    const indexPath = path.resolve(distPath, "index.html");
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      const fallbackPath = path.resolve(import.meta.dirname, "../dist/index.html");
      if (fs.existsSync(fallbackPath)) {
        res.sendFile(fallbackPath);
      } else {
        res.status(404).send("Not found");
      }
    }
  });
}
