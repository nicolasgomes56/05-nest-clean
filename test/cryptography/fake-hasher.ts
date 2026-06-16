import { HashComparer } from '@/domain/forum/application/cryptograpthy/hash-comparer';
import { HasherGenerator } from '@/domain/forum/application/cryptograpthy/hash-generator';

export class FakerHasher implements HasherGenerator, HashComparer {
  async hash(plain: string): Promise<string> {
    return plain.concat('-hashed');
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return plain.concat('-hashed') === hash;
  }
}
