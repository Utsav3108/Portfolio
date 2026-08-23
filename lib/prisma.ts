import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// Standard pg adapter — works identically against local Docker Postgres
// (dev) and Neon (prod, use its pooled connection string). Neon's own
// serverless/WebSocket driver only works against Neon itself, which would
// mean two different code paths for dev vs prod.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
