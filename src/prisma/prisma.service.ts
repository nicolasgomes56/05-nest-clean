import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    // No Prisma 7, o uso de "Driver Adapters" é obrigatório.
    const adapter = new PrismaPg(process.env.DATABASE_URL as string);

    super({
      adapter,
      log: ['query'],
    });
  }

  async onModuleInit() {
    return await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
