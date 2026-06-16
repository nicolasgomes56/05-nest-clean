import { compare, hash } from 'bcryptjs';
import { HashComparer } from '@/domain/forum/application/cryptograpthy/hash-comparer';
import { HasherGenerator } from '@/domain/forum/application/cryptograpthy/hash-generator';

export class BcryptHasher implements HasherGenerator, HashComparer {
  private HASH_SALT_LENGHT = 8;

  hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGHT);
  }

  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash);
  }
}
