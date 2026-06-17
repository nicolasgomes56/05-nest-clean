import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Student } from '@/domain/forum/enterprise/entities/student';
import { Prisma } from '../../../../../generated/prisma/browser';
import { User as PrismaStudent } from '../../../../../generated/prisma/client';

export class PrismaStudentMapper {
  /**
   * toDomain - Converte um objeto de persistência no formato Prisma para um objeto de domínio
   * @param raw - Objeto de persistência no formato Prisma a ser convertido
   * @returns Objeto de domínio
   */
  static toDomain(raw: PrismaStudent): Student {
    return Student.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
      },
      new UniqueEntityID(raw.id),
    );
  }

  /**
   * toPersistence - Converte um objeto de domínio para um objeto de persistência no formato Prisma
   * @param student - Objeto de domínio a ser convertido
   * @returns Objeto de persistência no formato Prisma
   */
  static toPersistence(student: Student): Prisma.UserUncheckedCreateInput {
    return {
      id: student.id.toString(),
      name: student.name,
      email: student.email,
      password: student.password,
    };
  }
}
