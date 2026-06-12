import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  /**
   * Controllers é uma lista de controllers que serão instanciados.
   */
  controllers: [AppController],
  /**
   * Providers é uma lista de serviços que serão injetados no controller.
   */
  providers: [AppService],
})
export class AppModule {}
