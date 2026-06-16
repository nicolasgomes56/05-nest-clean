import { Module } from '@nestjs/common';
import { Encrypter } from '@/domain/forum/application/cryptograpthy/encrypter';
import { HashComparer } from '@/domain/forum/application/cryptograpthy/hash-comparer';
import { HasherGenerator } from '@/domain/forum/application/cryptograpthy/hash-generator';
import { BcryptHasher } from './bcrypt-hasher';
import { JwtEncrypter } from './jwt-encrypter';

@Module({
  providers: [
    { provide: Encrypter, useClass: JwtEncrypter },
    { provide: HashComparer, useClass: BcryptHasher },
    { provide: HasherGenerator, useClass: BcryptHasher },
  ],
  exports: [Encrypter, HashComparer, HasherGenerator],
})
export class CryptographyModule {}
