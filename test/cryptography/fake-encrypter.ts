import { Encrypter } from '@/domain/forum/application/cryptograpthy/encrypter';

export class FakerEncrypter implements Encrypter {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return JSON.stringify(payload);
  }
}
