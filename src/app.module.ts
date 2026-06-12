import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AuthenticateController } from './controllers/authenticate.controller';
import { CreateAccountController } from './controllers/create-account.controller';
import { CreateQuestionController } from './controllers/create-question.controller';
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller';
import { envSchema } from './env';
import { PrismaService } from './prisma/prisma.service';

@Module({
  // ConfigModule é responsável por gerenciar as variáveis de ambiente.
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env), // Valida as variáveis de ambiente
      isGlobal: true, // Permite que o ConfigModule seja usado em toda a aplicação
    }),
    AuthModule,
  ],

  // Controllers é uma lista de controllers que serão instanciados.
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],

  // Providers é uma lista de serviços que serão injetados no controller.
  providers: [PrismaService],
})
export class AppModule {}
