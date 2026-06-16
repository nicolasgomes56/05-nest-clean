import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Env } from './env';

@Injectable()
export class EnvService {
  constructor(private configService: ConfigService<Env, true>) {}

  /**
   * Busca o valor da chave enviada como parâmetro.
   * @param key - Chave do valor que deseja buscar.
   * @returns O valor da chave.
   */
  get<T extends keyof Env>(key: T) {
    return this.configService.get<T>(key, { infer: true });
  }
}
