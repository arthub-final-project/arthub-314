import { PrismaClient } from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// eslint-disable-next-line import/prefer-default-export, operator-linebreak
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
    datasourceUrl: process.env.DATABASE_URL?.includes('postgres')
      ? `${process.env.DATABASE_URL}?pgbouncer=true&statement_cache_mode=describe`
      : undefined,
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
