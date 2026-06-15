import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { envSchema } from './env';
import { HttpModule } from './http/http.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  // ConfigModule é responsável por gerenciar as variáveis de ambiente.
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env), // Valida as variáveis de ambiente
      isGlobal: true, // Permite que o ConfigModule seja usado em toda a aplicação
    }),
    AuthModule,
    HttpModule,
  ],
  // Providers é uma lista de serviços que serão injetados no controller.
  providers: [PrismaService],
})
export class AppModule {}
