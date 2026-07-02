import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { envSchema } from './env/env';
import { EnvModule } from './env/env.module';
import { EventsModule } from './events/events.module';
import { HttpModule } from './http/http.module';

@Module({
  // ConfigModule é responsável por gerenciar as variáveis de ambiente.
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env), // Valida as variáveis de ambiente
      isGlobal: true, // Permite que o ConfigModule seja usado em toda a aplicação
    }),
    AuthModule,
    HttpModule,
    EnvModule,
    EventsModule,
  ],
  // Providers é uma lista de serviços que serão injetados no controller.
})
export class AppModule {}
