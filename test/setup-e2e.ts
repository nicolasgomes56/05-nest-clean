import { execSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { PrismaPg } from '@prisma/adapter-pg';
import { config } from 'dotenv';
import Redis from 'ioredis';
import { DomainEvents } from '@/core/events/domain-events';
import { envSchema } from '@/infra/env/env';
import { PrismaClient } from '../generated/prisma/client';

config({ path: '.env', override: true });
config({ path: '.env.test', override: true });

const env = envSchema.parse(process.env);

const schemaId = randomUUID();

function generateUniqueDatabaseURL(schemaId: string) {
  const url = new URL(env.DATABASE_URL);

  url.searchParams.set('schema', schemaId);

  return url.toString();
}

const databaseURL = generateUniqueDatabaseURL(schemaId);

process.env.DATABASE_URL = databaseURL;
process.env.DATABASE_SCHEMA = schemaId;

let prisma: PrismaClient;
const redis = new Redis({
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  db: env.REDIS_DB,
});

beforeAll(async () => {
  const adapter = new PrismaPg({
    connectionString: databaseURL,
  });

  prisma = new PrismaClient({ adapter });

  DomainEvents.shouldRun = false;

  await redis.flushdb();

  execSync('pnpm prisma migrate deploy');
});

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`);
  await prisma.$disconnect();
  await redis.quit();
});
