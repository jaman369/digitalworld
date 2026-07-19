import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

let dbUrl = "file:./dev.db";

// Serverless SQLite /tmp replication hack
if (process.env.VERCEL || process.env.NODE_ENV === "production") {
  const tempDbPath = "/tmp/dev.db";
  const bundledDbPath = path.join(process.cwd(), "prisma", "dev.db");

  try {
    if (!fs.existsSync(tempDbPath)) {
      if (fs.existsSync(bundledDbPath)) {
        fs.copyFileSync(bundledDbPath, tempDbPath);
        // Set correct permissions
        fs.chmodSync(tempDbPath, 0o666);
      }
    }
    dbUrl = `file:${tempDbPath}`;
  } catch (error) {
    console.error("Serverless SQLite setup error:", error);
  }
}

export const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
