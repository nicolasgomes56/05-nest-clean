import { config } from 'dotenv';
import { execSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

config({ path: '.env', override: true });
config({ path: '.env.test', override: true });

const schemaId = randomUUID();

function generateUniqueDatabaseURL(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable');
  }

  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set('schema', schemaId);

  return url.toString();
}

const databaseURL = generateUniqueDatabaseURL(schemaId);

process.env.DATABASE_URL = databaseURL;
process.env.DATABASE_SCHEMA = schemaId;

let prisma: PrismaClient;

beforeAll(async () => {
  const adapter = new PrismaPg({
    connectionString: databaseURL,
  });

  prisma = new PrismaClient({ adapter });

  execSync('pnpm prisma migrate deploy');
});

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`);
  await prisma.$disconnect();
});
