import { Module } from '@nestjs/common';
import { CreateAccountController } from './controllers/create-account.controller';
import { PrismaService } from './prisma/prisma.service';

@Module({
  /**
   * Controllers é uma lista de controllers que serão instanciados.
   */
  controllers: [CreateAccountController],
  /**
   * Providers é uma lista de serviços que serão injetados no controller.
   */
  providers: [PrismaService],
})
export class AppModule {}
